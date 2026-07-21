// features/payment/viewmodel/usePaymentMethodsViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
  details?: string;
}

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'cash',
    name: 'Cash on Delivery',
    icon: 'cash',
    description: 'Pay when you receive your order',
  },
  {
    id: 'mobile_money',
    name: 'Mobile Money',
    icon: 'mobile_money',
    description: 'MTN Mobile Money / Airtel Money',
    details: '+256 742 258 343 (Default)',
  },
  {
    id: 'card',
    name: 'Card Payment',
    icon: 'card',
    description: 'Visa / Mastercard / Debit Card',
    details: '•••• 4242',
  },
];

export interface UsePaymentMethodsViewModelReturn {
  paymentMethods: PaymentMethod[];
  selectedId: string;
  onSelectMethod: (id: string) => void;
  onAddMethod: () => void;
  onBack: () => void;
}

export function usePaymentMethodsViewModel(): UsePaymentMethodsViewModelReturn {
  const [selectedId, setSelectedId] = useState('mobile_money');

  const onSelectMethod = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const onAddMethod = useCallback(() => {
    // TODO: Navigate to add payment method screen
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    paymentMethods: PAYMENT_METHODS,
    selectedId,
    onSelectMethod,
    onAddMethod,
    onBack,
  };
}