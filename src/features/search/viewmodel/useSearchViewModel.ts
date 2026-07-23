// features/search/viewmodel/useSearchViewModel.ts
import { useState, useCallback, useMemo } from 'react';
import { router } from 'expo-router';
import { navigateTo } from '../../../services/navigation';
import { getAllProducts } from '../../product/viewmodel/useProductDetailViewModel';

export interface SearchResult {
  id: string;
  name: string;
  farmer: string;
  price: number;
  unit: string;
  category: string;
}

const ALL_PRODUCTS: SearchResult[] = getAllProducts();

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
    navigateTo(`/product/${product.id}`);
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
