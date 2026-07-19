// features/discover/viewmodel/useDiscoverViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export interface Product {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
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

const ALL_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Organic Sukuma Wiki', farmer: 'Mama Mboga Farm', price: 2500, unit: 'bunch', category: 'vegetables', rating: 4.8, reviewCount: 42, isOrganic: true },
  { id: 'p2', name: 'Fresh Matoke', farmer: 'Kampala Greens', price: 5000, unit: 'kg', category: 'vegetables', rating: 4.6, reviewCount: 28, isOrganic: false },
  { id: 'p3', name: 'Ripe Avocados', farmer: 'Kayunga Organics', price: 3000, unit: 'each', category: 'fruits', rating: 4.9, reviewCount: 56, isOrganic: true },
  { id: 'p4', name: 'Free-Range Eggs (tray)', farmer: 'Mukono Poultry', price: 8000, unit: 'tray', category: 'dairy_eggs', rating: 4.7, reviewCount: 35, isOrganic: true },
  { id: 'p5', name: 'Sweet Bananas', farmer: 'Kayunga Organics', price: 2000, unit: 'bunch', category: 'fruits', rating: 4.5, reviewCount: 19, isOrganic: false },
  { id: 'p6', name: 'Groundnuts (1kg)', farmer: 'Gulu Grains', price: 6000, unit: 'kg', category: 'grains', rating: 4.4, reviewCount: 23, isOrganic: true },
  { id: 'p7', name: 'Fresh Tilapia', farmer: 'Jinja Fish Farms', price: 12000, unit: 'kg', category: 'fish_meat', rating: 4.9, reviewCount: 67, isOrganic: false },
  { id: 'p8', name: 'Local Chicken', farmer: 'Mukono Poultry', price: 25000, unit: 'whole', category: 'fish_meat', rating: 4.8, reviewCount: 44, isOrganic: true },
  { id: 'p9', name: 'Posho (Maize Flour)', farmer: 'Gulu Grains', price: 3500, unit: 'kg', category: 'grains', rating: 4.3, reviewCount: 31, isOrganic: false },
  { id: 'p10', name: 'Fresh Ginger', farmer: 'Mama Mboga Farm', price: 1500, unit: 'piece', category: 'herbs', rating: 4.6, reviewCount: 15, isOrganic: true },
  { id: 'p11', name: 'Organic Tomatoes', farmer: 'Kayunga Organics', price: 4000, unit: 'kg', category: 'vegetables', rating: 4.7, reviewCount: 38, isOrganic: true },
  { id: 'p12', name: 'Fresh Milk (1L)', farmer: 'Mbarara Dairy', price: 5000, unit: 'litre', category: 'dairy_eggs', rating: 4.8, reviewCount: 52, isOrganic: false },
];

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'all' },
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains', icon: 'grains' },
  { id: 'fish_meat', name: 'Fish & Meat', icon: 'fish_meat' },
  { id: 'herbs', name: 'Herbs & Spices', icon: 'herbs' },
];

export interface UseDiscoverViewModelReturn {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  sortBy: 'popular' | 'price_low' | 'price_high';
  onCategorySelect: (categoryId: string) => void;
  onSortChange: (sort: 'popular' | 'price_low' | 'price_high') => void;
  onProductPress: (product: Product) => void;
}

export function useDiscoverViewModel(): UseDiscoverViewModelReturn {
  const params = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState(params.category ?? 'all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  const onCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const onSortChange = useCallback((sort: 'popular' | 'price_low' | 'price_high') => {
    setSortBy(sort);
  }, []);

  const onProductPress = useCallback((product: Product) => {
    navigateTo('/product/[id]', { id: product.id });
  }, []);

  const products = useMemo(() => {
    let filtered = activeCategory === 'all'
      ? [...ALL_PRODUCTS]
      : ALL_PRODUCTS.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case 'price_low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [activeCategory, sortBy]);

  return {
    products,
    categories: CATEGORIES,
    activeCategory,
    sortBy,
    onCategorySelect,
    onSortChange,
    onProductPress,
  };
}