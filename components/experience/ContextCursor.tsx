import React, { useEffect, useState } from 'react';

export const ContextCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable custom cursor on non-touch desktop devices
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check what element is under the cursor
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor-text]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor-text') || '';
        setCursorText(text);
        setIsHovered(true);
      } else if (target.closest('a, button, [role="button"], input, select')) {
        setCursorText('');
        setIsHovered(true);
      } else {
        setCursorText('');
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="pointer-events-none fixed z-50 transition-transform duration-75 ease-out"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {cursorText ? (
        <div className="flex items-center justify-center rounded-full bg-[#D90077] px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white shadow-xl ring-2 ring-white/80 animate-in zoom-in-75 duration-150">
          {cursorText}
        </div>
      ) : (
        <div
          className={`rounded-full transition-all duration-200 ease-out ${
            isHovered
              ? 'h-9 w-9 bg-[#D90077]/20 ring-1.5 ring-[#D90077] backdrop-blur-[1px]'
              : 'h-3.5 w-3.5 bg-[#D90077] opacity-80 shadow-md'
          }`}
        />
      )}
    </div>
  );
};
