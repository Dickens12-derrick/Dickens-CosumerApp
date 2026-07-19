// features/checkout/viewmodel/useCheckoutViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import { useCart } from '../../../services/CartContext';

export interface CheckoutItem {
  id: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  farmer: string;
  category: string;
}

export interface DeliveryAddress {
  label: string;
  landmark: string;
  coordinates: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

const MOCK_ADDRESS: DeliveryAddress = {
  label: 'Home',
  landmark: 'Near Shell Kabalagala',
  coordinates: '0.3136° N, 32.5811° E',
};

const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'cash', name: 'Cash on Delivery', icon: 'cash', description: 'Pay when you receive' },
  { id: 'mobile_money', name: 'Mobile Money', icon: 'phone', description: 'MTN / Airtel Money' },
  { id: 'card', name: 'Card Payment', icon: 'card', description: 'Visa / Mastercard' },
];

export interface UseCheckoutViewModelReturn {
  items: CheckoutItem[];
  deliveryAddress: DeliveryAddress;
  paymentMethods: PaymentMethod[];
  selectedPaymentId: string;
  deliveryNotes: string;
  isPlacingOrder: boolean;
  subtotal: number;
  deliveryFee: number;
  total: number;
  onSelectPayment: (id: string) => void;
  onChangeDeliveryNotes: (text: string) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
}

export function useCheckoutViewModel(): UseCheckoutViewModelReturn {
  const [selectedPaymentId, setSelectedPaymentId] = useState('cash');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { items, subtotal, deliveryFee, total, clearCart } = useCart();

  const onSelectPayment = useCallback((id: string) => {
    setSelectedPaymentId(id);
  }, []);

  const onChangeDeliveryNotes = useCallback((text: string) => {
    setDeliveryNotes(text);
  }, []);

  const onPlaceOrder = useCallback(async () => {
    setIsPlacingOrder(true);
    try {
      // TODO: replace with real API call to POST /orders
      await new Promise((resolve) => setTimeout(resolve, 1500));
      clearCart();
      navigateTo('/orders/confirmation');
    } finally {
      setIsPlacingOrder(false);
    }
  }, [clearCart]);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  return {
    items,
    deliveryAddress: MOCK_ADDRESS,
    paymentMethods: PAYMENT_METHODS,
    selectedPaymentId,
    deliveryNotes,
    isPlacingOrder,
    subtotal,
    deliveryFee,
    total,
    onSelectPayment,
    onChangeDeliveryNotes,
    onPlaceOrder,
    onBack,
  };
}