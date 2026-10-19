'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isBangla: false,
  t: (key, fallback) => fallback || key,
});

export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem('preferred_language');
      if (savedLang === 'bn' || savedLang === 'en') {
        setLanguageState(savedLang);
      } else {
        // Detect browser language if Bangla is default
        const browserLang = navigator.language?.toLowerCase();
        if (browserLang?.startsWith('bn')) {
          setLanguageState('bn');
        }
      }
    } catch {
      // ignore localStorage errors in privacy mode
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang) => {
    if (lang === 'en' || lang === 'bn') {
      setLanguageState(lang);
      try {
        localStorage.setItem('preferred_language', lang);
      } catch {
        // ignore
      }
      if (typeof document !== 'undefined') {
        document.documentElement.lang = lang;
      }
    }
  };

  const toggleLanguage = () => {
    const nextLang = language === 'en' ? 'bn' : 'en';
    setLanguage(nextLang);
  };

  const t = (key, fallback) => {
    const langDict = translations[language] || translations.en;
    if (langDict && langDict[key] !== undefined) {
      return langDict[key];
    }
    if (translations.en && translations.en[key] !== undefined) {
      return translations.en[key];
    }
    return fallback !== undefined ? fallback : key;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isBangla: language === 'bn',
        t,
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const useTranslation = () => {
  const { t, language, isBangla } = useLanguage();
  return { t, language, isBangla };
};

export default LanguageContext;
