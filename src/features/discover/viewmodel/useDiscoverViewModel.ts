// features/discover/viewmodel/useDiscoverViewModel.ts
import { useState, useCallback, useEffect, useMemo } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import { getAllProducts } from '../../product/viewmodel/useProductDetailViewModel';

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

const ALL_PRODUCTS: Product[] = getAllProducts();

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All', icon: 'all' },
  { id: 'vegetables', name: 'Vegetables', icon: 'vegetables' },
  { id: 'fruits', name: 'Fruits', icon: 'fruits' },
  { id: 'dairy_eggs', name: 'Dairy & Eggs', icon: 'dairy_eggs' },
  { id: 'grains', name: 'Grains', icon: 'grains' },
  { id: 'legumes', name: 'Legumes', icon: 'legumes' },
  { id: 'fish_meat', name: 'Fish & Meat', icon: 'fish_meat' },
  { id: 'herbs', name: 'Herbs & Spices', icon: 'herbs' },
];

export interface UseDiscoverViewModelReturn {
  products: Product[];
  categories: Category[];
  activeCategory: string;
  activeCategoryName: string;
  categorySummary: string;
  sortBy: 'popular' | 'price_low' | 'price_high';
  onCategorySelect: (categoryId: string) => void;
  onSortChange: (sort: 'popular' | 'price_low' | 'price_high') => void;
  onProductPress: (product: Product) => void;
}

export function useDiscoverViewModel(): UseDiscoverViewModelReturn {
  const params = useLocalSearchParams<{ category?: string }>();
  const [activeCategory, setActiveCategory] = useState(params.category ?? 'all');
  const [sortBy, setSortBy] = useState<'popular' | 'price_low' | 'price_high'>('popular');

  useEffect(() => {
    setActiveCategory(params.category ?? 'all');
  }, [params.category]);

  const onCategorySelect = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
  }, []);

  const onSortChange = useCallback((sort: 'popular' | 'price_low' | 'price_high') => {
    setSortBy(sort);
  }, []);

  const onProductPress = useCallback((product: Product) => {
    navigateTo(`/product/${product.id}`);
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

  const activeCategoryName = useMemo(() => {
    return CATEGORIES.find((category) => category.id === activeCategory)?.name ?? 'All';
  }, [activeCategory]);

  const categorySummary = activeCategory === 'all'
    ? `${products.length} products across all categories`
    : `${products.length} ${activeCategoryName.toLowerCase()} products found`;

  return {
    products,
    categories: CATEGORIES,
    activeCategory,
    activeCategoryName,
    categorySummary,
    sortBy,
    onCategorySelect,
    onSortChange,
    onProductPress,
  };
}
