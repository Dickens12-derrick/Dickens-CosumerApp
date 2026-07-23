// features/orders/viewmodel/useOrdersViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export type OrderStatus = 'pending' | 'confirmed' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  category: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  deliveryAddress: string;
  estimatedDelivery: string;
  placedAt: string;
  paymentMethod: string;
}

const MOCK_ORDERS: Order[] = [
  {
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
  {
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
  {
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
];

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

export interface UseOrdersViewModelReturn {
  orders: Order[];
  activeFilter: OrderStatus | 'all';
  onFilterChange: (filter: OrderStatus | 'all') => void;
  onOrderPress: (order: Order) => void;
  onBack: () => void;
  onForward: () => void;
  getStatusLabel: (status: OrderStatus) => string;
  getStatusIcon: (status: OrderStatus) => string;
}

export function useOrdersViewModel(): UseOrdersViewModelReturn {
  const [activeFilter, setActiveFilter] = useState<OrderStatus | 'all'>('all');

  const onFilterChange = useCallback((filter: OrderStatus | 'all') => {
    setActiveFilter(filter);
  }, []);

  const onOrderPress = useCallback((order: Order) => {
    navigateTo(`/orders/${order.id}`);
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const onForward = useCallback(() => {
    const nextOrder = MOCK_ORDERS[0];
    if (nextOrder) {
      navigateTo(`/orders/${nextOrder.id}`);
    }
  }, []);

  const getStatusLabel = useCallback((status: OrderStatus) => STATUS_LABELS[status], []);
  const getStatusIcon = useCallback((status: OrderStatus) => STATUS_ICONS[status], []);

  const filteredOrders = activeFilter === 'all'
    ? MOCK_ORDERS
    : MOCK_ORDERS.filter((o) => o.status === activeFilter);

  return {
    orders: filteredOrders,
    activeFilter,
    onFilterChange,
    onOrderPress,
    onBack,
    onForward,
    getStatusLabel,
    getStatusIcon,
  };
}
