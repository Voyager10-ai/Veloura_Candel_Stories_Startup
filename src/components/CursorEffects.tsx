import { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import './CursorEffects.css';

/**
 * CursorEffects — Custom cursor trail + click ripple sparks
 * 
 * - Smooth trailing cursor dot that follows the mouse with spring physics
 * - On click: burst of 12 gold-green spark particles that fade in ~500ms
 * - All sparks use requestAnimationFrame for performance
 */
const CursorEffects = () => {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const sparkContainerRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const isHovering = useRef(false);

  // Smooth cursor follow
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power2.out' });
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      xToDot(e.clientX);
      yToDot(e.clientY);
      xToRing(e.clientX);
      yToRing(e.clientY);
    };

    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1 });
      gsap.to(ring, { scale: 0.8, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'elastic.out(1, 0.4)' });
      gsap.to(ring, { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.4)' });
    };

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.product-card') ||
        target.closest('.magnetic-btn')
      ) {
        isHovering.current = true;
        dot.classList.add('cursor-dot--hover');
        ring.classList.add('cursor-ring--hover');
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || typeof target.closest !== 'function') return;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.product-card') ||
        target.closest('.magnetic-btn')
      ) {
        isHovering.current = false;
        dot.classList.remove('cursor-dot--hover');
        ring.classList.remove('cursor-ring--hover');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  // Click spark effect
  const createSparks = useCallback((x: number, y: number) => {
    const container = sparkContainerRef.current;
    if (!container) return;

    const sparkCount = 12;
    const colors = ['#810100', '#630102', '#1B1716', '#edebde', '#D4AA70', '#8A817C'];

    for (let i = 0; i < sparkCount; i++) {
      const spark = document.createElement('div');
      spark.className = 'spark-particle';

      const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.5;
      const distance = 40 + Math.random() * 60;
      const size = 3 + Math.random() * 4;
      const color = colors[Math.floor(Math.random() * colors.length)];

      spark.style.cssText = `
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        box-shadow: 0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}44;
      `;

      container.appendChild(spark);

      gsap.to(spark, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance - 20,
        opacity: 0,
        scale: 0,
        duration: 0.4 + Math.random() * 0.2,
        ease: 'power2.out',
        onComplete: () => spark.remove(),
      });
    }

    // Central flash
    const flash = document.createElement('div');
    flash.className = 'spark-flash';
    flash.style.cssText = `left: ${x}px; top: ${y}px;`;
    container.appendChild(flash);

    gsap.to(flash, {
      scale: 2.5,
      opacity: 0,
      duration: 0.35,
      ease: 'power2.out',
      onComplete: () => flash.remove(),
    });
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      createSparks(e.clientX, e.clientY);
    };

    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [createSparks]);

  // Hide custom cursor on touch devices
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      if (cursorDotRef.current) cursorDotRef.current.style.display = 'none';
      if (cursorRingRef.current) cursorRingRef.current.style.display = 'none';
    }
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />
      <div ref={sparkContainerRef} className="spark-container" />
    </>
  );
};

export default CursorEffects;
