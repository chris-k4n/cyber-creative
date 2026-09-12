import React, { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * CyberCreative Quick & Smooth Page Transition Engine
 * 
 * Flow:
 * - When switching to a different page while scrolled down, the quick scroll up animation
 *   fully plays so the page is 100% scrolled all the way to the top before navigating.
 * - Fast, responsive (~0.35s - 0.45s), and buttery smooth with GSAP power3.inOut easing.
 * - As soon as it reaches the top, the route changes and the new page enters smoothly.
 * - Handles both GSAP ScrollSmoother and native scrolling flawlessly across desktop and mobile.
 */
export default function PageTransition() {
  const location = useLocation();
  const navigate = useNavigate();
  const topLaserRef = useRef(null);
  const isNavigatingRef = useRef(false);
  const currentPathRef = useRef(location.pathname);
  const isFirstMountRef = useRef(true);

  // Sync current path
  useEffect(() => {
    currentPathRef.current = location.pathname;
  }, [location.pathname]);

  // Handle route change completion (e.g. browser Back/Forward navigation)
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    const smoother = window.ScrollSmoother ? window.ScrollSmoother.get() : null;
    if (smoother) {
      smoother.scrollTop(0);
    }
    window.scrollTo(0, 0);

    // If navigation happened outside triggerTransition (e.g. browser Back/Forward buttons)
    if (!isNavigatingRef.current) {
      const gsap = window.gsap;
      const topLaser = topLaserRef.current;
      const content = document.getElementById('smooth-content');

      if (topLaser && gsap) {
        gsap.killTweensOf(topLaser);
        gsap.fromTo(
          topLaser,
          { width: '0%', opacity: 1 },
          {
            width: '100%',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              gsap.to(topLaser, { opacity: 0, duration: 0.2 });
            }
          }
        );
      }

      if (content && gsap) {
        gsap.killTweensOf(content);
        gsap.fromTo(
          content,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.35,
            ease: 'power3.out'
          }
        );
      }
    }
  }, [location.pathname]);

  // Transition orchestrator for switching pages
  const triggerTransition = (targetPath) => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;

    const gsap = window.gsap;
    const topLaser = topLaserRef.current;
    const content = document.getElementById('smooth-content');
    const smoother = window.ScrollSmoother ? window.ScrollSmoother.get() : null;

    // Get current scroll position
    const startY = smoother
      ? smoother.scrollTop()
      : (window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0);

    // Fallback if GSAP is unavailable
    if (!gsap) {
      if (smoother) smoother.scrollTop(0);
      window.scrollTo(0, 0);
      navigate(targetPath);
      isNavigatingRef.current = false;
      return;
    }

    if (topLaser) gsap.killTweensOf(topLaser);
    if (content) gsap.killTweensOf(content);

    // SCENARIO 1: User has scrolled down (> 15px)
    // Run the quick scroll up animation in full so the page is completely at the top before switching!
    if (startY > 15) {
      // Fast yet silky duration (0.35s to 0.44s depending on distance)
      const duration = Math.min(0.44, Math.max(0.34, (startY / 3000) * 0.3 + 0.3));
      const scrollObj = { y: startY };

      // 1. Neon laser progress bar sweeps smoothly across top
      if (topLaser) {
        gsap.fromTo(
          topLaser,
          { width: '0%', opacity: 1 },
          { width: '100%', opacity: 1, duration: duration, ease: 'power2.inOut' }
        );
      }

      // 2. Animate scroll position all the way up to 0 at 60/120fps
      gsap.to(scrollObj, {
        y: 0,
        duration: duration,
        ease: 'power3.inOut',
        onUpdate: () => {
          if (smoother) {
            smoother.scrollTop(scrollObj.y);
          } else {
            window.scrollTo(0, scrollObj.y);
          }
        },
        onComplete: () => {
          // The page is now 100% fully up at the top!
          if (smoother) {
            smoother.scrollTop(0);
          }
          window.scrollTo(0, 0);
          document.documentElement.scrollTop = 0;
          document.body.scrollTop = 0;

          // Switch to the target page
          navigate(targetPath);

          // 3. Smooth, subtle entrance for the newly mounted page
          if (content) {
            gsap.fromTo(
              content,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.32,
                ease: 'power2.out',
                delay: 0.02,
                onComplete: () => {
                  isNavigatingRef.current = false;
                }
              }
            );
          } else {
            isNavigatingRef.current = false;
          }

          if (topLaser) {
            gsap.to(topLaser, { opacity: 0, duration: 0.25, delay: 0.02 });
          }
        }
      });
    }
    // SCENARIO 2: User is already at the top (<= 15px)
    // Switch immediately with a fast, snappy crossfade
    else {
      const quickDuration = 0.18;

      if (topLaser) {
        gsap.fromTo(
          topLaser,
          { width: '0%', opacity: 1 },
          { width: '100%', opacity: 1, duration: quickDuration, ease: 'power2.inOut' }
        );
      }

      if (content) {
        gsap.to(content, {
          opacity: 0,
          duration: quickDuration,
          ease: 'power2.in',
          onComplete: () => {
            if (smoother) smoother.scrollTop(0);
            window.scrollTo(0, 0);

            navigate(targetPath);

            gsap.fromTo(
              content,
              { opacity: 0, y: 15 },
              {
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
                delay: 0.02,
                onComplete: () => {
                  isNavigatingRef.current = false;
                }
              }
            );

            if (topLaser) {
              gsap.to(topLaser, { opacity: 0, duration: 0.2, delay: 0.02 });
            }
          }
        });
      } else {
        navigate(targetPath);
        isNavigatingRef.current = false;
      }
    }
  };

  // Intercept all internal link clicks across the entire app
  useEffect(() => {
    const handleDocumentClick = (e) => {
      const anchor = e.target.closest('a');
      if (!anchor) return;

      // Ignore modified clicks (cmd, ctrl, shift, middle-click)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Ignore external URLs, anchors, protocols, downloads, or target="_blank"
      if (
        href.startsWith('http') ||
        href.startsWith('//') ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        anchor.target === '_blank' ||
        anchor.hasAttribute('download')
      ) {
        return;
      }

      // Internal route link
      if (href.startsWith('/')) {
        const currentNormalized = currentPathRef.current.replace(/\/$/, '') || '/';
        const targetNormalized = href.replace(/\/$/, '') || '/';

        // Same page link: smoothly scroll to top
        if (targetNormalized === currentNormalized) {
          e.preventDefault();
          const smoother = window.ScrollSmoother ? window.ScrollSmoother.get() : null;
          const gsap = window.gsap;
          const startY = smoother
            ? smoother.scrollTop()
            : (window.pageYOffset || document.documentElement.scrollTop || window.scrollY || 0);

          if (startY > 15 && gsap) {
            const scrollObj = { y: startY };
            gsap.to(scrollObj, {
              y: 0,
              duration: 0.4,
              ease: 'power3.inOut',
              onUpdate: () => {
                if (smoother) smoother.scrollTop(scrollObj.y);
                else window.scrollTo(0, scrollObj.y);
              },
              onComplete: () => {
                if (smoother) smoother.scrollTop(0);
                window.scrollTo(0, 0);
              }
            });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          return;
        }

        // New page link: trigger the fast & smooth scroll-up transition
        e.preventDefault();
        triggerTransition(href);
      }
    };

    document.addEventListener('click', handleDocumentClick, { capture: true });
    return () => document.removeEventListener('click', handleDocumentClick, { capture: true });
  }, []);

  return (
    /* Glowing Cyber Laser Progress Beam at the top of the viewport */
    <div
      ref={topLaserRef}
      id="cc-transition-laser"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '3px',
        width: '0%',
        backgroundColor: 'var(--cc-primary, #3F5AF3)',
        boxShadow: '0 0 12px var(--cc-primary, #3F5AF3), 0 0 24px var(--cc-primary-glow, rgba(63,90,243,0.8))',
        zIndex: 9999999,
        pointerEvents: 'none',
        opacity: 0,
        willChange: 'width, opacity'
      }}
    />
  );
}
