// features/onboarding/view/AlmostDoneScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Switch,
  Image,
} from 'react-native';
import { useAlmostDoneViewModel, PaymentMethodId } from '../viewmodel/useAlmostDoneViewModel';
import { getUiIcon } from '../../../utils/imageMapping';

export default function AlmostDoneScreen() {
  const {
    orderUpdatesEnabled,
    selectedPaymentMethod,
    paymentMethods,
    isSubmitting,
    onToggleOrderUpdates,
    onSelectPaymentMethod,
    onEnterMarketplace,
    onSkip,
  } = useAlmostDoneViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        {/* Overlapping progress/bell styled visual */}
        <Image source={getUiIcon('notifications')} style={styles.icon} />
      </View>

      <Text style={styles.title}>Almost done</Text>
      
      {/* Alert banner for order updates */}
      <View style={styles.updatesCard}>
        <View style={styles.updatesInfo}>
          <Text style={styles.alertIcon}>🔔</Text>
          <View style={styles.updatesTextWrap}>
            <Text style={styles.updatesTitle}>Order updates</Text>
            <Text style={styles.updatesSubtitle}>Delivery, deals & payment alerts</Text>
          </View>
        </View>
        <Switch
          trackColor={{ false: '#767577', true: '#81C784' }}
          thumbColor={orderUpdatesEnabled ? '#1B5E20' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={onToggleOrderUpdates}
          value={orderUpdatesEnabled}
        />
      </View>

      <Text style={styles.sectionLabel}>Add a payment method (optional now)</Text>

      {/* Payment methods list */}
      <View style={styles.paymentList}>
        {paymentMethods.map((method) => {
          const isSelected = selectedPaymentMethod === method.id;
          return (
            <Pressable
              key={method.id}
              style={[styles.paymentItem, isSelected && styles.paymentItemSelected]}
              onPress={() => onSelectPaymentMethod(method.id)}
            >
              <View style={styles.paymentLeft}>
                <View style={[styles.badge, { backgroundColor: method.color }]}>
                  <Text
                    style={[
                      styles.badgeText,
                      { color: method.id === 'mtn' ? '#1B1B1B' : '#FFFFFF' },
                    ]}
                  >
                    {method.badge}
                  </Text>
                </View>
                <Text style={styles.paymentLabel}>{method.label}</Text>
              </View>
              {isSelected && <Text style={styles.checkMark}>✓</Text>}
            </Pressable>
          );
        })}
      </View>

      <View style={styles.spacer} />

      {/* Actions */}
      <Pressable
        style={styles.submitButton}
        onPress={onEnterMarketplace}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>{'Enter Marketplace >'}</Text>
        )}
      </Pressable>

      <Pressable onPress={onSkip} hitSlop={10} style={styles.skipWrap}>
        <Text style={styles.skipText}>Skip — I'll pay at checkout</Text>
      </Pressable>

      {/* Progress indicators - Screen 6 */}
      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
  iconWrap: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: { width: 28, height: 28 },
  title: { fontSize: 24, fontWeight: '800', color: '#1B1B1B', textAlign: 'center', marginBottom: 28 },
  updatesCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDE7',
    borderWidth: 1,
    borderColor: '#FFF59D',
    borderRadius: 14,
    padding: 16,
    marginBottom: 28,
  },
  updatesInfo: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  alertIcon: { fontSize: 24 },
  updatesTextWrap: { flex: 1 },
  updatesTitle: { fontSize: 15, fontWeight: '700', color: '#1B1B1B' },
  updatesSubtitle: { fontSize: 12, color: '#666666', marginTop: 2 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#666666', marginBottom: 12 },
  paymentList: { gap: 10 },
  paymentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 14,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  paymentItemSelected: {
    borderColor: '#1B5E20',
    backgroundColor: '#F1F8E9',
  },
  paymentLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: { fontSize: 14, fontWeight: '800' },
  paymentLabel: { fontSize: 14, fontWeight: '700', color: '#1B1B1B' },
  checkMark: { fontSize: 16, fontWeight: '800', color: '#1B5E20' },
  spacer: { flex: 1 },
  submitButton: { backgroundColor: '#1B5E20', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  skipWrap: { marginTop: 18, alignItems: 'center', marginBottom: 12 },
  skipText: { fontSize: 13, fontWeight: '600', color: '#1B5E20', textDecorationLine: 'underline' },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20, marginBottom: 20 },
  progressDot: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0' },
  progressDotActive: { backgroundColor: '#1B5E20' },
});
