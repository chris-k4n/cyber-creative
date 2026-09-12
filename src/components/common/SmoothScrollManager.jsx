import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SmoothScrollManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Slight timeout so React finishes mounting the new route DOM nodes
    const timeout = setTimeout(() => {
      const gsap = window.gsap;
      const ScrollTrigger = window.ScrollTrigger;
      const ScrollSmoother = window.ScrollSmoother;
      const SplitType = window.SplitType;

      if (!gsap || !ScrollTrigger) {
        // Fallback: ensure all elements are visible if GSAP is unavailable
        document.querySelectorAll('.reveal, .fade-top, [data-text-animation]').forEach((el) => {
          el.style.opacity = '1';
          el.style.visibility = 'visible';
          el.style.transform = 'none';
        });
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      if (ScrollSmoother) {
        gsap.registerPlugin(ScrollSmoother);
      }

      // 1. Initialize Smooth Inertia Scroller (only on screens >= 1024px)
      const wrapper = document.getElementById('smooth-wrapper');
      const content = document.getElementById('smooth-content');
      if (ScrollSmoother && wrapper && content && window.innerWidth >= 1024) {
        try {
          const existing = ScrollSmoother.get();
          if (existing) existing.kill();

          ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.8,
            effects: true,
            smoothTouch: false,
            normalizeScroll: false,
            ignoreMobileResize: true,
          });
        } catch (err) {
          console.warn('ScrollSmoother initialization:', err);
        }
      }

      // Generous buffer threshold: An element must be scrolled past by at least 450px (well off-screen)
      // before it resets off-screen and arms for retriggering.
      // If it is anywhere within 450px of the viewport, it stays fully visible with zero flicker or reset.
      const BUFFER = Math.max(450, Math.round(window.innerHeight * 0.45));

      /**
       * Reusable helper to create scroll-triggered entrance animations with smart retriggering:
       * - Animates forward when entering from the bottom (scrolling down).
       * - Stays fully visible and NEVER disappears or flickers when scrolling near it ("right above").
       * - When scrolled past by at least `buffer` px (>= 450px), safely resets while completely off-screen.
       * - When scrolling back UP into view, smoothly retriggers as it enters the top of the viewport.
       */
      function createScrollTriggeredAnimation({
        trigger,
        enterThreshold = 0.88,
        onPlay,
        onReset,
        buffer = BUFFER,
      }) {
        let isAnimated = false;
        let hasScrolledPastTop = false;
        let hasScrolledPastBottom = false;

        const checkEntrance = () => {
          const rect = trigger.getBoundingClientRect();
          const vh = window.innerHeight;

          // 1. Scrolling DOWN entrance (entering from bottom):
          if (!isAnimated && !hasScrolledPastTop) {
            if (rect.top <= vh * enterThreshold && rect.bottom > 0) {
              isAnimated = true;
              hasScrolledPastTop = false;
              hasScrolledPastBottom = false;
              onPlay();
              return;
            }
          }

          // 2. Scrolling UP entrance (re-entering from top):
          if (hasScrolledPastTop && !isAnimated) {
            if (rect.bottom >= 50 && rect.top < vh * 0.85) {
              isAnimated = true;
              hasScrolledPastTop = false;
              hasScrolledPastBottom = false;
              onPlay();
              return;
            }
          }

          // 3. Re-entering from bottom if previously scrolled past below:
          if (hasScrolledPastBottom && !isAnimated) {
            if (rect.top <= vh * enterThreshold && rect.bottom > 0) {
              isAnimated = true;
              hasScrolledPastTop = false;
              hasScrolledPastBottom = false;
              onPlay();
              return;
            }
          }
        };

        const st = ScrollTrigger.create({
          trigger: trigger,
          start: () => 'top bottom+=' + buffer,
          end: () => 'bottom top-=' + buffer,
          onUpdate: () => {
            checkEntrance();
          },
          onLeave: () => {
            // User scrolled down at least `buffer` px past the bottom of the element.
            // It is now >= 450px ABOVE the viewport. Safely reset off-screen.
            hasScrolledPastTop = true;
            hasScrolledPastBottom = false;
            if (isAnimated) {
              isAnimated = false;
              onReset();
            }
          },
          onLeaveBack: () => {
            // User scrolled up at least `buffer` px past the top of the element.
            // It is now >= 450px BELOW the viewport. Safely reset off-screen.
            hasScrolledPastBottom = true;
            hasScrolledPastTop = false;
            if (isAnimated) {
              isAnimated = false;
              onReset();
            }
          },
        });

        // Initial check on mount
        const initialRect = trigger.getBoundingClientRect();
        const vh = window.innerHeight;
        if (initialRect.top < vh * 0.88 && initialRect.bottom > -buffer) {
          // In view or right above on mount: play immediately
          isAnimated = true;
          hasScrolledPastTop = false;
          hasScrolledPastBottom = false;
          onPlay();
        } else if (initialRect.bottom <= -buffer) {
          // Mounted while already scrolled far past: arm for scroll-up retrigger
          isAnimated = false;
          hasScrolledPastTop = true;
          hasScrolledPastBottom = false;
          onReset();
        } else {
          // Below the fold on mount
          isAnimated = false;
          hasScrolledPastTop = false;
          hasScrolledPastBottom = false;
          onReset();
        }

        return st;
      }

      // 2. Hero & Page Header Immediate Text Animation (.anim-text)
      if (SplitType) {
        const animTextElements = document.querySelectorAll('.anim-text');
        animTextElements.forEach((el) => {
          if (el.classList.contains('anim-split-done')) return;
          el.classList.add('anim-split-done');

          try {
            const split = new SplitType(el, {
              types: 'lines, chars',
              className: 'char',
            });
            const chars = el.querySelectorAll('.char');
            if (chars.length > 0) {
              const onReset = () => {
                gsap.killTweensOf(chars);
                gsap.set(chars, { y: '105%', opacity: 0 });
              };

              const onPlay = () => {
                gsap.killTweensOf(chars);
                gsap.to(chars, {
                  y: '0%',
                  opacity: 1,
                  duration: 0.9,
                  stagger: 0.03,
                  ease: 'power2.out',
                  delay: 0.05,
                });
              };

              createScrollTriggeredAnimation({
                trigger: el,
                enterThreshold: 0.95,
                onPlay,
                onReset,
                buffer: BUFFER,
              });
            }
          } catch (e) {
            el.style.opacity = '1';
          }
        });
      }

      // 3. Scroll-Triggered Headings ([data-text-animation])
      if (SplitType) {
        const textAnimElements = document.querySelectorAll('[data-text-animation]');
        textAnimElements.forEach((animation) => {
          if (animation.classList.contains('text-anim-done')) return;
          animation.classList.add('text-anim-done');

          try {
            const type = animation.getAttribute('data-text-animation') || 'slide-up';
            const splitMode = animation.getAttribute('data-split') || 'word';
            const duration = parseFloat(animation.getAttribute('data-duration') || '0.8');

            const split = new SplitType(animation, {
              types: 'lines, words, chars',
              className: splitMode === 'word' ? 'word' : 'char',
            });

            const targetClass = splitMode === 'word' ? '.word' : '.char';
            const targets = animation.querySelectorAll(targetClass);

            if (targets.length > 0) {
              if (type === 'fade-in') {
                const onReset = () => {
                  gsap.killTweensOf(targets);
                  gsap.set(targets, { opacity: 0 });
                };
                const onPlay = () => {
                  gsap.killTweensOf(targets);
                  gsap.to(targets, {
                    opacity: 1,
                    duration: duration,
                    stagger: 0.03,
                    ease: 'power2.out',
                  });
                };

                createScrollTriggeredAnimation({
                  trigger: animation,
                  enterThreshold: 0.85,
                  onPlay,
                  onReset,
                  buffer: BUFFER,
                });
              } else {
                // slide-up or default
                const onReset = () => {
                  gsap.killTweensOf(targets);
                  gsap.set(targets, { opacity: 0, y: 35 });
                };
                const onPlay = () => {
                  gsap.killTweensOf(targets);
                  gsap.to(targets, {
                    opacity: 1,
                    y: 0,
                    duration: duration,
                    stagger: 0.03,
                    ease: 'power2.out',
                  });
                };

                createScrollTriggeredAnimation({
                  trigger: animation,
                  enterThreshold: 0.85,
                  onPlay,
                  onReset,
                  buffer: BUFFER,
                });
              }
            }
          } catch (e) {
            animation.style.opacity = '1';
          }
        });
      }

      // 4. Staggered Fade-Up Elements (.fade-top)
      const fadeItems = document.querySelectorAll('.fade-top');
      fadeItems.forEach((element) => {
        if (element.classList.contains('fade-top-done')) return;
        element.classList.add('fade-top-done');

        const parent = element.closest('.fade-wrapper') || element.parentElement;
        const siblings = parent ? Array.from(parent.querySelectorAll('.fade-top')) : [];
        const index = siblings.indexOf(element);
        const delay = ((index >= 0 ? index : 0) % 4) * 0.12;

        const onReset = () => {
          gsap.killTweensOf(element);
          gsap.set(element, { opacity: 0, y: 70 });
        };

        const onPlay = () => {
          gsap.killTweensOf(element);
          gsap.to(element, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: delay,
            ease: 'power2.out',
          });
        };

        createScrollTriggeredAnimation({
          trigger: element,
          enterThreshold: 0.92,
          onPlay,
          onReset,
          buffer: BUFFER,
        });
      });

      // 5. Image Reveal Animation (.reveal)
      const revealContainers = document.querySelectorAll('.reveal');
      revealContainers.forEach((container) => {
        if (container.classList.contains('reveal-done')) return;
        container.classList.add('reveal-done');

        const image = container.querySelector('img');
        if (!image) {
          container.style.visibility = 'visible';
          container.style.opacity = '1';
          return;
        }

        const onReset = () => {
          gsap.killTweensOf([container, image]);
          gsap.set(container, { autoAlpha: 0, xPercent: -100 });
          gsap.set(image, { xPercent: 100, scale: 1.25 });
        };

        const onPlay = () => {
          gsap.killTweensOf([container, image]);
          gsap.set(container, { autoAlpha: 1 });
          gsap.to(container, {
            duration: 1.2,
            xPercent: 0,
            ease: 'power2.out',
          });
          gsap.to(
            image,
            {
              duration: 1.2,
              xPercent: 0,
              scale: 1,
              ease: 'power2.out',
            },
            '<'
          );
        };

        createScrollTriggeredAnimation({
          trigger: container,
          enterThreshold: 0.85,
          onPlay,
          onReset,
          buffer: BUFFER,
        });
      });

      // 6. Refresh ScrollTrigger calculations
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timeout);
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((t) => t.kill());
      }
      document.querySelectorAll('.fade-top-done').forEach((el) => el.classList.remove('fade-top-done'));
      document.querySelectorAll('.reveal-done').forEach((el) => el.classList.remove('reveal-done'));
    };
  }, [pathname]);

  return null;
}
