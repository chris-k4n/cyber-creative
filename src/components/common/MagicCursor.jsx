import React, { useEffect, useRef } from 'react';

export default function MagicCursor() {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const isVisibleRef = useRef(false);
  const isMouseDownRef = useRef(false);

  useEffect(() => {
    // Only run on non-touch devices
    if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
      return;
    }

    const cursor = cursorRef.current;
    const textEl = textRef.current;
    if (!cursor) return;

    cursor.classList.add('-visible');

    const updateCoordinates = (clientX, clientY) => {
      if (typeof clientX === 'number' && !isNaN(clientX) && typeof clientY === 'number' && !isNaN(clientY)) {
        mouseRef.current.x = clientX;
        mouseRef.current.y = clientY;

        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          posRef.current.x = clientX;
          posRef.current.y = clientY;
          cursor.classList.add('-visible');
        }

        // If mouse button is held down (highlighting/dragging), track 1:1 immediately with zero lag
        if (isMouseDownRef.current) {
          posRef.current.x = clientX;
          posRef.current.y = clientY;
          cursor.style.transform = `translate3d(${clientX}px, ${clientY}px, 0)`;
        }
      }
    };

    const onMove = (e) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    // Smooth animation loop using lerp (speed 0.35 when moving, instantaneous when dragging)
    let animId;
    const render = () => {
      if (!isMouseDownRef.current) {
        posRef.current.x += (mouseRef.current.x - posRef.current.x) * 0.35;
        posRef.current.y += (mouseRef.current.y - posRef.current.y) * 0.35;

        if (cursor) {
          cursor.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        }
      }
      animId = requestAnimationFrame(render);
    };
    animId = requestAnimationFrame(render);

    const onMouseDown = (e) => {
      isMouseDownRef.current = true;
      // Immediately clear all hover expand/text states during highlight/click
      cursor.classList.remove('all-element', '-text');
      if (textEl) textEl.textContent = '';

      if (e.button === 0) {
        cursor.classList.add('-active');
      } else {
        cursor.classList.remove('-active');
      }
      onMove(e);
    };

    const handleReset = (e) => {
      isMouseDownRef.current = false;
      if (cursor) {
        cursor.classList.remove('-active', 'all-element', '-text');
      }
      if (textEl) textEl.textContent = '';
      if (e && typeof e.clientX === 'number') {
        onMove(e);
      }
    };

    const onMouseLeave = () => {
      isMouseDownRef.current = false;
      if (cursor) {
        cursor.classList.remove('-visible', '-active', 'all-element', '-text');
      }
      isVisibleRef.current = false;
    };

    const onMouseEnter = (e) => {
      if (cursor) {
        cursor.classList.add('-visible');
      }
      isVisibleRef.current = true;
      if (e) onMove(e);
    };

    // Safe target check for hover styles
    const getTarget = (node) => {
      if (!node) return null;
      try {
        if (node.nodeType === 1) {
          return node.closest('a, button, input, textarea, h1, h2, img, .cs-item, .service-box, .job-card, [data-cursor-text]');
        }
        if (node.parentElement && node.parentElement.nodeType === 1) {
          return node.parentElement.closest('a, button, input, textarea, h1, h2, img, .cs-item, .service-box, .job-card, [data-cursor-text]');
        }
      } catch (err) {
        return null;
      }
      return null;
    };

    const onMouseOver = (e) => {
      // If mouse button is held down (actively highlighting or dragging text),
      // DO NOT trigger hover scale changes that conflict with text selection!
      if (isMouseDownRef.current || e.buttons > 0) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
        return;
      }

      // If text selection is active on the page, keep pure inverting circle
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
        return;
      }

      const target = getTarget(e.target);
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

    const onMouseOut = (e) => {
      if (isMouseDownRef.current || e.buttons > 0) return;
      const target = getTarget(e.target);
      if (target) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
      }
    };

    const onSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        cursor.classList.remove('all-element', '-text');
        if (textEl) textEl.textContent = '';
      }
    };

    // CRITICAL: Prevent HTML5 dragstart on text selection/elements
    // In Chromium on Windows, dragging across selected text triggers native HTML5 drag-and-drop,
    // which silences all mousemove and pointermove events and prevents mouseup from firing!
    const onDragStart = (e) => {
      // Only allow drag if explicitly a native file input or similar
      if (e.target && e.target.tagName === 'INPUT' && e.target.type === 'file') {
        return;
      }
      e.preventDefault();
    };

    const onDragOver = (e) => {
      updateCoordinates(e.clientX, e.clientY);
    };

    // Top-level capture listeners: guarantee we receive events even if child elements stop propagation
    window.addEventListener('mousemove', onMove, { capture: true, passive: true });
    window.addEventListener('pointermove', onMove, { capture: true, passive: true });
    window.addEventListener('dragover', onDragOver, { capture: true, passive: true });
    window.addEventListener('drag', onDragOver, { capture: true, passive: true });

    // Drag lifecycle
    window.addEventListener('dragstart', onDragStart, { capture: true });
    window.addEventListener('dragend', handleReset, { capture: true });
    window.addEventListener('drop', handleReset, { capture: true });

    // Mouse button state events
    window.addEventListener('mousedown', onMouseDown, { capture: true });
    window.addEventListener('mouseup', handleReset, { capture: true });
    window.addEventListener('pointerup', handleReset, { capture: true });
    window.addEventListener('pointercancel', handleReset, { capture: true });

    // Browser context / blur events
    window.addEventListener('contextmenu', handleReset, { capture: true });
    window.addEventListener('auxclick', handleReset, { capture: true });
    window.addEventListener('blur', handleReset, { capture: true });
    window.addEventListener('focus', onMouseEnter, { capture: true });

    // Document boundary & selection events
    document.addEventListener('mouseleave', onMouseLeave, { capture: true });
    document.addEventListener('mouseenter', onMouseEnter, { capture: true });
    document.addEventListener('mouseover', onMouseOver, { capture: true, passive: true });
    document.addEventListener('mouseout', onMouseOut, { capture: true, passive: true });
    document.addEventListener('selectionchange', onSelectionChange, { passive: true });

    return () => {
      cancelAnimationFrame(animId);

      window.removeEventListener('mousemove', onMove, { capture: true });
      window.removeEventListener('pointermove', onMove, { capture: true });
      window.removeEventListener('dragover', onDragOver, { capture: true });
      window.removeEventListener('drag', onDragOver, { capture: true });

      window.removeEventListener('dragstart', onDragStart, { capture: true });
      window.removeEventListener('dragend', handleReset, { capture: true });
      window.removeEventListener('drop', handleReset, { capture: true });

      window.removeEventListener('mousedown', onMouseDown, { capture: true });
      window.removeEventListener('mouseup', handleReset, { capture: true });
      window.removeEventListener('pointerup', handleReset, { capture: true });
      window.removeEventListener('pointercancel', handleReset, { capture: true });

      window.removeEventListener('contextmenu', handleReset, { capture: true });
      window.removeEventListener('auxclick', handleReset, { capture: true });
      window.removeEventListener('blur', handleReset, { capture: true });
      window.removeEventListener('focus', onMouseEnter, { capture: true });

      document.removeEventListener('mouseleave', onMouseLeave, { capture: true });
      document.removeEventListener('mouseenter', onMouseEnter, { capture: true });
      document.removeEventListener('mouseover', onMouseOver, { capture: true });
      document.removeEventListener('mouseout', onMouseOut, { capture: true });
      document.removeEventListener('selectionchange', onSelectionChange);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="cb-cursor -exclusion"
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}
    >
      <div
        ref={textRef}
        className="cb-cursor-text"
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          WebkitUserSelect: 'none'
        }}
      ></div>
    </div>
  );
}
