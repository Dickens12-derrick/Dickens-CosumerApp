// features/cart/view/CartScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
} from 'react-native';
import { useCartViewModel } from '../viewmodel/useCartViewModel';
import { getProductImage, getUiIcon } from '../../../utils/imageMapping';

export default function CartScreen() {
  const {
    items,
    isLoading,
    onUpdateQuantity,
    onRemoveItem,
    onCheckout,
    onContinueShopping,
    subtotal,
    deliveryFee,
    total,
  } = useCartViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart</Text>
        <Text style={styles.headerSubtitle}>{items.length} item{items.length !== 1 ? 's' : ''}</Text>
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Image source={getUiIcon('cart')} style={styles.emptyIcon} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySubtitle}>Add some fresh produce to get started</Text>
          <Pressable style={styles.shopButton} onPress={onContinueShopping}>
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </Pressable>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <View key={item.id} style={styles.cartItem}>
                <View style={styles.itemImage}>
                  <Image
                    source={getProductImage(item.name, item.category)}
                    style={styles.itemThumbnail}
                  />
                </View>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.itemFarmer} numberOfLines={1}>{item.farmer}</Text>
                  <Text style={styles.itemPrice}>
                    UGX {item.price.toLocaleString()}/{item.unit}
                  </Text>
                  <View style={styles.quantityRow}>
                    <Pressable
                      style={[styles.qtyButton, item.quantity <= 1 && styles.qtyButtonDisabled]}
                      onPress={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Text style={styles.qtyButtonText}>−</Text>
                    </Pressable>
                    <Text style={styles.quantityValue}>{item.quantity}</Text>
                    <Pressable
                      style={styles.qtyButton}
                      onPress={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Text style={styles.qtyButtonText}>+</Text>
                    </Pressable>
                    <Pressable
                      style={styles.removeButton}
                      onPress={() => onRemoveItem(item.id)}
                    >
                      <Text style={styles.removeText}>Remove</Text>
                    </Pressable>
                  </View>
                </View>
                <Text style={styles.itemTotal}>
                  UGX {(item.price * item.quantity).toLocaleString()}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Order summary */}
          <View style={styles.summarySection}>
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
            <Pressable style={styles.checkoutButton} onPress={onCheckout}>
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </Pressable>
          </View>
        </>
      )}
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
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 4,
  },
  // --- Empty State ---
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    textAlign: 'center',
  },
  shopButton: {
    marginTop: 24,
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  shopButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // --- Cart Items ---
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    gap: 12,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6FBF6',
    borderRadius: 14,
    padding: 12,
    gap: 12,
  },
  itemImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
    overflow: 'hidden',
  },
  itemThumbnail: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
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
  itemPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1B5E20',
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 6,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B5E20',
  },
  quantityValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
    minWidth: 20,
    textAlign: 'center',
  },
  removeButton: {
    marginLeft: 8,
  },
  removeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#D32F2F',
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  // --- Summary ---
  summarySection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
    backgroundColor: '#FFFFFF',
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
    borderTopColor: '#E8F5E9',
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
  checkoutButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  checkoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});