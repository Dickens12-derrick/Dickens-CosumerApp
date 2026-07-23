// services/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translations, LanguageCode } from '../utils/translations';

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => Promise<void>;
  t: (key: keyof typeof translations['EN'], replacements?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | null>(null);
const LANGUAGE_STORAGE_KEY = 'selected_language';

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>('EN');

  // Load language preference from storage
  useEffect(() => {
    const loadLang = async () => {
      try {
        const saved = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (saved && (saved === 'EN' || saved === 'LG' || saved === 'SW')) {
          setLanguageState(saved as LanguageCode);
        }
      } catch (err) {
        console.error('Failed to load language preference:', err);
      }
    };
    loadLang();
  }, []);

  const setLanguage = useCallback(async (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (err) {
      console.error('Failed to save language preference:', err);
    }
  }, []);

  const t = useCallback(
    (key: keyof typeof translations['EN'], replacements?: Record<string, string | number>) => {
      const activeDict = translations[language] || translations.EN;
      let text = activeDict[key] || translations.EN[key] || '';
      
      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          text = text.replace(`{${k}}`, String(v));
        });
      }
      return text;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
export { LanguageCode };
