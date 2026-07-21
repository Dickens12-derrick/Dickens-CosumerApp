// features/discover/view/DiscoverScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useDiscoverViewModel } from '../viewmodel/useDiscoverViewModel';
import { ProductImage } from '../../../components/ProductImage';
import { getCategoryIcon } from '../../../utils/imageMapping';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CHIP_WIDTH = (width - 20 * 2 - 8 * 6) / 7;

export default function DiscoverScreen() {
  const {
    products,
    categories,
    activeCategory,
    sortBy,
    onCategorySelect,
    onSortChange,
    onProductPress,
  } = useDiscoverViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Discover</Text>
        <Text style={styles.headerSubtitle}>{products.length} products found</Text>
      </View>

      {/* Category filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}
      >
        {categories.map((cat) => {
          const isActive = cat.id === activeCategory;
          return (
            <Pressable
              key={cat.id}
              style={[styles.categoryChip, isActive && styles.categoryChipActive]}
              onPress={() => onCategorySelect(cat.id)}
            >
              <Image source={getCategoryIcon(cat.icon)} style={styles.categoryIcon} />
              <Text style={[styles.categoryName, isActive && styles.categoryNameActive]}>
                {cat.name}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Sort options */}
      <View style={styles.sortRow}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        {(['popular', 'price_low', 'price_high'] as const).map((option) => {
          const isActive = sortBy === option;
          const label = option === 'popular' ? 'Popular' : option === 'price_low' ? 'Lowest Price' : 'Highest Price';
          return (
            <Pressable
              key={option}
              style={[styles.sortChip, isActive && styles.sortChipActive]}
              onPress={() => onSortChange(option)}
            >
              <Text style={[styles.sortChipText, isActive && styles.sortChipTextActive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Product grid */}
      <ScrollView
        contentContainerStyle={styles.productGrid}
        showsVerticalScrollIndicator={false}
      >
        {products.map((product) => (
          <Pressable
            key={product.id}
            style={styles.productCard}
            onPress={() => onProductPress(product)}
          >
            <View style={styles.productImagePlaceholder}>
              <ProductImage
                name={product.name}
                category={product.category}
                height={120}
                width="100%"
                borderRadius={0}
              />
              {product.isOrganic && (
                <View style={styles.organicBadge}>
                  <Text style={styles.organicBadgeText}>Organic</Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={styles.productName} numberOfLines={1}>{product.name}</Text>
              <Text style={styles.productFarmer} numberOfLines={1}>{product.farmer}</Text>
              <View style={styles.productBottom}>
                <Text style={styles.productPrice}>
                  UGX {product.price.toLocaleString()}
                </Text>
                <Text style={styles.productUnit}>/{product.unit}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={styles.ratingText}>{product.rating}</Text>
                <Text style={styles.reviewCount}>({product.reviewCount})</Text>
              </View>
            </View>
          </Pressable>
        ))}
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
    paddingBottom: 12,
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
  // --- Categories ---
  categoryRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    minWidth: 80,
    justifyContent: 'center',
  },
  categoryChipActive: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
    borderWidth: 1.5,
  },
  categoryIcon: {
    width: 18,
    height: 18,
    borderRadius: 2,
    marginRight: 6,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  categoryNameActive: {
    color: '#FFFFFF',
  },
  // --- Sort ---
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 12,
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginRight: 4,
  },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    minWidth: 60,
    alignItems: 'center',
  },
  sortChipActive: {
    backgroundColor: '#E8F5E9',
  },
  sortChipText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
  sortChipTextActive: {
    color: '#1B5E20',
  },
  // --- Product Grid ---
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
    paddingBottom: 24,
  },
  productCard: {
    width: CARD_WIDTH,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    overflow: 'hidden',
    marginBottom: 4,
  },
  productImagePlaceholder: {
    height: 100,
    backgroundColor: '#F6FBF6',
    overflow: 'hidden',
  },
  organicBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    backgroundColor: '#1B5E20',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  organicBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  productFarmer: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },
  productBottom: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 6,
    gap: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20',
  },
  productUnit: {
    fontSize: 11,
    color: '#666666',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 4,
  },
  starIcon: {
    fontSize: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  reviewCount: {
    fontSize: 10,
    color: '#666666',
  },
});