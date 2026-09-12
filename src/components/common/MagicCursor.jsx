import React, { useEffect, useRef } from 'react';

export default function MagicCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor) return;

    cursor.classList.add('-visible');

    const onMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        cursor.classList.add('-visible');
      }
    };

    const onMouseDown = () => {
      cursor.classList.add('-active');
    };

    const onMouseUp = () => {
      cursor.classList.remove('-active');
    };

    const onMouseLeave = () => {
      cursor.classList.remove('-visible');
      isVisibleRef.current = false;
    };

    const onMouseEnter = () => {
      cursor.classList.add('-visible');
      isVisibleRef.current = true;
    };

    // Smooth animation loop using lerp (speed 0.18)
    let animId;
    const render = () => {
      posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.18;
      posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.18;

      if (cursor) {
        cursor.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    // Delegate hover listeners on interactive targets
    const handleElementOver = (e) => {
      const target = e.target.closest('a, button, input, textarea, h1, h2, img, .cs-item, .service-box, .job-card, [data-cursor-text]');
      if (!target) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
        return;
      }

      const cursorText = target.getAttribute('data-cursor-text');
      if (cursorText) {
        cursor.classList.add('-text');
        if (textEl) textEl.textContent = cursorText;
      } else {
        cursor.classList.add('all-element');
      }
    };

    const handleElementOut = (e) => {
      const target = e.target.closest('a, button, input, textarea, h1, h2, img, .cs-item, .service-box, .job-card, [data-cursor-text]');
      if (target) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseover', handleElementOver, { passive: true });
    document.addEventListener('mouseout', handleElementOut, { passive: true });

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseover', handleElementOver);
      document.removeEventListener('mouseout', handleElementOut);
    };
  }, []);

  return (
    <div ref={cursorRef} className="cb-cursor -exclusion">
      <div ref={textRef} className="cb-cursor-text"></div>
    </div>
  );
}
