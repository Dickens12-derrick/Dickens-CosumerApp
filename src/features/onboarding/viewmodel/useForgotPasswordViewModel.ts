// features/onboarding/viewmodel/useForgotPasswordViewModel.ts
import { useState, useCallback, useMemo, useEffect } from 'react';
import { router } from 'expo-router';

export type ForgotPasswordStep = 'phone' | 'otp' | 'reset';

export interface UseForgotPasswordViewModelReturn {
  step: ForgotPasswordStep;
  phone: string;
  otpDigits: string[];
  newPassword: string;
  confirmPassword: string;
  isSecureEntry: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  secondsUntilResend: number;
  canResend: boolean;
  canProceed: boolean;
  onChangePhone: (value: string) => void;
  onChangeOtpDigit: (index: number, value: string) => void;
  onChangeNewPassword: (value: string) => void;
  onChangeConfirmPassword: (value: string) => void;
  onToggleSecureEntry: () => void;
  onSendCode: () => void;
  onVerifyOtp: () => void;
  onResetPassword: () => void;
  onResendCode: () => void;
  onBack: () => void;
}

const RESEND_COOLDOWN_SECONDS = 24;

function isValidUgandanNumber(value: string): boolean {
  return /^7\d{8}$/.test(value);
}

export function useForgotPasswordViewModel(): UseForgotPasswordViewModelReturn {
  const [step, setStep] = useState<ForgotPasswordStep>('phone');
  const [phone, setPhone] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [secondsUntilResend, setSecondsUntilResend] = useState(RESEND_COOLDOWN_SECONDS);

  // Countdown timer for resend
  useEffect(() => {
    if (secondsUntilResend <= 0) return;
    const timer = setInterval(() => {
      setSecondsUntilResend((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsUntilResend]);

  const canResend = secondsUntilResend === 0;

  const canProceed = useMemo(() => {
    switch (step) {
      case 'phone':
        return isValidUgandanNumber(phone) && !isSubmitting;
      case 'otp':
        return otpDigits.every((d) => d.length === 1) && !isSubmitting;
      case 'reset':
        return newPassword.length >= 6 && newPassword === confirmPassword && !isSubmitting;
    }
  }, [step, phone, otpDigits, newPassword, confirmPassword, isSubmitting]);

  const onChangePhone = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
    setPhone(digitsOnly);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onChangeOtpDigit = useCallback((index: number, value: string) => {
    const singleDigit = value.replace(/\D/g, '').slice(-1);
    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = singleDigit;
      return next;
    });
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onChangeNewPassword = useCallback((value: string) => {
    setNewPassword(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onChangeConfirmPassword = useCallback((value: string) => {
    setConfirmPassword(value);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onToggleSecureEntry = useCallback(() => {
    setIsSecureEntry((prev) => !prev);
  }, []);

  const onSendCode = useCallback(async () => {
    if (!isValidUgandanNumber(phone)) {
      setErrorMessage('Enter a valid Ugandan phone number.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStep('otp');
      setSecondsUntilResend(RESEND_COOLDOWN_SECONDS);
    } catch {
      setErrorMessage('Could not send code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [phone]);

  const onVerifyOtp = useCallback(async () => {
    if (!otpDigits.every((d) => d.length === 1)) {
      setErrorMessage('Enter the full 6-digit code.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 700));
      setStep('reset');
    } catch {
      setErrorMessage('Invalid code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [otpDigits]);

  const onResetPassword = useCallback(async () => {
    if (newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // TODO: replace with real API call
      await new Promise((resolve) => setTimeout(resolve, 800));
      router.replace('/login');
    } catch {
      setErrorMessage('Password reset failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [newPassword, confirmPassword]);

  const onResendCode = useCallback(() => {
    if (!canResend) return;
    // TODO: replace with real API call
    setOtpDigits(Array(6).fill(''));
    setSecondsUntilResend(RESEND_COOLDOWN_SECONDS);
  }, [canResend]);

  const onBack = useCallback(() => {
    if (step === 'phone') {
      router.back();
    } else if (step === 'otp') {
      setStep('phone');
      setErrorMessage(null);
    } else {
      setStep('otp');
      setErrorMessage(null);
    }
  }, [step]);

  return {
    step,
    phone,
    otpDigits,
    newPassword,
    confirmPassword,
    isSecureEntry,
    isSubmitting,
    errorMessage,
    secondsUntilResend,
    canResend,
    canProceed,
    onChangePhone,
    onChangeOtpDigit,
    onChangeNewPassword,
    onChangeConfirmPassword,
    onToggleSecureEntry,
    onSendCode,
    onVerifyOtp,
    onResetPassword,
    onResendCode,
    onBack,
  };
}