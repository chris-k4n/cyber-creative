import React, { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme-preference');
    if (saved) return saved;
    return 'dark'; // default theme is sleek dark mode for CyberCreative
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme-preference', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div 
      id="theme-toogle" 
      className="switcher-button" 
      onClick={toggleTheme} 
      title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
      aria-label={theme}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') toggleTheme(); }}
    >
      <div className="switcher-button-inner-left"></div>
      <div className="switcher-button-inner"></div>
    </div>
  );
}
