// features/checkout/viewmodel/useCheckoutViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

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

const MOCK_ITEMS: CheckoutItem[] = [
  { id: 'c1', name: 'Organic Sukuma Wiki', price: 2500, unit: 'bunch', quantity: 2, farmer: 'Mama Mboga Farm', category: 'vegetables' },
  { id: 'c2', name: 'Ripe Avocados', price: 3000, unit: 'each', quantity: 3, farmer: 'Kayunga Organics', category: 'fruits' },
];

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
      navigateTo('/orders/confirmation');
    } finally {
      setIsPlacingOrder(false);
    }
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const subtotal = useMemo(
    () => MOCK_ITEMS.reduce((sum, item) => sum + item.price * item.quantity, 0),
    []
  );

  const deliveryFee = subtotal >= 30000 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  return {
    items: MOCK_ITEMS,
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