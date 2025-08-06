import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ThemeSwitcher = ({ showLabel = true, size = 'md' }) => {
  const { darkMode, toggleTheme } = useTheme();

  const sizes = {
    sm: 'w-12 h-6',
    md: 'w-14 h-7',
    lg: 'w-16 h-8'
  };

  const toggleSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6', 
    lg: 'w-7 h-7'
  };

  return (
    <div className="flex items-center space-x-3">
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {darkMode ? '🌙' : '☀️'} Theme
        </span>
      )}
      
      <button
        onClick={toggleTheme}
        className={`
          relative inline-flex items-center ${sizes[size]} rounded-full 
          transition-colors duration-300 focus:outline-none focus:ring-2 
          focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white 
          dark:focus:ring-offset-gray-800
          ${darkMode ? 'bg-primary-600' : 'bg-gray-200'}
        `}
        role="switch"
        aria-checked={darkMode}
        aria-label="Toggle dark mode"
      >
        <span className="sr-only">Toggle theme</span>
        
        {/* Toggle Circle */}
        <div
          className={`
            ${toggleSizes[size]} rounded-full shadow-lg ring-0 
            transition-all duration-300 ease-in-out transform
            ${darkMode 
              ? 'translate-x-7 bg-gray-100' 
              : 'translate-x-0 bg-white'
            }
            flex items-center justify-center
          `}
        >
          {/* Icon inside toggle */}
          <span className="text-xs">
            {darkMode ? '🌙' : '☀️'}
          </span>
        </div>
        
        {/* Background Icons */}
        <div className="absolute inset-0 flex items-center justify-between px-1 text-xs pointer-events-none">
          <span className={`transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`}>
            ☀️
          </span>
          <span className={`transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}>
            🌙
          </span>
        </div>
      </button>
      
      {showLabel && (
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {darkMode ? 'Dark' : 'Light'}
        </span>
      )}
    </div>
  );
};

export default ThemeSwitcher;
