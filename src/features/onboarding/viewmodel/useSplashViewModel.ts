// features/onboarding/viewmodel/useSplashViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';

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

export function useSplashViewModel(): UseSplashViewModelReturn {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('EN');

  const onSelectLanguage = useCallback((lang: LanguageCode) => {
    setSelectedLanguage(lang);
    // TODO: persist selected language to storage / i18n context once
    // localization is wired up (e.g. AsyncStorage + i18next changeLanguage).
  }, []);

  const onGetStarted = useCallback(() => {
    // TODO: replace with the real onboarding phone-entry route once the
    // onboarding flow is finalized. Currently stubbed.
    router.push('/onboarding/phone');
  }, []);

  const onBrowseGuest = useCallback(() => {
    // TODO: confirm this should land on the Discover tab for guest users,
    // or if a lightweight guest-mode wrapper route is needed first.
    router.push('/(tabs)/discover');
  }, []);

  const onLogin = useCallback(() => {
    // TODO: replace with the real auth route once the login screen exists;
    // may need query params (e.g. redirect target) later.
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