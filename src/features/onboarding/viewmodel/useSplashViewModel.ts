// features/onboarding/viewmodel/useSplashViewModel.ts
import { useState, useCallback, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type LanguageCode = 'EN' | 'LG' | 'SW';

export interface UseSplashViewModelReturn {
  selectedLanguage: LanguageCode;
  languages: LanguageCode[];
  onSelectLanguage: (lang: LanguageCode) => void;
  onGetStarted: () => void;
  onBrowseGuest: () => void;
  onLogin: () => void;
}

const LANGUAGES: LanguageCode[] = ['EN', 'LG', 'SW'];
const LANGUAGE_STORAGE_KEY = 'selected_language';

export function useSplashViewModel(): UseSplashViewModelReturn {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('EN');

  // Load persisted language on mount
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLang = await AsyncStorage.getItem(LANGUAGE_STORAGE_KEY);
        if (savedLang && (savedLang === 'EN' || savedLang === 'LG' || savedLang === 'SW')) {
          setSelectedLanguage(savedLang as LanguageCode);
        }
      } catch (error) {
        console.error('Failed to load language preference:', error);
      }
    };
    loadLanguage();
  }, []);

  const onSelectLanguage = useCallback(async (lang: LanguageCode) => {
    setSelectedLanguage(lang);
    try {
      await AsyncStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch (error) {
      console.error('Failed to save language preference:', error);
    }
  }, []);

  const onGetStarted = useCallback(() => {
    router.push('/onboarding/phone');
  }, []);

  const onBrowseGuest = useCallback(() => {
    router.push('/discover');
  }, []);

  const onLogin = useCallback(() => {
    router.push('/login');
  }, []);

  return {
    selectedLanguage,
    languages: LANGUAGES,
    onSelectLanguage,
    onGetStarted,
    onBrowseGuest,
    onLogin,
  };
}