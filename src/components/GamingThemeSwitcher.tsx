"use client";

import React, { useState } from 'react';
import { Button } from '@once-ui-system/core';

interface GamingTheme {
  name: string;
  description: string;
  className: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

const gamingThemes: GamingTheme[] = [
  {
    name: "Developer",
    description: "Clean professional theme",
    className: "",
    colors: {
      primary: "#6b7280",
      secondary: "#374151", 
      accent: "#059669"
    }
  },
  {
    name: "Gamer",
    description: "Gaming violet theme",
    className: "theme-violet-neon",
    colors: {
      primary: "#8b45ff",
      secondary: "#ff1493", 
      accent: "#00ffff"
    }
  }
];

export const GamingThemeSwitcher: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("theme-violet-neon");

  const switchTheme = (theme: GamingTheme) => {
    // Remove all theme classes (skip empty classNames)
    gamingThemes.forEach(t => {
      if (t.className) {
        document.documentElement.classList.remove(t.className);
      }
    });
    
    // Remove existing energy particles
    document.querySelectorAll('.ember-particle-1, .ember-particle-2, .ember-particle-3').forEach(el => el.remove());
    
    // Add selected theme class (only if not empty)
    if (theme.className) {
      document.documentElement.classList.add(theme.className);
      
      // Add digital energy particles for gamer theme
      if (theme.className === 'theme-violet-neon') {
        const particles = ['ember-particle-1', 'ember-particle-2', 'ember-particle-3'];
        particles.forEach(particle => {
          const energy = document.createElement('div');
          energy.className = particle;
          document.body.appendChild(energy);
        });
      }
    }
    setCurrentTheme(theme.className);

    // Store preference
    localStorage.setItem('gaming-theme', theme.className);
  };

  React.useEffect(() => {
    // Load saved theme on mount
    const savedTheme = localStorage.getItem('gaming-theme');
    if (savedTheme) {
      const theme = gamingThemes.find(t => t.className === savedTheme);
      if (theme) {
        switchTheme(theme);
      }
    }
  }, []);

  return (
    <div className="gaming-theme-switcher" style={{ 
      position: 'fixed', 
      top: '20px', 
      right: '20px', 
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '8px',
      borderRadius: '8px',
      border: '1px solid rgba(139, 69, 255, 0.2)'
    }}>
      <div style={{ display: 'flex', gap: '4px' }}>
        {gamingThemes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => switchTheme(theme)}
            className={`theme-btn ${currentTheme === theme.className ? 'active' : ''}`}
            style={{
              background: currentTheme === theme.className 
                ? `linear-gradient(45deg, ${theme.colors.primary}, ${theme.colors.secondary})` 
                : 'rgba(255, 255, 255, 0.1)',
              border: `1px solid ${theme.colors.primary}`,
              color: '#fff',
              padding: '6px 10px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: '500',
              transition: 'all 0.3s ease',
              minWidth: '60px'
            }}
            onMouseEnter={(e) => {
              if (currentTheme !== theme.className) {
                e.currentTarget.style.background = `linear-gradient(45deg, ${theme.colors.primary}30, ${theme.colors.secondary}30)`;
              }
            }}
            onMouseLeave={(e) => {
              if (currentTheme !== theme.className) {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }
            }}
          >
            {theme.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GamingThemeSwitcher;