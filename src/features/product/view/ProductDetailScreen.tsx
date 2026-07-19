// features/product/view/ProductDetailScreen.tsx
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
import { useProductDetailViewModel } from '../viewmodel/useProductDetailViewModel';
import { getProductImage, getCategoryIcon } from '../../../utils/imageMapping';
export default function ProductDetailScreen() {
  const {
    product,
    quantity,
    isLoading,
    onIncreaseQuantity,
    onDecreaseQuantity,
    onAddToCart,
    onBack,
  } = useProductDetailViewModel();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#1B5E20" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.notFoundText}>Product not found</Text>
        <Pressable onPress={onBack} style={styles.backLink}>
          <Text style={styles.backLinkText}>← Go back</Text>
        </Pressable>
      </View>
    );
  }

  const totalPrice = product.price * quantity;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Back button */}
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        {/* Image placeholder */}
        <View style={styles.imageContainer}>
          <Image
            source={getProductImage(product.name, product.category)}
            style={styles.productImage}
            resizeMode="cover"
          />
          {product.isOrganic && (
            <View style={styles.organicBadge}>
              <Text style={styles.organicBadgeText}>Organic</Text>
            </View>
          )}
        </View>

        {/* Product info */}
        <View style={styles.infoSection}>
          <Text style={styles.productName}>{product.name}</Text>

          <View style={styles.farmerRow}>
            <Text style={styles.farmerLabel}>by </Text>
            <Text style={styles.farmerName}>{product.farmer}</Text>
            <Text style={styles.farmerRating}> ⭐ {product.farmerRating}</Text>
          </View>

          <View style={styles.ratingRow}>
            <Text style={styles.starIcon}>⭐</Text>
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>({product.reviewCount} reviews)</Text>
          </View>

          {/* Price */}
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>
            UGX {product.price.toLocaleString()}/{product.unit}
          </Text>

          {/* Stock status */}
          <View style={[styles.stockBadge, product.inStock ? styles.inStock : styles.outOfStock]}>
            <Text style={[styles.stockText, product.inStock ? styles.inStockText : styles.outOfStockText]}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Text>
          </View>
          {product.inStock && (
            <Text style={styles.stockAmount}>{product.stockAmount}</Text>
          )}

          {/* Description */}
          <Text style={styles.descriptionLabel}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>

      {/* Bottom bar with quantity + add to cart */}
      <View style={styles.bottomBar}>
        <View style={styles.quantitySection}>
          <Text style={styles.quantityLabel}>Qty</Text>
          <View style={styles.quantityControls}>
            <Pressable
              style={[styles.qtyButton, quantity <= 1 && styles.qtyButtonDisabled]}
              onPress={onDecreaseQuantity}
              disabled={quantity <= 1}
            >
              <Text style={[styles.qtyButtonText, quantity <= 1 && styles.qtyButtonTextDisabled]}>−</Text>
            </Pressable>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <Pressable
              style={[styles.qtyButton, quantity >= 20 && styles.qtyButtonDisabled]}
              onPress={onIncreaseQuantity}
              disabled={quantity >= 20}
            >
              <Text style={[styles.qtyButtonText, quantity >= 20 && styles.qtyButtonTextDisabled]}>+</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={[styles.addToCartButton, !product.inStock && styles.addToCartDisabled]}
          onPress={onAddToCart}
          disabled={!product.inStock}
        >
          <Text style={styles.addToCartText}>Add to Cart • UGX {totalPrice.toLocaleString()}</Text>
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
  scrollContent: {
    paddingBottom: 100,
  },
  // --- Back ---
  backButton: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  // --- Image ---
  imageContainer: {
    marginHorizontal: 20,
    height: 240,
    borderRadius: 16,
    backgroundColor: '#F6FBF6',
    marginBottom: 20,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  organicBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#1B5E20',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  organicBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  // --- Info ---
  infoSection: {
    paddingHorizontal: 20,
  },
  productName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  farmerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  farmerLabel: {
    fontSize: 13,
    color: '#666666',
  },
  farmerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
  },
  farmerRating: {
    fontSize: 13,
    color: '#666666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  starIcon: {
    fontSize: 14,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  reviewCount: {
    fontSize: 13,
    color: '#666666',
  },
  priceLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
    marginTop: 20,
  },
  price: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B5E20',
    marginTop: 4,
  },
  stockBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 12,
  },
  inStock: {
    backgroundColor: '#E8F5E9',
  },
  outOfStock: {
    backgroundColor: '#FFEBEE',
  },
  stockText: {
    fontSize: 13,
    fontWeight: '600',
  },
  inStockText: {
    color: '#1B5E20',
  },
  outOfStockText: {
    color: '#D32F2F',
  },
  stockAmount: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  descriptionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B1B',
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#444444',
    lineHeight: 22,
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  quantityLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666666',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F6FBF6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  qtyButtonDisabled: {
    opacity: 0.4,
  },
  qtyButtonText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1B5E20',
  },
  qtyButtonTextDisabled: {
    color: '#9E9E9E',
  },
  quantityValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
    minWidth: 24,
    textAlign: 'center',
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartDisabled: {
    backgroundColor: '#A5D6A7',
  },
  addToCartText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});