import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface NumberTickerProps {
  value?: number;
  direction?: 'up' | 'down';
  duration?: number;
  delay?: number;
  decimalPlaces?: number;
  className?: string;
  transition?: 'easeIn' | 'easeOut' | 'easeInOut' | 'linear';
}

const NumberTicker: React.FC<NumberTickerProps> = ({
  value = 0,
  direction = 'up',
  duration = 1000,
  delay = 0,
  decimalPlaces = 2,
  className = '',
  transition = 'easeOut',
}) => {
  const [displayValue, setDisplayValue] = useState(
    direction === 'down' ? value : 0
  );
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    const fromVal = direction === 'down' ? value : 0;
    const toVal = direction === 'down' ? 0 : value;

    const obj = { val: fromVal };
    
    // Map transition parameter to GSAP eases
    let easeName = 'power1.out';
    if (transition === 'linear') {
      easeName = 'none';
    } else if (transition === 'easeIn') {
      easeName = 'power1.in';
    } else if (transition === 'easeInOut') {
      easeName = 'power1.inOut';
    }

    const tween = gsap.to(obj, {
      val: toVal,
      duration: duration / 1000,
      delay: delay / 1000,
      ease: easeName,
      onUpdate: () => {
        setDisplayValue(obj.val);
      },
    });

    return () => {
      tween.kill();
    };
  }, [inView, value, direction, duration, delay, transition]);

  const formattedValue = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(Number(displayValue.toFixed(decimalPlaces)));

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums tracking-wider ${className}`}
      data-name="number-ticker"
      data-file="components/NumberTicker.tsx"
    >
      {formattedValue}
    </span>
  );
};

export default NumberTicker;
