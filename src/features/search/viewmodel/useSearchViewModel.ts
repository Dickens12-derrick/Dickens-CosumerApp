// features/search/viewmodel/useSearchViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';

export interface SearchResult {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  category: string;
}

const ALL_PRODUCTS: SearchResult[] = [
  { id: 'p1', name: 'Organic Sukuma Wiki', farmer: 'Mama Mboga Farm', price: 2500, unit: 'bunch', category: 'vegetables' },
  { id: 'p2', name: 'Fresh Matoke', farmer: 'Kampala Greens', price: 5000, unit: 'kg', category: 'vegetables' },
  { id: 'p3', name: 'Ripe Avocados', farmer: 'Kayunga Organics', price: 3000, unit: 'each', category: 'fruits' },
  { id: 'p4', name: 'Free-Range Eggs (tray)', farmer: 'Mukono Poultry', price: 8000, unit: 'tray', category: 'dairy_eggs' },
  { id: 'p5', name: 'Sweet Bananas', farmer: 'Kayunga Organics', price: 2000, unit: 'bunch', category: 'fruits' },
  { id: 'p6', name: 'Groundnuts (1kg)', farmer: 'Gulu Grains', price: 6000, unit: 'kg', category: 'grains' },
  { id: 'p7', name: 'Fresh Tilapia', farmer: 'Jinja Fish Farms', price: 12000, unit: 'kg', category: 'fish_meat' },
  { id: 'p8', name: 'Local Chicken', farmer: 'Mukono Poultry', price: 25000, unit: 'whole', category: 'fish_meat' },
  { id: 'p9', name: 'Posho (Maize Flour)', farmer: 'Gulu Grains', price: 3500, unit: 'kg', category: 'grains' },
  { id: 'p10', name: 'Fresh Ginger', farmer: 'Mama Mboga Farm', price: 1500, unit: 'piece', category: 'herbs' },
  { id: 'p11', name: 'Organic Tomatoes', farmer: 'Kayunga Organics', price: 4000, unit: 'kg', category: 'vegetables' },
  { id: 'p12', name: 'Fresh Milk (1L)', farmer: 'Mbarara Dairy', price: 5000, unit: 'litre', category: 'dairy_eggs' },
];

const RECENT_SEARCHES = ['sukuma wiki', 'matoke', 'avocados', 'eggs'];

export interface UseSearchViewModelReturn {
  query: string;
  results: SearchResult[];
  recentSearches: string[];
  isSearching: boolean;
  showResults: boolean;
  onChangeQuery: (text: string) => void;
  onClearSearch: () => void;
  onResultPress: (product: SearchResult) => void;
  onRecentSearchPress: (search: string) => void;
  onBack: () => void;
}

export function useSearchViewModel(): UseSearchViewModelReturn {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const onChangeQuery = useCallback((text: string) => {
    setQuery(text);
    setIsSearching(text.length > 0);
  }, []);

  const onClearSearch = useCallback(() => {
    setQuery('');
    setIsSearching(false);
  }, []);

  const onResultPress = useCallback((product: SearchResult) => {
    navigateTo('/product/[id]', { id: product.id });
  }, []);

  const onRecentSearchPress = useCallback((search: string) => {
    setQuery(search);
    setIsSearching(true);
  }, []);

  const onBack = useCallback(() => {
    router.back();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return ALL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(lower) ||
        p.farmer.toLowerCase().includes(lower) ||
        p.category.toLowerCase().includes(lower)
    );
  }, [query]);

  return {
    query,
    results,
    recentSearches: RECENT_SEARCHES,
    isSearching,
    showResults: isSearching,
    onChangeQuery,
    onClearSearch,
    onResultPress,
    onRecentSearchPress,
    onBack,
  };
}