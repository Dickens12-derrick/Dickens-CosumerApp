// features/home/viewmodel/useHomeViewModel.ts
import { useState, useCallback, useEffect } from 'react';
import { navigateTo } from '../../../services/navigation';
import { getAllProducts } from '../../product/viewmodel/useProductDetailViewModel';

// --- Shared types (will move to a shared types file later) ---
export interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  imageUrl: string;
  category: string;
  rating: number;
  reviewCount: number;
  isOrganic: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  backgroundColor: string;
}

// --- Static/mock data (TODO: replace with API calls) ---

const FEATURED_PRODUCTS: Product[] = getAllProducts()
  .slice(0, 8)
  .map((product) => ({ ...product, imageUrl: '' }));

const CATEGORIES: Category[] = [
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains & Cereals', icon: 'grains' },
  { id: 'legumes', name: 'Legumes', icon: 'legumes' },
  { id: 'fish_meat', name: 'Fish & Meat', icon: 'fish_meat' },
  { id: 'herbs', name: 'Herbs & Spices', icon: 'herbs' },
];

const BANNERS: Banner[] = [
  { id: 'b1', title: 'Fresh from the farm', subtitle: 'Get 10% off your first order', imageUrl: '', backgroundColor: '#1B5E20' },
  { id: 'b2', title: 'Support local farmers', subtitle: 'Direct from grower to you', imageUrl: '', backgroundColor: '#2E7D32' },
];

export interface UseHomeViewModelReturn {
  featuredProducts: Product[];
  categories: Category[];
  banners: Banner[];
  isLoading: boolean;
  onProductPress: (product: Product) => void;
  onCategoryPress: (category: Category) => void;
  onViewAllFeatured: () => void;
  onSearchPress: () => void;
  onCartPress: () => void;
  onProfilePress: () => void;
}

export function useHomeViewModel(): UseHomeViewModelReturn {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, []);

  const onProductPress = useCallback((product: Product) => {
    navigateTo(`/product/${product.id}`);
  }, []);

  const onCategoryPress = useCallback((category: Category) => {
    navigateTo('/discover', { category: category.id });
  }, []);

  const onViewAllFeatured = useCallback(() => {
    navigateTo('/discover');
  }, []);

  const onSearchPress = useCallback(() => {
    navigateTo('/search');
  }, []);

  const onCartPress = useCallback(() => {
    navigateTo('/cart');
  }, []);

  const onProfilePress = useCallback(() => {
    navigateTo('/profile');
  }, []);

  return {
    featuredProducts: FEATURED_PRODUCTS,
    categories: CATEGORIES,
    banners: BANNERS,
    isLoading,
    onProductPress,
    onCategoryPress,
    onViewAllFeatured,
    onSearchPress,
    onCartPress,
    onProfilePress,
  };
}
