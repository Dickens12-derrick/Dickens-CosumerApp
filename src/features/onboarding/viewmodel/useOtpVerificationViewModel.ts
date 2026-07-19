// features/onboarding/viewmodel/useOtpVerificationViewModel.ts
import { useState, useCallback, useEffect, useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const OTP_LENGTH = 6;
const RESEND_COOLDOWN_SECONDS = 24;

export interface UseOtpVerificationViewModelReturn {
  phone: string;
  digits: string[];
  isVerifying: boolean;
  errorMessage: string | null;
  canVerify: boolean;
  secondsUntilResend: number;
  canResend: boolean;
  onChangeDigit: (index: number, value: string) => void;
  onVerify: () => void;
  onResend: () => void;
  onBack: () => void;
}

export function useOtpVerificationViewModel(): UseOtpVerificationViewModelReturn {
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [secondsUntilResend, setSecondsUntilResend] = useState(RESEND_COOLDOWN_SECONDS);

  // Countdown timer for "Resend code in Ns"
  useEffect(() => {
    if (secondsUntilResend <= 0) return;
    const timer = setInterval(() => {
      setSecondsUntilResend((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [secondsUntilResend]);

  const canVerify = useMemo(() => digits.every((d) => d.length === 1), [digits]);
  const canResend = secondsUntilResend === 0;

  const onChangeDigit = useCallback((index: number, value: string) => {
    const singleDigit = value.replace(/\D/g, '').slice(-1);
    setDigits((prev) => {
      const next = [...prev];
      next[index] = singleDigit;
      return next;
    });
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onVerify = useCallback(async () => {
    if (!canVerify) {
      setErrorMessage('Enter the full 6-digit code.');
      return;
    }
    setIsVerifying(true);
    setErrorMessage(null);
    try {
      // TODO: replace with real API call verifying digits.join('') against backend.
      await new Promise((resolve) => setTimeout(resolve, 700));
      router.push('/onboarding/address');
    } catch (err) {
      setErrorMessage('Invalid code. Please try again.');
    } finally {
      setIsVerifying(false);
    }
  }, [canVerify, digits]);

  const onResend = useCallback(() => {
    if (!canResend) return;
    // TODO: replace with real API call to resend the SMS code.
    setDigits(Array(OTP_LENGTH).fill(''));
    setSecondsUntilResend(RESEND_COOLDOWN_SECONDS);
  }, [canResend]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    phone: phone ?? '',
    digits,
    isVerifying,
    errorMessage,
    canVerify,
    secondsUntilResend,
    canResend,
    onChangeDigit,
    onVerify,
    onResend,
    onBack,
  };
}