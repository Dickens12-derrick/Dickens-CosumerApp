// features/onboarding/viewmodel/usePhoneEntryViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';

const COUNTRY_CODE = '+256';

function isValidUgandanNumber(value: string): boolean {
  // Ugandan mobile numbers: 9 digits starting with 7 (after the +256 code)
  return /^7\d{8}$/.test(value);
}

export interface UsePhoneEntryViewModelReturn {
  phoneNumber: string;
  countryCode: string;
  isValid: boolean;
  isSubmitting: boolean;
  errorMessage: string | null;
  onChangePhone: (value: string) => void;
  onSendCode: () => void;
  onBack: () => void;
}

export function usePhoneEntryViewModel(): UsePhoneEntryViewModelReturn {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isValid = useMemo(() => isValidUgandanNumber(phoneNumber), [phoneNumber]);

  const onChangePhone = useCallback((value: string) => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 9);
    setPhoneNumber(digitsOnly);
    if (errorMessage) setErrorMessage(null);
  }, [errorMessage]);

  const onSendCode = useCallback(async () => {
    if (!isValid) {
      setErrorMessage('Enter a valid Ugandan phone number.');
      return;
    }
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      // TODO: replace with real API call that triggers the SMS OTP send.
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push({
        pathname: '/onboarding/otp',
        params: { phone: `${COUNTRY_CODE}${phoneNumber}` },
      });
    } catch (err) {
      setErrorMessage('Could not send code. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }, [isValid, phoneNumber]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    phoneNumber,
    countryCode: COUNTRY_CODE,
    isValid,
    isSubmitting,
    errorMessage,
    onChangePhone,
    onSendCode,
    onBack,
  };
}