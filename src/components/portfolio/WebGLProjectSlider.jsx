import React, { useEffect, useRef } from 'react';
import './WebGLProjectSlider.css';
import { initMiwSlider } from './miwSliderEngine';
import { PORTFOLIO_PROJECTS } from '../../data/portfolioData';

export default function WebGLProjectSlider({ projects = PORTFOLIO_PROJECTS }) {
  const canvasRef = useRef(null);
  const sliderInstanceRef = useRef(null);

  useEffect(() => {
    let timer = null;
    let isMounted = true;

    // Small delay ensures DOM nodes and computed styles are fully painted
    timer = setTimeout(() => {
      if (isMounted && canvasRef.current) {
        try {
          sliderInstanceRef.current = initMiwSlider(canvasRef.current);
        } catch (err) {
          console.error('[WebGLProjectSlider] Failed to init slider engine:', err);
        }
      }
    }, 80);

    return () => {
      isMounted = false;
      if (timer) clearTimeout(timer);
      if (sliderInstanceRef.current && typeof sliderInstanceRef.current.destroy === 'function') {
        try {
          sliderInstanceRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
        sliderInstanceRef.current = null;
      }
    };
  }, []);

  return (
    <section className="webgl_slider_wrap" aria-label="3D Interactive Project Slider">
      {/* Centered Heading */}
      <div className="webgl_slider_contain">
        <div className="webgl_slider_heading_center">
          <h2>Interactive Gallery</h2>
        </div>
      </div>

      {/* WebGL Canvas Stage & Cards */}
      <div
        ref={canvasRef}
        className="webgl_canvas"
        data-webgl-canvas=""
        data-hole-x="0"
        data-hole-y="0"
        data-hole-w="1"
        data-hole-h="1"
        data-fit="cover"
        data-anchor="center"
        data-hover-dim="0.75"
        data-scroll-span="-3"
      >
        {projects.map((project, idx) => (
          <div
            className="webgl_cards_wrap"
            data-webgl-item=""
            key={project.id || idx}
          >
            <button
              aria-label={`Open ${project.title}`}
              className="webgl_card_inner_button u-link-overlay"
              type="button"
            />
            <div className="webgl_card_inner_wrap">
              {/* Main card screenshot (full 1440x900) */}
              <img
                alt={project.title}
                className="webgl_card_inner_img"
                data-webgl-image=""
                loading="eager"
                src={project.image}
              />
              {/* Floating tag badge */}
              <div className="webgl_cards_tag" data-webgl-tag="">
                <div className="webgl_cards_svg_wrap">
                  <img
                    alt=""
                    className="webgl_cards_png"
                    loading="eager"
                    src={project.icon || project.image}
                  />
                </div>
                <div className="webgl_cards_name_wrap">
                  <div className="webgl_cards_poject">{project.title}</div>
                  <div className="webgl_cards_name_by">
                    <span className="webgl_cards_studio">by</span>
                    {project.link && project.link !== '#' ? (
                      <a
                        className="webgl_cards_studio"
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {project.client}
                      </a>
                    ) : (
                      <span className="webgl_cards_studio">{project.client}</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Close Button for 3D zoomed card */}
              <button
                aria-label="Close"
                className="webgl_card_inner_close"
                data-webgl-close=""
                type="button"
              >
                <svg
                  aria-hidden="true"
                  className="webgl_card_inner_x"
                  fill="none"
                  viewBox="0 0 32 32"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.0713 10.9287L10.9281 21.0719"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10.9287 10.9287L21.0719 21.0719"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Guidance Hint */}
      <div className="webgl_slider_hint">
        <span>← Drag horizontally or scroll to bend & navigate ribbon →</span>
      </div>
    </section>
  );
}
