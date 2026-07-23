import AsyncStorage from '@react-native-async-storage/async-storage';

export const USER_PROFILE_KEY = 'user_profile';

export interface AccountProfile {
  name: string;
  phone: string;
  email?: string;
  avatarEmoji: string;
  memberSince: string;
  totalOrders: number;
  deliveryAddresses: number;
}

export interface AccountDetails {
  name: string;
  email: string;
  phone: string;
}

export function createAccountProfile({ name, email, phone }: AccountDetails): AccountProfile {
  return {
    name,
    phone,
    email,
    avatarEmoji: 'profile',
    memberSince: new Intl.DateTimeFormat('en', { month: 'long', year: 'numeric' }).format(new Date()),
    totalOrders: 0,
    deliveryAddresses: 0,
  };
}

export async function saveAccountProfile(details: AccountDetails): Promise<void> {
  const saved = await AsyncStorage.getItem(USER_PROFILE_KEY);
  const existing = saved ? JSON.parse(saved) as Partial<AccountProfile> : null;
  const freshProfile = createAccountProfile(details);
  const profile = {
    ...freshProfile,
    ...(existing ? {
      avatarEmoji: existing.avatarEmoji ?? 'profile',
      memberSince: existing.memberSince ?? freshProfile.memberSince,
      totalOrders: existing.totalOrders ?? 0,
      deliveryAddresses: existing.deliveryAddresses ?? 0,
    } : {}),
  };
  await AsyncStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
}
