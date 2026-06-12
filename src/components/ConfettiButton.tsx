import React from 'react';
import './ConfettiButton.css';

// Declare global confetti function (loaded via index.html script tag)
const getConfetti = (): any => {
  return (window as any).confetti;
};

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  confettiConfig?: {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x?: number; y?: number };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  };
}

const ConfettiButton: React.FC<ConfettiButtonProps> = ({
  children,
  className,
  onClick,
  confettiConfig = {},
  ...rest
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const confetti = getConfetti();
      if (confetti) {
        // Default confetti configuration
        const defaults = {
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        };

        // Trigger confetti with merged config
        confetti({
          ...defaults,
          ...confettiConfig
        });
      } else {
        console.warn('confetti function is not loaded yet');
      }
    } catch (error) {
      console.error('Failed to launch confetti:', error);
    }

    // Call custom onClick if provided
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={className || "confetti-btn-default"}
      data-name="confetti-button"
      data-file="components/ConfettiButton.tsx"
      {...rest}
    >
      {children || "🎉 Click to Launch Confetti"}
    </button>
  );
};

export default ConfettiButton;
