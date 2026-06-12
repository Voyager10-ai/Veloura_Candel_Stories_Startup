import { useRef, useCallback, type ReactNode, type MouseEvent } from 'react';
import gsap from 'gsap';
import './MagneticButton.css';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  id?: string;
}

/**
 * MagneticButton — Button/link that magnetically pulls toward the cursor.
 * 
 * On hover, the element subtly follows the cursor within its bounds.
 * On mouse leave, it springs back to center with elastic easing.
 */
const MagneticButton = ({
  children,
  className = '',
  href,
  onClick,
  strength = 0.35,
  id,
}: MagneticButtonProps) => {
  const btnRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      const el = btnRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(el, {
        x: deltaX,
        y: deltaY,
        duration: 0.4,
        ease: 'power3.out',
      });

      // Inner content moves slightly more for parallax depth
      if (innerRef.current) {
        gsap.to(innerRef.current, {
          x: deltaX * 0.3,
          y: deltaY * 0.3,
          duration: 0.4,
          ease: 'power3.out',
        });
      }
    },
    [strength]
  );

  const handleMouseLeave = useCallback(() => {
    const el = btnRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    });

    if (innerRef.current) {
      gsap.to(innerRef.current, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1, 0.3)',
      });
    }
  }, []);

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef as never}
      className={`magnetic-btn ${className}`}
      href={href || undefined}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      id={id}
    >
      <span ref={innerRef} className="magnetic-btn__inner">
        {children}
      </span>
    </Tag>
  );
};

export default MagneticButton;
