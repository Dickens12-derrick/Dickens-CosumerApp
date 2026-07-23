// features/home/view/HomeScreen.tsx
import React, { useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { useHomeViewModel, Product, Category, Banner } from '../viewmodel/useHomeViewModel';
import { ProductImage } from '../../../components/ProductImage';
import { getCategoryIcon, getUiIcon } from '../../../utils/imageMapping';

const { width } = Dimensions.get('window');

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const {
    featuredProducts,
    categories,
    banners,
    isLoading,
    onProductPress,
    onCategoryPress,
    onViewAllFeatured,
    onSearchPress,
    onCartPress,
    onProfilePress,
  } = useHomeViewModel();

  const greeting = useMemo(() => getGreeting(), []);

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
        <View>
          <Text style={styles.greeting}>{greeting} 👋</Text>
          <Text style={styles.headerTitle}>E-Katale</Text>
        </View>
        <View style={styles.headerActions}>
          <Pressable onPress={onCartPress} hitSlop={8} style={styles.iconButton}>
            <Text style={styles.iconText}>🛒</Text>
          </Pressable>
          <Pressable onPress={onProfilePress} hitSlop={8} style={styles.iconButton}>
            <Text style={styles.iconText}>👤</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Search bar */}
        <Pressable style={styles.searchBar} onPress={onSearchPress}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchPlaceholder}>Search for produce...</Text>
        </Pressable>

        {/* Banner carousel */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bannerRow}
        >
          {banners.map((banner) => (
            <View key={banner.id} style={[styles.banner, { backgroundColor: banner.backgroundColor }]}>
              <Text style={styles.bannerTitle}>{banner.title}</Text>
              <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
        </View>
        <View style={styles.categoriesGrid}>
          {categories.map((category) => (
            <Pressable
              key={category.id}
              style={styles.categoryCard}
              onPress={() => onCategoryPress(category)}
            >
              <Image source={getCategoryIcon(category.icon)} style={styles.categoryIconImg} />
              <Text style={styles.categoryName}>{category.name}</Text>
            </Pressable>
          ))}
        </View>

        {/* Featured Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <Pressable onPress={onViewAllFeatured}>
            <Text style={styles.viewAllText}>View all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productsRow}
        >
          {featuredProducts.map((product) => (
            <Pressable
              key={product.id}
              style={styles.productCard}
              onPress={() => onProductPress(product)}
            >
              {/* Product image */}
              <View style={styles.productImageContainer}>
                <ProductImage
                  name={product.name}
                  category={product.category}
                  height={100}
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
                    UGX {product.price.toLocaleString()}/{product.unit}
                  </Text>
                  <View style={styles.ratingRow}>
                    <Text style={styles.starIcon}>⭐</Text>
                    <Text style={styles.ratingText}>{product.rating}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>
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
  // --- Header ---
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#1B5E20',
  },
  greeting: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 18,
  },
  // --- Scroll ---
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  // --- Search ---
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchIcon: {
    fontSize: 16,
    marginRight: 10,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#9E9E9E',
  },
  // --- Banner ---
  bannerRow: {
    paddingHorizontal: 20,
    paddingTop: 16,
    gap: 12,
  },
  banner: {
    width: width * 0.75,
    height: 120,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  // --- Section ---
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  viewAllText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
  // --- Categories ---
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryCard: {
    width: (width - 48) / 3,
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: '#F6FBF6',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  categoryIconImg: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 6,
  },
  categoryName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1B1B1B',
    textAlign: 'center',
  },
  // --- Products ---
  productsRow: {
    paddingHorizontal: 20,
    gap: 12,
  },
  productCard: {
    width: 160,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    overflow: 'hidden',
  },
  productImageContainer: {
    height: 100,
    backgroundColor: '#F6FBF6',
    overflow: 'hidden',
  },
  organicBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#1B5E20',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  organicBadgeText: {
    fontSize: 10,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  productPrice: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B5E20',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  starIcon: {
    fontSize: 10,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666666',
  },
});
