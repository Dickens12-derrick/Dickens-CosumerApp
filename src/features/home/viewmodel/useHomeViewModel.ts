// features/home/viewmodel/useHomeViewModel.ts
import { useState, useCallback, useEffect } from 'react';
import { navigateTo } from '../../../services/navigation';

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

const FEATURED_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Sukuma Wiki', farmer: 'Mama Mboga Farm', price: 2500, unit: 'bunch', imageUrl: 'sukuma.jpg', category: 'vegetables', rating: 4.8, reviewCount: 42, isOrganic: true },
  { id: 'p2', name: 'Fresh Matoke', farmer: 'Kampala Greens', price: 5000, unit: 'kg', imageUrl: 'matooke.jpg', category: 'vegetables', rating: 4.6, reviewCount: 28, isOrganic: false },
  { id: 'p3', name: 'Ripe Avocados', farmer: 'Kayunga Organics', price: 3000, unit: 'each', imageUrl: 'avocado ready.jpg', category: 'fruits', rating: 4.9, reviewCount: 56, isOrganic: true },
  { id: 'p4', name: 'Free-Range Eggs (tray)', farmer: 'Mukono Poultry', price: 8000, unit: 'tray', imageUrl: 'eggs1.jpg', category: 'dairy_eggs', rating: 4.7, reviewCount: 35, isOrganic: true },
];

const CATEGORIES: Category[] = [
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains & Cereals', icon: 'grains' },
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
    navigateTo('/product/[id]', { id: product.id });
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