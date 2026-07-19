// features/checkout/view/CheckoutScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useCheckoutViewModel } from '../viewmodel/useCheckoutViewModel';
import { getProductImage, getUiIcon } from '../../../utils/imageMapping';

export default function CheckoutScreen() {
  const {
    items,
    deliveryAddress,
    paymentMethods,
    selectedPaymentId,
    deliveryNotes,
    isPlacingOrder,
    subtotal,
    deliveryFee,
    total,
    onSelectPayment,
    onChangeDeliveryNotes,
    onPlaceOrder,
    onBack,
  } = useCheckoutViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery Address */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          <View style={styles.addressCard}>
            <View style={styles.addressHeader}>
              <Image source={getUiIcon('mapPin')} style={styles.addressIcon} />
              <Text style={styles.addressLabel}>{deliveryAddress.label}</Text>
            </View>
            <Text style={styles.addressLandmark}>
              {deliveryAddress.landmark || 'No landmark set'}
            </Text>
            <Text style={styles.addressCoords}>{deliveryAddress.coordinates}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Items ({items.length})</Text>
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemImage}>
                <Image
                  source={getProductImage(item.name, item.category)}
                  style={styles.itemThumbnail}
                />
              </View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.itemFarmer} numberOfLines={1}>{item.farmer}</Text>
                <View style={styles.itemMeta}>
                  <Text style={styles.itemQty}>x{item.quantity}</Text>
                  <Text style={styles.itemUnit}>/ {item.unit}</Text>
                </View>
              </View>
              <Text style={styles.itemPrice}>
                UGX {(item.price * item.quantity).toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        {/* Delivery Notes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Delivery Notes (optional)</Text>
          <TextInput
            style={styles.notesInput}
            value={deliveryNotes}
            onChangeText={onChangeDeliveryNotes}
            placeholder="e.g. Leave at the gate, call when arriving..."
            placeholderTextColor="#9E9E9E"
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />
        </View>

        {/* Payment Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          {paymentMethods.map((method) => {
            const isSelected = method.id === selectedPaymentId;
            return (
              <Pressable
                key={method.id}
                style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
                onPress={() => onSelectPayment(method.id)}
              >
                <View style={styles.paymentLeft}>
                  <Image source={getUiIcon(method.icon)} style={styles.paymentIcon} />
                  <View>
                    <Text style={[styles.paymentName, isSelected && styles.paymentNameSelected]}>
                      {method.name}
                    </Text>
                    <Text style={styles.paymentDescription}>{method.description}</Text>
                  </View>
                </View>
                <View style={[styles.radio, isSelected && styles.radioSelected]}>
                  {isSelected && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Price Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>UGX {subtotal.toLocaleString()}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Delivery fee</Text>
              <Text style={styles.summaryValue}>
                {deliveryFee === 0 ? 'FREE' : `UGX ${deliveryFee.toLocaleString()}`}
              </Text>
            </View>
            {deliveryFee > 0 && (
              <Text style={styles.freeDeliveryHint}>
                Add UGX {(30000 - subtotal).toLocaleString()} more for free delivery
              </Text>
            )}
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>UGX {total.toLocaleString()}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Place Order Button */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.placeOrderButton, isPlacingOrder && styles.placeOrderButtonDisabled]}
          onPress={onPlaceOrder}
          disabled={isPlacingOrder}
        >
          {isPlacingOrder ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.placeOrderText}>
              Place Order • UGX {total.toLocaleString()}
            </Text>
          )}
        </Pressable>
      </View>
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
    paddingBottom: 100,
  },
  // --- Section ---
  section: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B1B1B',
    marginBottom: 12,
  },
  // --- Address ---
  addressCard: {
    backgroundColor: '#F6FBF6',
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  addressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  addressIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
  },
  addressLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  addressLandmark: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  addressCoords: {
    fontSize: 11,
    color: '#9E9E9E',
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
  itemFarmer: {
    fontSize: 11,
    color: '#666666',
    marginTop: 1,
  },
  itemMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  itemQty: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5E20',
  },
  itemUnit: {
    fontSize: 11,
    color: '#666666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  // --- Notes ---
  notesInput: {
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    padding: 14,
    fontSize: 14,
    color: '#1B1B1B',
    minHeight: 80,
    backgroundColor: '#F6FBF6',
  },
  // --- Payment ---
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E8F5E9',
    marginBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  paymentCardSelected: {
    borderColor: '#1B5E20',
    backgroundColor: '#F6FBF6',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentIcon: {
    width: 24,
    height: 24,
    borderRadius: 4,
  },
  paymentName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  paymentNameSelected: {
    color: '#1B5E20',
  },
  paymentDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 1,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#1B5E20',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1B5E20',
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
  freeDeliveryHint: {
    fontSize: 11,
    color: '#2E7D32',
    marginBottom: 8,
    marginTop: -4,
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
  // --- Bottom Bar ---
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
  },
  placeOrderButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeOrderButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  placeOrderText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});