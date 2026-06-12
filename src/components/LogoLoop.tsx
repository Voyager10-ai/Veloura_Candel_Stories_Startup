import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2,
};

const toCssLength = (value?: string | number) => {
  if (typeof value === 'number') return `${value}px`;
  return value ?? undefined;
};

// Custom hook for resize observation
const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement | null>[],
  dependencies: any[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener('resize', handleResize);
      callback();
      return () => window.removeEventListener('resize', handleResize);
    }

    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(() => callback());
      observer.observe(ref.current);
      return observer;
    });

    callback();

    return () => {
      observers.forEach((observer) => observer?.disconnect());
    };
  }, dependencies);
};

// Custom hook for image loading
const useImageLoader = (
  seqRef: React.RefObject<HTMLElement | null>,
  onLoad: () => void,
  dependencies: any[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];

    if (images.length === 0) {
      onLoad();
      return;
    }

    let remainingImages = images.length;
    const handleImageLoad = () => {
      remainingImages -= 1;
      if (remainingImages === 0) {
        onLoad();
      }
    };

    images.forEach((img) => {
      const htmlImg = img as HTMLImageElement;
      if (htmlImg.complete) {
        handleImageLoad();
      } else {
        htmlImg.addEventListener('load', handleImageLoad, { once: true });
        htmlImg.addEventListener('error', handleImageLoad, { once: true });
      }
    });

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
        img.removeEventListener('error', handleImageLoad);
      });
    };
  }, dependencies);
};

// Custom hook for animation loop
const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement | null>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null);
  const lastTimestampRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const animate = (timestamp: number) => {
      if (!isVisibleRef.current) return;

      if (lastTimestampRef.current === null) {
        lastTimestampRef.current = timestamp;
      }

      const deltaTime = Math.max(0, timestamp - lastTimestampRef.current) / 1000;
      lastTimestampRef.current = timestamp;

      const target = pauseOnHover && isHovered ? 0 : targetVelocity;

      const easingFactor = 1 - Math.exp(-deltaTime / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easingFactor;

      if (seqWidth > 0) {
        let nextOffset = offsetRef.current + velocityRef.current * deltaTime;
        nextOffset = ((nextOffset % seqWidth) + seqWidth) % seqWidth;
        offsetRef.current = nextOffset;

        const translateX = -offsetRef.current;
        track.style.transform = `translate3d(${translateX}px, 0, 0)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = isVisibleRef.current;
        isVisibleRef.current = entry.isIntersecting;

        if (entry.isIntersecting && !wasVisible) {
          lastTimestampRef.current = null;
          startLoop();
        } else if (!entry.isIntersecting && wasVisible) {
          if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
          }
        }
      },
      { threshold: 0.01 }
    );

    observer.observe(track);

    if (isVisibleRef.current) {
      startLoop();
    }

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover, trackRef]);
};

export interface LogoItem {
  icon?: string;
  alt?: string;
  color?: string;
  node?: React.ReactNode;
  ariaLabel?: string;
  href?: string;
  title?: string;
}

interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number;
  direction?: 'left' | 'right';
  width?: string | number;
  logoHeight?: string | number;
  gap?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

const LogoLoop: React.FC<LogoLoopProps> = React.memo(
  ({
    logos = [],
    speed = 120,
    direction = 'left',
    width = '100%',
    logoHeight = 60,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = true,
    ariaLabel = 'Partner logos',
    className = '',
    style = {},
  }) => {
    try {
      const containerRef = useRef<HTMLDivElement>(null);
      const trackRef = useRef<HTMLDivElement>(null);
      const seqRef = useRef<HTMLUListElement>(null);

      const [seqWidth, setSeqWidth] = useState(0);
      const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
      const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);

      const targetVelocity = useMemo(() => {
        const magnitude = Math.abs(speed);
        const directionMultiplier = direction === 'left' ? 1 : -1;
        const speedMultiplier = speed < 0 ? -1 : 1;
        return magnitude * directionMultiplier * speedMultiplier;
      }, [speed, direction]);

      const updateDimensions = useCallback(() => {
        const containerWidth = containerRef.current?.clientWidth ?? 0;
        const sequenceWidth = seqRef.current?.getBoundingClientRect?.()?.width ?? 0;

        if (sequenceWidth > 0) {
          setSeqWidth(Math.ceil(sequenceWidth));
          const copiesNeeded = Math.ceil(containerWidth / sequenceWidth) + ANIMATION_CONFIG.COPY_HEADROOM;
          setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, copiesNeeded));
        }
      }, []);

      useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight]);
      useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight]);
      useAnimationLoop(trackRef, targetVelocity, seqWidth, hoveredLogo !== null, pauseOnHover);

      const cssVariables = useMemo(
        () => ({
          '--logoloop-gap': `${gap}px`,
          '--logoloop-logoHeight': `${logoHeight}px`,
          ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }),
        }),
        [gap, logoHeight, fadeOutColor]
      );

      const handleLogoMouseEnter = useCallback(
        (logoKey: string) => {
          if (pauseOnHover) setHoveredLogo(logoKey);
        },
        [pauseOnHover]
      );

      const handleLogoMouseLeave = useCallback(() => {
        if (pauseOnHover) setHoveredLogo(null);
      }, [pauseOnHover]);

      const renderLogoItem = useCallback(
        (item: LogoItem, key: string) => {
          const isNodeItem = 'node' in item;
          const isHovered = hoveredLogo === key;

          const content = isNodeItem ? (
            <span
              className={`logoloop-item-content ${scaleOnHover && isHovered ? 'scale' : ''}`}
              aria-hidden={!!item.href && !item.ariaLabel}
            >
              {item.node}
            </span>
          ) : (
            <div
              className={`icon-${item.icon} ${item.color || 'text-gray-200'} logoloop-item-content ${
                scaleOnHover && isHovered ? 'scale' : ''
              }`}
              style={{ fontSize: 'var(--logoloop-logoHeight)' }}
              title={item.alt}
            />
          );

          const itemAriaLabel = isNodeItem ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);

          const inner = item.href ? (
            <a
              className="logoloop-item-link"
              href={item.href}
              aria-label={itemAriaLabel || 'logo link'}
              target="_blank"
              rel="noreferrer noopener"
            >
              {content}
            </a>
          ) : (
            content
          );

          return (
            <li
              className="logoloop-item"
              key={key}
              role="listitem"
              onMouseEnter={() => handleLogoMouseEnter(key)}
              onMouseLeave={handleLogoMouseLeave}
            >
              {inner}
            </li>
          );
        },
        [scaleOnHover, hoveredLogo, handleLogoMouseEnter, handleLogoMouseLeave]
      );

      const logoLists = useMemo(
        () =>
          Array.from({ length: copyCount }, (_, copyIndex) => (
            <ul
              className="logoloop-list"
              key={`copy-${copyIndex}`}
              role="list"
              aria-hidden={copyIndex > 0}
              ref={copyIndex === 0 ? seqRef : undefined}
            >
              {logos.map((item, itemIndex) => renderLogoItem(item, `${copyIndex}-${itemIndex}`))}
            </ul>
          )),
        [copyCount, logos, renderLogoItem]
      );

      const containerStyle = useMemo(
        () => ({
          width: toCssLength(width) ?? '100%',
          ...cssVariables,
          ...style,
        }),
        [width, cssVariables, style]
      );

      return (
        <div
          ref={containerRef}
          className={`logoloop-container ${className}`}
          style={containerStyle as React.CSSProperties}
          role="region"
          aria-label={ariaLabel}
        >
          {fadeOut && (
            <>
              <div className="logoloop-fade-left" aria-hidden />
              <div className="logoloop-fade-right" aria-hidden />
            </>
          )}

          <div className="logoloop-track" ref={trackRef}>
            {logoLists}
          </div>
        </div>
      );
    } catch (error) {
      console.error('LogoLoop component error:', error);
      return null;
    }
  }
);

LogoLoop.displayName = 'LogoLoop';

export default LogoLoop;
