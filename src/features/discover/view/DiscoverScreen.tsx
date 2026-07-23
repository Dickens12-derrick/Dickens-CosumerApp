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
import { useTheme } from '../../../services/ThemeContext';
import { useLanguage } from '../../../services/LanguageContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

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

  const { theme, toggleTheme, colors } = useTheme();
  const { t } = useLanguage();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme === 'dark' ? colors.cardBackground : colors.primary }]}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.headerTitle}>{t('discoverTitle')}</Text>
            <Text style={[styles.headerSubtitle, { color: theme === 'dark' ? colors.textSecondary : 'rgba(255,255,255,0.7)' }]}>
              {t('discoverCount', { count: products.length })}
            </Text>
          </View>
          <Pressable onPress={toggleTheme} style={styles.themeToggle} hitSlop={10}>
            <Text style={styles.themeToggleText}>{theme === 'light' ? '🌙' : '☀️'}</Text>
          </Pressable>
        </View>
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
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isActive ? colors.primary : colors.cardBackground,
                  borderColor: isActive ? colors.primary : colors.border,
                },
              ]}
              onPress={() => onCategorySelect(cat.id)}
            >
              <Image source={getCategoryIcon(cat.icon)} style={styles.categoryIcon} />
              <Text
                style={[
                  styles.categoryName,
                  { color: isActive ? (theme === 'dark' ? '#1B1B1B' : '#FFFFFF') : colors.text },
                ]}
                numberOfLines={1}
              >
                {t(`cat_${cat.id}` as any)}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Sort options */}
      <View style={styles.sortRow}>
        <Text style={[styles.sortLabel, { color: colors.textSecondary }]}>{t('discoverSortLabel')}</Text>
        {(['popular', 'price_low', 'price_high'] as const).map((option) => {
          const isActive = sortBy === option;
          const label = option === 'popular' 
            ? t('discoverSortPopular') 
            : option === 'price_low' 
              ? t('discoverSortLowPrice') 
              : t('discoverSortHighPrice');
          return (
            <Pressable
              key={option}
              style={[
                styles.sortChip,
                { backgroundColor: isActive ? colors.primaryLight : (theme === 'dark' ? '#2C2C2C' : '#F5F5F5') },
              ]}
              onPress={() => onSortChange(option)}
            >
              <Text
                style={[
                  styles.sortChipText,
                  { color: isActive ? colors.primary : colors.textSecondary },
                ]}
              >
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
            style={[
              styles.productCard,
              { backgroundColor: colors.cardBackground, borderColor: colors.border },
            ]}
            onPress={() => onProductPress(product)}
          >
            <View
              style={[
                styles.productImagePlaceholder,
                { backgroundColor: theme === 'dark' ? '#252525' : '#F6FBF6' },
              ]}
            >
              <ProductImage
                name={product.name}
                category={product.category}
                height={120}
                width="100%"
                borderRadius={0}
              />
              {product.isOrganic && (
                <View style={[styles.organicBadge, { backgroundColor: colors.primary }]}>
                  <Text style={[styles.organicBadgeText, { color: theme === 'dark' ? '#1B1B1B' : '#FFFFFF' }]}>
                    {t('discoverOrganic')}
                  </Text>
                </View>
              )}
            </View>
            <View style={styles.productInfo}>
              <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={[styles.productFarmer, { color: colors.textSecondary }]} numberOfLines={1}>
                {product.farmer}
              </Text>
              <View style={styles.productBottom}>
                <Text style={[styles.productPrice, { color: colors.primary }]}>
                  UGX {product.price.toLocaleString()}
                </Text>
                <Text style={[styles.productUnit, { color: colors.textSecondary }]}>/{product.unit}</Text>
              </View>
              <View style={styles.ratingRow}>
                <Text style={styles.starIcon}>⭐</Text>
                <Text style={[styles.ratingText, { color: colors.text }]}>{product.rating}</Text>
                <Text style={[styles.reviewCount, { color: colors.textSecondary }]}>
                  ({product.reviewCount})
                </Text>
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
  },
  // --- Header ---
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 4,
  },
  themeToggle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeToggleText: {
    fontSize: 18,
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
    marginRight: 8,
    width: 136,
    justifyContent: 'center',
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
    flexShrink: 1,
    textAlign: 'center',
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
    marginRight: 4,
  },
  sortChip: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    minWidth: 60,
    alignItems: 'center',
  },
  sortChipText: {
    fontSize: 11,
    fontWeight: '600',
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
    borderRadius: 14,
    borderWidth: 1,
    overflow: 'hidden',
    marginBottom: 4,
  },
  productImagePlaceholder: {
    height: 100,
    overflow: 'hidden',
  },
  organicBadge: {
    position: 'absolute',
    top: 6,
    left: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  organicBadgeText: {
    fontSize: 9,
    fontWeight: '700',
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 13,
    fontWeight: '700',
  },
  productFarmer: {
    fontSize: 11,
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
  },
  productUnit: {
    fontSize: 11,
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
  },
  reviewCount: {
    fontSize: 10,
  },
});
