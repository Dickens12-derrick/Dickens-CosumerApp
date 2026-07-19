// features/orders/view/OrderDetailScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { useOrderDetailViewModel } from '../viewmodel/useOrderDetailViewModel';
import { OrderStatus } from '../viewmodel/useOrdersViewModel';
import { getProductImage } from '../../../utils/imageMapping';

export default function OrderDetailScreen() {
  const {
    order,
    getStatusLabel,
    getStatusIcon,
    getStatusStep,
    onBack,
    onReorder,
  } = useOrderDetailViewModel();

  if (!order) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.notFoundText}>Order not found</Text>
        <Pressable onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  const currentStep = getStatusStep(order.status);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Order Details</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Order number + status */}
        <View style={styles.orderIdSection}>
          <Text style={styles.orderNumber}>{order.orderNumber}</Text>
          <View style={styles.statusRow}>
            <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
            <Text style={styles.statusLabel}>{getStatusLabel(order.status)}</Text>
          </View>
        </View>

        {/* Tracking progress */}
        {currentStep >= 0 && (
          <View style={styles.trackingSection}>
            <Text style={styles.sectionTitle}>Order Progress</Text>
            <View style={styles.trackingSteps}>
              {(['confirmed', 'out_for_delivery', 'delivered'] as OrderStatus[]).map((step, index) => {
                const isCompleted = index <= currentStep;
                const isCurrent = index === currentStep;
                return (
                  <View key={step} style={styles.trackingStep}>
                    <View style={styles.trackingLineContainer}>
                      <View style={[styles.trackingDot, isCompleted && styles.trackingDotCompleted, isCurrent && styles.trackingDotCurrent]}>
                        <Text style={[styles.trackingDotIcon, isCompleted && styles.trackingDotIconCompleted]}>
                          {isCompleted ? '✓' : '○'}
                        </Text>
                      </View>
                      {index < 2 && (
                        <View style={[styles.trackingLine, isCompleted && styles.trackingLineCompleted]} />
                      )}
                    </View>
                    <Text style={[styles.trackingLabel, isCompleted && styles.trackingLabelCompleted]}>
                      {getStatusLabel(step)}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Delivery info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Information</Text>
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address</Text>
              <Text style={styles.infoValue}>{order.deliveryAddress}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Estimated Delivery</Text>
              <Text style={styles.infoValue}>{order.estimatedDelivery}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Placed At</Text>
              <Text style={styles.infoValue}>{order.placedAt}</Text>
            </View>
            <View style={styles.infoDivider} />
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Payment</Text>
              <Text style={styles.infoValue}>{order.paymentMethod}</Text>
            </View>
          </View>
        </View>

        {/* Order items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Items ({order.items.length})</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImage}>
                <Image
                  source={getProductImage(item.name, item.category)}
                  style={styles.itemThumbnail}
                />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemMeta}>x{item.quantity} • UGX {item.price.toLocaleString()}/{item.quantity > 1 ? 'each' : 'item'}</Text>
              </View>
              <Text style={styles.itemTotal}>
                UGX {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Price summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>
                UGX {(order.total - order.deliveryFee).toLocaleString()}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery fee</Text>
              <Text style={styles.summaryValue}>
                {order.deliveryFee === 0 ? 'FREE' : `UGX ${order.deliveryFee.toLocaleString()}`}
              </Text>
            </View>
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>UGX {order.total.toLocaleString()}</Text>
            </View>
          </View>
        </View>

        {/* Reorder button */}
        <Pressable style={styles.reorderButton} onPress={onReorder}>
          <Text style={styles.reorderButtonText}>Reorder</Text>
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  notFoundText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 12,
  },
  backLink: {
    padding: 8,
  },
  backLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#1B5E20',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  // --- Scroll ---
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // --- Order ID ---
  orderIdSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusIcon: {
    fontSize: 14,
  },
  statusLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
  },
  // --- Tracking ---
  trackingSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  trackingSteps: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
  },
  trackingStep: {
    alignItems: 'center',
    flex: 1,
  },
  trackingLineContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  trackingDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  trackingDotCompleted: {
    backgroundColor: '#1B5E20',
  },
  trackingDotCurrent: {
    borderWidth: 3,
    borderColor: '#A5D6A7',
  },
  trackingDotIcon: {
    fontSize: 14,
    color: '#9E9E9E',
    fontWeight: '700',
  },
  trackingDotIconCompleted: {
    color: '#FFFFFF',
  },
  trackingLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginTop: -16,
    marginLeft: -2,
    marginRight: -2,
  },
  trackingLineCompleted: {
    backgroundColor: '#1B5E20',
  },
  trackingLabel: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  trackingLabelCompleted: {
    color: '#1B5E20',
  },
  // --- Section ---
  section: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 12,
  },
  // --- Info Card ---
  infoCard: {
    backgroundColor: '#F6FBF6',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 6,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666666',
    flex: 0.4,
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B1B1B',
    flex: 0.6,
    textAlign: 'right',
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E8F5E9',
    marginVertical: 4,
  },
  // --- Items ---
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 10,
  },
  itemImage: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#E8F5E9',
    overflow: 'hidden',
  },
  itemThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  itemMeta: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  // --- Summary ---
  summaryCard: {
    backgroundColor: '#F6FBF6',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#C8E6C9',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B5E20',
  },
  // --- Reorder ---
  reorderButton: {
    marginHorizontal: 20,
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  reorderButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});