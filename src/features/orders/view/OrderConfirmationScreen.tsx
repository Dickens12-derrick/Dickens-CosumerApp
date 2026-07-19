// features/orders/view/OrderConfirmationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useOrderConfirmationViewModel } from '../viewmodel/useOrderConfirmationViewModel';

export default function OrderConfirmationScreen() {
  const {
    orderNumber,
    estimatedDelivery,
    onTrackOrder,
    onContinueShopping,
  } = useOrderConfirmationViewModel();

  return (
    <View style={styles.container}>
      {/* Success animation area */}
      <View style={styles.successSection}>
        <View style={styles.successCircle}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
      </View>

      {/* Order confirmation info */}
      <Text style={styles.title}>Order Placed Successfully!</Text>
      <Text style={styles.subtitle}>
        Your order has been received and is being processed.
      </Text>

      <View style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Order Number</Text>
          <Text style={styles.detailValue}>{orderNumber}</Text>
        </View>
        <View style={styles.detailDivider} />
        <View style={styles.detailRow}>
          <Text style={styles.detailLabel}>Estimated Delivery</Text>
          <Text style={styles.detailValue}>{estimatedDelivery}</Text>
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Pressable style={styles.primaryButton} onPress={onTrackOrder}>
          <Text style={styles.primaryButtonText}>Track My Order</Text>
        </Pressable>

        <Pressable style={styles.secondaryButton} onPress={onContinueShopping}>
          <Text style={styles.secondaryButtonText}>Continue Shopping</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  // --- Success ---
  successSection: {
    marginTop: 100,
    alignItems: 'center',
    marginBottom: 24,
  },
  successCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#1B5E20',
  },
  checkmark: {
    fontSize: 40,
    fontWeight: '900',
    color: '#1B5E20',
  },
  // --- Text ---
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B1B1B',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  // --- Details Card ---
  detailsCard: {
    width: '100%',
    backgroundColor: '#F6FBF6',
    borderRadius: 16,
    padding: 20,
    marginTop: 28,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  detailDivider: {
    height: 1,
    backgroundColor: '#E8F5E9',
    marginVertical: 8,
  },
  // --- Actions ---
  actionsSection: {
    width: '100%',
    marginTop: 40,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#1B5E20',
    fontSize: 16,
    fontWeight: '700',
  },
});