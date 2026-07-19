// features/orders/viewmodel/useOrderDetailViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Order, OrderItem, OrderStatus } from './useOrdersViewModel';

// Duplicate mock data for simplicity (TODO: share via context/API)
const MOCK_ORDERS: Record<string, Order> = {
  o1: {
    id: 'o1',
    orderNumber: 'EK-A3B2C1',
    status: 'out_for_delivery',
    items: [
      { id: 'oi1', name: 'Organic Sukuma Wiki', quantity: 2, price: 2500, category: 'vegetables' },
      { id: 'oi2', name: 'Ripe Avocados', quantity: 3, price: 3000, category: 'fruits' },
    ],
    total: 14000,
    deliveryFee: 0,
    deliveryAddress: 'Home - Near Shell Kabalagala',
    estimatedDelivery: 'Today, 2:00 PM - 4:00 PM',
    placedAt: 'Today, 10:30 AM',
    paymentMethod: 'Cash on Delivery',
  },
  o2: {
    id: 'o2',
    orderNumber: 'EK-D4E5F6',
    status: 'delivered',
    items: [
      { id: 'oi3', name: 'Fresh Matoke', quantity: 2, price: 5000, category: 'vegetables' },
      { id: 'oi4', name: 'Free-Range Eggs (tray)', quantity: 1, price: 8000, category: 'dairy_eggs' },
    ],
    total: 18000,
    deliveryFee: 5000,
    deliveryAddress: 'Work - Kampala Road',
    estimatedDelivery: 'Yesterday, 10:00 AM - 12:00 PM',
    placedAt: 'Yesterday, 8:15 AM',
    paymentMethod: 'Mobile Money',
  },
  o3: {
    id: 'o3',
    orderNumber: 'EK-G7H8I9',
    status: 'delivered',
    items: [
      { id: 'oi5', name: 'Fresh Tilapia', quantity: 1, price: 12000, category: 'fish_meat' },
    ],
    total: 12000,
    deliveryFee: 5000,
    deliveryAddress: 'Home - Near Shell Kabalagala',
    estimatedDelivery: '2 days ago, 11:00 AM - 1:00 PM',
    placedAt: '2 days ago, 9:00 AM',
    paymentMethod: 'Cash on Delivery',
  },
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  out_for_delivery: 'Out for Delivery',
  delivered: 'Delivered',
  cancelled: 'Cancelled',
};

const STATUS_ICONS: Record<OrderStatus, string> = {
  pending: '⏳',
  confirmed: '✅',
  out_for_delivery: '🚚',
  delivered: '📦',
  cancelled: '❌',
};

const STATUS_STEPS: OrderStatus[] = ['confirmed', 'out_for_delivery', 'delivered'];

export interface UseOrderDetailViewModelReturn {
  order: Order | null;
  getStatusLabel: (status: OrderStatus) => string;
  getStatusIcon: (status: OrderStatus) => string;
  getStatusStep: (status: OrderStatus) => number;
  onBack: () => void;
  onReorder: () => void;
}

export function useOrderDetailViewModel(): UseOrderDetailViewModelReturn {
  const { id } = useLocalSearchParams<{ id: string }>();
  const order = id ? MOCK_ORDERS[id] ?? null : null;

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const onReorder = useCallback(() => {
    router.push('/cart');
  }, []);

  const getStatusLabel = useCallback((status: OrderStatus) => STATUS_LABELS[status], []);
  const getStatusIcon = useCallback((status: OrderStatus) => STATUS_ICONS[status], []);

  const getStatusStep = useCallback((status: OrderStatus) => {
    const idx = STATUS_STEPS.indexOf(status);
    return idx >= 0 ? idx : -1;
  }, []);

  return {
    order,
    getStatusLabel,
    getStatusIcon,
    getStatusStep,
    onBack,
    onReorder,
  };
}