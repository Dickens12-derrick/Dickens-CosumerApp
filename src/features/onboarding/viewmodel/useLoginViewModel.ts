// features/auth/viewmodel/useLoginViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { saveAccountProfile } from '../../../services/account';

export interface UseLoginViewModelReturn {
  name: string;
  email: string;
  phone: string;
  password: string;
  isSecureEntry: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  canSubmit: boolean;
  onChangeName: (value: string) => void;
  onChangeEmail: (value: string) => void;
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

function isValidEmail(value: string): boolean {
  return /^\S+@\S+\.\S+$/.test(value.trim());
}

export function useLoginViewModel(): UseLoginViewModelReturn {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onChangeName = useCallback((value: string) => {
    setName(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onChangeEmail = useCallback((value: string) => {
    setEmail(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

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
    return name.trim().length >= 2 && isValidEmail(email) && isValidPhone(phone) && password.length >= 6 && !isSubmitting;
  }, [name, email, phone, password, isSubmitting]);

  const onSubmit = useCallback(async () => {
    if (name.trim().length < 2) {
      setErrorMessage('Enter your name.');
      return;
    }
    if (!isValidEmail(email)) {
      setErrorMessage('Enter a valid email address.');
      return;
    }
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
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      await saveAccountProfile({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
      });

      // Redirect to home after login (under tabs)
      router.replace('/(tabs)/home');
    } catch (err) {
      setErrorMessage('Login failed. Check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [name, email, phone, password]);

  const onForgotPassword = useCallback(() => {
    router.push('/forgot-password');
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    name,
    email,
    phone,
    password,
    isSecureEntry,
    isSubmitting,
    errorMessage,
    canSubmit,
    onChangeName,
    onChangeEmail,
    onChangePhone,
    onChangePassword,
    onToggleSecureEntry,
    onSubmit,
    onForgotPassword,
    onBack,
  };
}
