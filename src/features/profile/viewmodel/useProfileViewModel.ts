// features/profile/viewmodel/useProfileViewModel.ts
import { useState, useCallback, useEffect } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  memberSince: 'January 2023',
  totalOrders: 15,
  deliveryAddresses: 10,
};

const USER_PROFILE_KEY = 'user_profile';

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
  const [profile, setProfile] = useState<ProfileData>(MOCK_PROFILE);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          setProfile((prev) => ({ ...prev, ...parsed }));
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    loadProfile();
  }, []);

  const onLogout = useCallback(() => {
    AsyncStorage.removeItem(USER_PROFILE_KEY).catch(() => {});
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
      onPress: () => navigateTo('/payment-methods'),
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