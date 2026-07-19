// features/profile/view/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useProfileViewModel } from '../viewmodel/useProfileViewModel';
import { getUiIcon } from '../../../utils/imageMapping';

export default function ProfileScreen() {
  const {
    profile,
    menuItems,
    onLogout,
  } = useProfileViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image source={getUiIcon(profile.avatarEmoji)} style={styles.avatarImage} />
          </View>
          <Text style={styles.profileName}>{profile.name}</Text>
          <Text style={styles.profilePhone}>{profile.phone}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <Text style={styles.memberSince}>Member since {profile.memberSince}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.totalOrders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{profile.deliveryAddresses}</Text>
              <Text style={styles.statLabel}>Addresses</Text>
            </View>
          </View>
        </View>

        {/* Menu items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <Pressable key={item.id} style={styles.menuItem} onPress={item.onPress}>
              <Image source={getUiIcon(item.icon)} style={styles.menuIcon} />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuArrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {/* Logout */}
        <Pressable style={styles.logoutButton} onPress={onLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // --- Header ---
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#1B5E20',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // --- Profile Card ---
  profileCard: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: '#F6FBF6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  avatarContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  avatarImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  profileEmail: {
    fontSize: 13,
    color: '#666666',
    marginTop: 2,
  },
  memberSince: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 8,
  },
  statsRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    gap: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B5E20',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 32,
    backgroundColor: '#C8E6C9',
  },
  // --- Menu ---
  menuSection: {
    marginTop: 24,
    marginHorizontal: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  menuIcon: {
    width: 22,
    height: 22,
    borderRadius: 4,
    marginRight: 12,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  menuArrow: {
    fontSize: 20,
    color: '#C8E6C9',
    fontWeight: '700',
  },
  // --- Logout ---
  logoutButton: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D32F2F',
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#D32F2F',
  },
});