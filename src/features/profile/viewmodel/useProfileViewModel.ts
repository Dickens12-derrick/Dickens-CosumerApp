// features/profile/viewmodel/useProfileViewModel.ts
import { useState, useCallback, useEffect } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AccountProfile, USER_PROFILE_KEY } from '../../../services/account';

export type ProfileData = AccountProfile;

export interface MenuItem {
  id: string;
  icon: string;
  label: string;
  onPress: () => void;
  badge?: string;
}

export interface ProfilePanel {
  title: string;
  body: string;
  actions?: { label: string; route: string }[];
}

export interface UseProfileViewModelReturn {
  profile: ProfileData | null;
  isLoading: boolean;
  menuItems: MenuItem[];
  activePanel: ProfilePanel | null;
  onClosePanel: () => void;
  onLogout: () => void;
  onSignIn: () => void;
  onCreateAccount: () => void;
}

export function useProfileViewModel(): UseProfileViewModelReturn {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activePanel, setActivePanel] = useState<ProfilePanel | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const saved = await AsyncStorage.getItem(USER_PROFILE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved) as ProfileData;
          const isLegacyDemoProfile = parsed.name === 'Derrick Dickens' && parsed.email === 'ddickens@gmail.com';
          if (isLegacyDemoProfile) {
            await AsyncStorage.removeItem(USER_PROFILE_KEY);
          } else {
            setProfile(parsed);
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProfile();
  }, []);

  const onLogout = useCallback(() => {
    AsyncStorage.removeItem(USER_PROFILE_KEY).catch(() => {});
    setProfile(null);
    router.replace('/');
  }, []);

  const onSignIn = useCallback(() => {
    router.push('/login');
  }, []);

  const onCreateAccount = useCallback(() => {
    router.push('/onboarding/phone');
  }, []);

  const openPanel = useCallback((panel: ProfilePanel) => {
    setActivePanel(panel);
  }, []);

  const onClosePanel = useCallback(() => {
    setActivePanel(null);
  }, []);

  const menuItems: MenuItem[] = profile ? [
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
      onPress: () => openPanel({
        title: 'Delivery Addresses',
        body: 'You have saved delivery points for home, work, and other drop-off locations. Add or update a landmark so riders can find you quickly.',
        actions: [{ label: 'Manage addresses', route: '/onboarding/address' }],
      }),
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
      onPress: () => openPanel({
        title: 'Favorites',
        body: 'Your saved products will appear here. Start with popular vegetables, fruits, dairy, grains, fish and meat, herbs, and legumes so your best picks are one tap away.',
        actions: [{ label: 'Browse products', route: '/discover' }],
      }),
    },
    {
      id: 'notifications',
      icon: 'notifications',
      label: 'Notifications',
      onPress: () => openPanel({
        title: 'Notifications',
        body: 'Notifications are ready for order updates, delivery progress, fresh-stock alerts, and special market deals from E-Katale sellers.',
      }),
    },
    {
      id: 'help',
      icon: 'help',
      label: 'Help & Support',
      onPress: () => openPanel({
        title: 'Help & Support',
        body: 'For support, contact the E-Katale team about orders, payments, delivery addresses, refunds, or product quality. A support chat and call option can be connected here.',
      }),
    },
    {
      id: 'about',
      icon: 'about',
      label: 'About E-Katale',
      onPress: () => openPanel({
        title: 'About E-Katale',
        body: 'E-Katale is a farm-to-home marketplace for fresh produce. Its target is to connect households with reliable local farmers and vendors, improve food access, and create better market opportunities. Its perspective is a trusted digital market where Ugandan shoppers can discover fresh goods, compare categories, and order with confidence.',
        actions: [{ label: 'Start shopping', route: '/discover' }],
      }),
    },
  ] : [];

  return {
    profile,
    menuItems,
    activePanel,
    onClosePanel,
    onLogout,
    isLoading,
    onSignIn,
    onCreateAccount,
  };
}
