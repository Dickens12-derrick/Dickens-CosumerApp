// features/profile/viewmodel/useProfileViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export interface ProfileData {
  name: string;
  phone: string;
  email: string;
  avatarEmoji: string;
  memberSince: string;
  totalOrders: number;
  deliveryAddresses: number;
}

const MOCK_PROFILE: ProfileData = {
  name: 'Derrick Dickens',
  phone: '+256 742 258 343',
  email: 'ddickens@gmail.com',
  avatarEmoji: 'profile',
  memberSince: 'January 2026',
  totalOrders: 7,
  deliveryAddresses: 2,
};

export interface MenuItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
  badge?: string;
}

export interface UseProfileViewModelReturn {
  profile: ProfileData;
  menuItems: MenuItem[];
  onLogout: () => void;
}

export function useProfileViewModel(): UseProfileViewModelReturn {
  const [profile] = useState<ProfileData>(MOCK_PROFILE);

  const onLogout = useCallback(() => {
    // TODO: clear auth tokens, reset state
    router.replace('/');
  }, []);

  const menuItems: MenuItem[] = [
    {
      id: 'orders',
      icon: 'orders',
      label: 'My Orders',
      onPress: () => navigateTo('/orders'),
    },
    {
      id: 'addresses',
      icon: 'addresses',
      label: 'Delivery Addresses',
      onPress: () => {},
    },
    {
      id: 'payment',
      icon: 'card',
      label: 'Payment Methods',
      onPress: () => {},
    },
    {
      id: 'favorites',
      icon: 'favorites',
      label: 'Favorites',
      onPress: () => {},
    },
    {
      id: 'notifications',
      icon: 'notifications',
      label: 'Notifications',
      onPress: () => {},
    },
    {
      id: 'help',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => {},
    },
    {
      id: 'about',
      icon: 'about',
      label: 'About E-Katale',
      onPress: () => {},
    },
  ];

  return {
    profile,
    menuItems,
    onLogout,
  };
}