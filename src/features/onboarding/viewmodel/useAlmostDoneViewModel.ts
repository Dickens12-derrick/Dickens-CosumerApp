// features/onboarding/viewmodel/useAlmostDoneViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';

export type PaymentMethodId = 'mtn' | 'airtel' | 'card';

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  badge: string;
  color: string;
}

export interface UseAlmostDoneViewModelReturn {
  orderUpdatesEnabled: boolean;
  selectedPaymentMethod: PaymentMethodId | null;
  paymentMethods: PaymentMethod[];
  isSubmitting: boolean;
  onToggleOrderUpdates: () => void;
  onSelectPaymentMethod: (id: PaymentMethodId) => void;
  onEnterMarketplace: () => void;
  onSkip: () => void;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'mtn', label: 'MTN Mobile Money', badge: 'M', color: '#FFCC00' },
  { id: 'airtel', label: 'Airtel Money', badge: 'A', color: '#E11B22' },
  { id: 'card', label: 'Debit / Credit Card', badge: '💳', color: '#1A3B8B' },
];

export function useAlmostDoneViewModel(): UseAlmostDoneViewModelReturn {
  const [orderUpdatesEnabled, setOrderUpdatesEnabled] = useState(true);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodId | null>('mtn');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onToggleOrderUpdates = useCallback(() => {
    setOrderUpdatesEnabled((prev) => !prev);
  }, []);

  const onSelectPaymentMethod = useCallback((id: PaymentMethodId) => {
    setSelectedPaymentMethod((prev) => (prev === id ? null : id));
  }, []);

  const onEnterMarketplace = useCallback(async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.replace('/(tabs)/discover');
    } finally {
      setIsSubmitting(false);
    }
  }, []);

  const onSkip = useCallback(() => {
    router.replace('/(tabs)/discover');
  }, []);

  return {
    orderUpdatesEnabled,
    selectedPaymentMethod,
    paymentMethods: PAYMENT_METHODS,
    isSubmitting,
    onToggleOrderUpdates,
    onSelectPaymentMethod,
    onEnterMarketplace,
    onSkip,
  };
}
