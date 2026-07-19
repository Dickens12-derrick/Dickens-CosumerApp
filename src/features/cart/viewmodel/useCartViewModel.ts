// features/cart/viewmodel/useCartViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

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

// Mock cart data (TODO: replace with cart context/state management)
const MOCK_CART: CartItem[] = [
  { id: 'c1', productId: 'p1', name: 'Organic Sukuma Wiki', price: 2500, unit: 'bunch', quantity: 2, farmer: 'Mama Mboga Farm', category: 'vegetables' },
  { id: 'c2', productId: 'p3', name: 'Ripe Avocados', price: 3000, unit: 'each', quantity: 3, farmer: 'Kayunga Organics', category: 'fruits' },
];

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
  const [items, setItems] = useState<CartItem[]>(MOCK_CART);
  const [isLoading] = useState(false);

  const onUpdateQuantity = useCallback((itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  }, []);

  const onRemoveItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const onCheckout = useCallback(() => {
    navigateTo('/checkout');
  }, []);

  const onContinueShopping = useCallback(() => {
    router.push('/(tabs)/discover');
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const deliveryFee = subtotal >= 30000 ? 0 : 5000;
  const total = subtotal + deliveryFee;

  return {
    items,
    isLoading,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    onContinueShopping,
    subtotal,
    deliveryFee,
    total,
  };
}