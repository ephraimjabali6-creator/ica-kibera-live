import React, { useRef, useState, useEffect } from 'react';

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  'data-cursor-text'?: string;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  strength = 0.35,
  className = '',
  asAnchor = false,
  href,
  target,
  rel,
  onClick,
  'data-cursor-text': cursorText,
  ...props
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const deltaX = (clientX - centerX) * strength;
    const deltaY = (clientY - centerY) * strength;
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const buttonStyle: React.CSSProperties = {
    transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
    transition: position.x === 0 && position.y === 0 ? 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)' : 'transform 0.1s ease-out',
  };

  const content = (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={buttonStyle}
      className="inline-block"
      data-cursor-text={cursorText}
    >
      {asAnchor && href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          className={className}
          onClick={onClick}
          data-cursor-text={cursorText}
        >
          {children}
        </a>
      ) : (
        <button
          className={className}
          onClick={onClick}
          data-cursor-text={cursorText}
          {...props}
        >
          {children}
        </button>
      )}
    </div>
  );

  return content;
};
