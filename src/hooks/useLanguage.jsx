import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations.js';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('yr_lang') || 'en');

  function toggleLang() {
    const next = lang === 'en' ? 'hi' : 'en';
    setLang(next);
    localStorage.setItem('yr_lang', next);
  }

  function t(path) {
    const parts = path.split('.');
    let node = translations[lang];
    for (const p of parts) {
      node = node?.[p];
    }
    return node ?? path;
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}