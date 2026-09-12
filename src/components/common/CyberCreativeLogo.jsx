import React from 'react';

/**
 * CyberCreative Brand SVG Logo
 * 
 * Features:
 * - Geometric cyber-nexus emblem with dual interlocking facets (Cyber + Creative).
 * - Fully responsive to the theme color: uses `var(--cc-primary)` and `var(--cc-primary-glow)`.
 *   Changing `--cc-primary` in `index.css` automatically updates the entire logo color!
 * - Automatic light/dark mode text adaptation.
 * - Supports `iconOnly` mode for compact spaces and favicons.
 */
export default function CyberCreativeLogo({ 
  height = 38, 
  iconOnly = false, 
  className = '', 
  style = {} 
}) {
  const iconWidth = Math.round((height / 38) * 38);

  return (
    <div 
      className={`cybercreative-logo-wrap ${className}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: iconOnly ? '0px' : '11px',
        userSelect: 'none',
        ...style
      }}
    >
      {/* SVG Icon Emblem */}
      <svg 
        width={iconWidth} 
        height={height} 
        viewBox="0 0 44 44" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
          flexShrink: 0,
          filter: 'drop-shadow(0 2px 8px var(--cc-primary-glow, rgba(63,90,243,0.35)))'
        }}
      >
        <defs>
          {/* Main Primary Gradient: Driven by CSS variable */}
          <linearGradient id="cc-emblem-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--cc-primary, #3F5AF3)" />
            <stop offset="65%" stopColor="var(--cc-primary, #3F5AF3)" />
            <stop offset="100%" stopColor="var(--cc-primary-glow, rgba(63,90,243,0.6))" />
          </linearGradient>

          {/* Accent Cyber Highlight Gradient */}
          <linearGradient id="cc-emblem-accent" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--cc-primary, #3F5AF3)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
          </linearGradient>

          {/* Core Glow Filter */}
          <filter id="cc-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Cyber Shield / Hexagonal Facet */}
        <path 
          d="M22 2.5 L39.5 11.5 V32.5 L22 41.5 L4.5 32.5 V11.5 Z" 
          stroke="var(--cc-primary, #3F5AF3)" 
          strokeWidth="1.5" 
          strokeOpacity="0.35"
          fill="none"
        />

        {/* Stylized Outer "C" Cyber Band */}
        <path 
          d="M34 14.5 L22 7.5 L10 14.5 V29.5 L22 36.5 L34 29.5 L29 26.5 L22 31 L15 26.5 V17.5 L22 13 L29 17.5 Z" 
          fill="url(#cc-emblem-grad)" 
        />

        {/* Inner Creative Spark / Core Nexus */}
        <path 
          d="M22 17 L28 22 L22 27 L16 22 Z" 
          fill="url(#cc-emblem-accent)"
          filter="url(#cc-glow)"
        />

        {/* Dynamic Center Node */}
        <circle 
          cx="22" 
          cy="22" 
          r="2" 
          fill="#ffffff" 
        />

        {/* Upper Cyber Pulse Dots */}
        <circle cx="22" cy="7.5" r="1.5" fill="var(--cc-primary, #3F5AF3)" />
        <circle cx="34" cy="14.5" r="1.5" fill="var(--cc-primary, #3F5AF3)" />
        <circle cx="34" cy="29.5" r="1.5" fill="var(--cc-primary, #3F5AF3)" />
      </svg>

      {/* Typography Lockup (Hidden if iconOnly = true) */}
      {!iconOnly && (
        <span 
          className="brand-text" 
          style={{ 
            fontSize: `${Math.round(height * 0.58)}px`, 
            fontWeight: '800', 
            letterSpacing: '-0.03em',
            display: 'inline-flex',
            alignItems: 'baseline',
            lineHeight: 1
          }}
        >
          <span className="brand-word-cyber" style={{ color: 'var(--cc-logo-text, #ffffff)' }}>
            Cyber
          </span>
          <span 
            className="brand-word-creative" 
            style={{ 
              color: 'var(--cc-primary, #3F5AF3)',
              marginLeft: '1px'
            }}
          >
            Creative
          </span>
          <span 
            style={{ 
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: 'var(--cc-primary, #3F5AF3)',
              marginLeft: '3px',
              marginBottom: '2px',
              boxShadow: '0 0 6px var(--cc-primary, #3F5AF3)'
            }} 
          />
        </span>
      )}
    </div>
  );
}
