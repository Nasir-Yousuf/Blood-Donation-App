'use client';

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ThemeToggle({ className = '', showLabel = false }) {
  const { isDark, toggleTheme, mounted } = useTheme();
  const { t } = useLanguage();

  if (!mounted) {
    return (
      <div
        className={`h-9 w-9 rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      title={isDark ? t('switchToLight', 'Switch to Day Mode') : t('switchToDark', 'Switch to Dark Mode')}
      aria-label={isDark ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
      className={`group relative flex items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
        isDark
          ? 'border-gray-700 bg-gray-800/90 text-amber-300 hover:border-amber-400/50 hover:bg-gray-700 hover:text-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.15)]'
          : 'border-gray-200 bg-gray-50 text-slate-700 hover:border-red-200 hover:bg-amber-50/60 hover:text-amber-600 shadow-sm'
      } ${className}`}
    >
      <div className="relative h-5 w-5">
        {/* Sun Icon (Day mode) */}
        <svg
          className={`absolute inset-0 h-5 w-5 transform transition-all duration-500 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100 text-amber-500'
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5" fill="currentColor" fillOpacity="0.2" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>

        {/* Moon Icon (Dark mode) */}
        <svg
          className={`absolute inset-0 h-5 w-5 transform transition-all duration-500 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100 text-amber-300'
              : '-rotate-90 scale-0 opacity-0'
          }`}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </div>

      {showLabel && (
        <span className="text-xs font-bold tracking-wide">
          {isDark ? t('darkMode', 'Night') : t('lightMode', 'Day')}
        </span>
      )}
    </button>
  );
}
