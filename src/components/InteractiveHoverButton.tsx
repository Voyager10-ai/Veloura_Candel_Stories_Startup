import React, { useRef } from 'react';
import './InteractiveHoverButton.css';

interface InteractiveHoverButtonProps {
  text?: string;
  className?: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

const InteractiveHoverButton: React.FC<InteractiveHoverButtonProps> = ({
  text = 'Shop Now',
  className = '',
  href,
  onClick,
}) => {
  const buttonRef = useRef<HTMLElement>(null);
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={buttonRef as any}
      href={href}
      onClick={onClick}
      className={`interactive-hover-btn ${className}`}
    >
      {/* Default state */}
      <div className="btn-default-content">
        <div className="btn-dot" />
        <span className="btn-default-text">{text}</span>
      </div>

      {/* Hover state */}
      <div className="btn-hover-content">
        <span className="btn-hover-text">{text}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="btn-arrow-icon"
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Tag>
  );
};

export default InteractiveHoverButton;
