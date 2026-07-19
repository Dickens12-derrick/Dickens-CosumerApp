// features/cart/viewmodel/useCartViewModel.ts
import { useCallback } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import { useCart } from '../../../services/CartContext';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  unit: string;
  quantity: number;
  farmer: string;
  category: string;
}

export interface UseCartViewModelReturn {
  items: CartItem[];
  isLoading: boolean;
  onUpdateQuantity: (itemId: string, newQuantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
  subtotal: number;
  deliveryFee: number;
  total: number;
}

export function useCartViewModel(): UseCartViewModelReturn {
  const {
    items,
    updateQuantity,
    removeItem,
    subtotal,
    deliveryFee,
    total,
  } = useCart();

  const onUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    updateQuantity(itemId, newQuantity);
  }, [updateQuantity]);

  const onRemoveItem = useCallback((itemId: string) => {
    removeItem(itemId);
  }, [removeItem]);

  const onCheckout = useCallback(() => {
    navigateTo('/checkout');
  }, []);

  const onContinueShopping = useCallback(() => {
    router.push('/(tabs)/discover');
  }, []);

  return {
    items,
    isLoading: false,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    onContinueShopping,
    subtotal,
    deliveryFee,
    total,
  };
}
