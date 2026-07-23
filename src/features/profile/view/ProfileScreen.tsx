// features/profile/view/ProfileScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import { Href, router } from 'expo-router';
import { useProfileViewModel } from '../viewmodel/useProfileViewModel';
import { getUiIcon } from '../../../utils/imageMapping';

export default function ProfileScreen() {
  const {
    profile,
    isLoading,
    menuItems,
    activePanel,
    onClosePanel,
    onLogout,
    onSignIn,
    onCreateAccount,
  } = useProfileViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {isLoading ? (
          <View style={styles.guestCard}>
            <Text style={styles.guestTitle}>Loading your account…</Text>
          </View>
        ) : profile ? (
          <>
            <View style={styles.profileCard}>
              <View style={styles.avatarContainer}>
                <Image source={getUiIcon(profile.avatarEmoji)} style={styles.avatarImage} />
              </View>
              <Text style={styles.profileName}>{profile.name}</Text>
              <Text style={styles.profilePhone}>{profile.phone}</Text>
              {profile.email ? <Text style={styles.profileEmail}>{profile.email}</Text> : null}
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

            <View style={styles.menuSection}>
              {menuItems.map((item) => (
                <Pressable
                  key={item.id}
                  style={({ pressed }) => [styles.menuItem, pressed && styles.menuItemPressed]}
                  onPress={item.onPress}
                >
                  <Image source={getUiIcon(item.icon)} style={styles.menuIcon} />
                  <Text style={styles.menuLabel}>{item.label}</Text>
                  <Text style={styles.menuArrow}>›</Text>
                </Pressable>
              ))}
            </View>

            <Pressable style={styles.logoutButton} onPress={onLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.guestCard}>
            <Text style={styles.guestTitle}>You’re browsing as a guest</Text>
            <Text style={styles.guestBody}>Sign in or create an account to see your personal profile, orders, and delivery addresses.</Text>
            <Pressable style={styles.signInButton} onPress={onSignIn}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </Pressable>
            <Pressable style={styles.createAccountButton} onPress={onCreateAccount}>
              <Text style={styles.createAccountText}>Create Account</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>

      <Modal
        transparent
        visible={activePanel !== null}
        animationType="fade"
        onRequestClose={onClosePanel}
      >
        <View style={styles.modalBackdrop}>
          <View style={styles.panel}>
            <Text style={styles.panelTitle}>{activePanel?.title}</Text>
            <Text style={styles.panelBody}>{activePanel?.body}</Text>
            {activePanel?.actions?.map((action) => (
              <Pressable
                key={action.label}
                style={({ pressed }) => [styles.panelAction, pressed && styles.panelActionPressed]}
                onPress={() => {
                  onClosePanel();
                  router.push(action.route as Href);
                }}
              >
                <Text style={styles.panelActionText}>{action.label}</Text>
              </Pressable>
            ))}
            <Pressable
              style={({ pressed }) => [styles.panelClose, pressed && styles.panelClosePressed]}
              onPress={onClosePanel}
            >
              <Text style={styles.panelCloseText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  guestCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    backgroundColor: '#F6FBF6',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    alignItems: 'center',
  },
  guestTitle: { fontSize: 18, fontWeight: '800', color: '#1B1B1B', textAlign: 'center' },
  guestBody: { fontSize: 14, color: '#666666', textAlign: 'center', lineHeight: 21, marginTop: 8 },
  signInButton: { width: '100%', marginTop: 20, paddingVertical: 14, borderRadius: 12, alignItems: 'center', backgroundColor: '#1B5E20' },
  signInButtonText: { color: '#FFFFFF', fontWeight: '700', fontSize: 15 },
  createAccountButton: { width: '100%', marginTop: 10, paddingVertical: 13, borderRadius: 12, alignItems: 'center', borderWidth: 1.5, borderColor: '#1B5E20' },
  createAccountText: { color: '#1B5E20', fontWeight: '700', fontSize: 15 },
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
  menuItemPressed: {
    backgroundColor: '#F6FBF6',
    opacity: 0.85,
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
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'flex-end',
  },
  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 34,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  panelBody: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
    marginTop: 10,
  },
  panelAction: {
    marginTop: 18,
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  panelActionPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  panelActionText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  panelClose: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 13,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
  },
  panelClosePressed: {
    opacity: 0.82,
    transform: [{ scale: 0.98 }],
  },
  panelCloseText: {
    color: '#1B5E20',
    fontSize: 15,
    fontWeight: '700',
  },
});
