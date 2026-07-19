// features/orders/viewmodel/useOrderConfirmationViewModel.ts
import { useCallback } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export interface UseOrderConfirmationViewModelReturn {
  orderNumber: string;
  estimatedDelivery: string;
  onTrackOrder: () => void;
  onContinueShopping: () => void;
}

export function useOrderConfirmationViewModel(): UseOrderConfirmationViewModelReturn {
  const orderNumber = 'EK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
  const estimatedDelivery = 'Today, 2:00 PM - 4:00 PM';

  const onTrackOrder = useCallback(() => {
    navigateTo('/orders');
  }, []);


  const onContinueShopping = useCallback(() => {
    navigateTo('/(tabs)/discover');
  }, []);

  return {
    orderNumber,
    estimatedDelivery,
    onTrackOrder,
    onContinueShopping,
  };
}