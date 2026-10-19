'use client';

import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function LanguageToggle({ className = '', variant = 'pill' }) {
  const { language, setLanguage, toggleLanguage, isBangla, mounted } = useLanguage();

  if (!mounted) {
    return (
      <div
        className={`h-9 w-20 rounded-xl border border-gray-200 bg-gray-100 dark:border-gray-800 dark:bg-gray-800 animate-pulse ${className}`}
        aria-hidden="true"
      />
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={toggleLanguage}
        type="button"
        title={isBangla ? 'Switch to English' : 'বাংলায় দেখুন'}
        aria-label={isBangla ? 'Switch to English' : 'Switch to Bangla'}
        className={`group relative flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-extrabold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
          isBangla
            ? 'border-red-200 bg-red-50/80 text-[#D32F2F] dark:border-red-900/40 dark:bg-red-950/40 dark:text-red-400'
            : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'
        } ${className}`}
      >
        <svg
          className="h-3.5 w-3.5 opacity-70 group-hover:opacity-100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span>{isBangla ? 'বাং' : 'EN'}</span>
      </button>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selection"
      className={`inline-flex items-center rounded-xl border border-gray-200 bg-gray-100/90 p-1 shadow-sm backdrop-blur-sm dark:border-gray-700/80 dark:bg-gray-800/90 ${className}`}
    >
      <button
        type="button"
        onClick={() => setLanguage('bn')}
        aria-pressed={isBangla}
        className={`relative rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-200 focus:outline-none ${
          isBangla
            ? 'bg-white text-[#D32F2F] shadow-sm font-extrabold dark:bg-gray-900 dark:text-red-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        }`}
      >
        বাংলা
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        aria-pressed={!isBangla}
        className={`relative rounded-lg px-2.5 py-1 text-xs font-bold transition-all duration-200 focus:outline-none ${
          !isBangla
            ? 'bg-white text-[#D32F2F] shadow-sm font-extrabold dark:bg-gray-900 dark:text-red-400'
            : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100'
        }`}
      >
        EN
      </button>
    </div>
  );
}
