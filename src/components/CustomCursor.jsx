import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !window.matchMedia('(pointer: coarse)').matches;
  });

  const dotRef = useRef(null);
  const ringRef = useRef(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId = useRef(null);

  useEffect(() => {
    if (!isVisible) return;

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    // Smooth lerp loop for the trailing ring
    const render = () => {
      const lerpFactor = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * lerpFactor;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * lerpFactor;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(render);
    };

    rafId.current = requestAnimationFrame(render);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Interactive Hover Listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor-text], input, textarea, .interactive-card');
      if (target) {
        setIsHovered(true);
        const text = target.getAttribute('data-cursor-text');
        if (text) {
          setCursorText(text);
        } else if (target.tagName.toLowerCase() === 'button' || target.tagName.toLowerCase() === 'a') {
          // Subtle default
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isHovered ? 'hover-active' : ''}`}
        aria-hidden="true"
      >
        {cursorText && <span>{cursorText}</span>}
      </div>
    </>
  );
}
