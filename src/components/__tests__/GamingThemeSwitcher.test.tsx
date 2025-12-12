import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import GamingThemeSwitcher from '@/components/GamingThemeSwitcher';

describe('GamingThemeSwitcher Component', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
  });

  test('renders theme switcher with Developer and Gamer buttons', () => {
    render(<GamingThemeSwitcher />);
    
    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Gamer')).toBeInTheDocument();
  });

  test('switches to Gamer theme when clicked', () => {
    render(<GamingThemeSwitcher />);
    
    const gamerButton = screen.getByText('Gamer');
    fireEvent.click(gamerButton);
    
    expect(document.documentElement.classList.contains('theme-violet-neon')).toBe(true);
    expect(localStorage.getItem('gaming-theme')).toBe('theme-violet-neon');
  });

  test('switches to Developer theme when clicked', () => {
    // Start with gamer theme
    document.documentElement.classList.add('theme-violet-neon');
    
    render(<GamingThemeSwitcher />);
    
    const developerButton = screen.getByText('Developer');
    fireEvent.click(developerButton);
    
    expect(document.documentElement.classList.contains('theme-violet-neon')).toBe(false);
    expect(localStorage.getItem('gaming-theme')).toBe('');
  });

  test('loads saved theme from localStorage', () => {
    localStorage.setItem('gaming-theme', 'theme-violet-neon');
    
    render(<GamingThemeSwitcher />);
    
    expect(document.documentElement.classList.contains('theme-violet-neon')).toBe(true);
  });

  test('adds digital energy particles for gamer theme', () => {
    render(<GamingThemeSwitcher />);
    
    const gamerButton = screen.getByText('Gamer');
    fireEvent.click(gamerButton);
    
    const particles = document.querySelectorAll('.ember-particle-1, .ember-particle-2, .ember-particle-3');
    expect(particles.length).toBe(3);
  });

  test('removes particles when switching to developer theme', () => {
    render(<GamingThemeSwitcher />);
    
    // Add gamer theme first
    fireEvent.click(screen.getByText('Gamer'));
    expect(document.querySelectorAll('.ember-particle-1, .ember-particle-2, .ember-particle-3').length).toBe(3);
    
    // Switch to developer theme
    fireEvent.click(screen.getByText('Developer'));
    expect(document.querySelectorAll('.ember-particle-1, .ember-particle-2, .ember-particle-3').length).toBe(0);
  });
});