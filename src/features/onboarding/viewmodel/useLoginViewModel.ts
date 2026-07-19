// features/auth/viewmodel/useLoginViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';

export interface UseLoginViewModelReturn {
  phone: string;
  password: string;
  isSecureEntry: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  canSubmit: boolean;
  onChangePhone: (value: string) => void;
  onChangePassword: (value: string) => void;
  onToggleSecureEntry: () => void;
  onSubmit: () => void;
  onForgotPassword: () => void;
  onBack: () => void;
}

// Very light validation for now — just checks shape, not a real phone parser.
function isValidPhone(value: string): boolean {
  const digitsOnly = value.replace(/\D/g, '');
  return digitsOnly.length >= 9;
}

export function useLoginViewModel(): UseLoginViewModelReturn {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChangePhone = useCallback((value: string) => {
    setPhone(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onChangePassword = useCallback((value: string) => {
    setPassword(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onToggleSecureEntry = useCallback(() => {
    setIsSecureEntry((prev) => !prev);
  }, []);

  const canSubmit = useMemo(() => {
    return isValidPhone(phone) && password.length >= 6 && !isSubmitting;
  }, [phone, password, isSubmitting]);

  const onSubmit = useCallback(async () => {
    if (!isValidPhone(phone)) {
      setErrorMessage('Enter a valid phone number.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      // TODO: replace with real auth API call (e.g. POST /auth/login).
      // Simulated network delay for now:
      await new Promise((resolve) => setTimeout(resolve, 800));

      // TODO: store returned auth token (SecureStore) before navigating.
      router.replace('/(tabs)/discover');
    } catch (err) {
      // TODO: surface real error messages from the API response.
      setErrorMessage('Login failed. Check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [phone, password]);

  const onForgotPassword = useCallback(() => {
    // TODO: build a forgot-password flow (phone verification -> OTP -> reset).
    router.push('/forgot-password');
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    phone,
    password,
    isSecureEntry,
    isSubmitting,
    errorMessage,
    canSubmit,
    onChangePhone,
    onChangePassword,
    onToggleSecureEntry,
    onSubmit,
    onForgotPassword,
    onBack,
  };
}