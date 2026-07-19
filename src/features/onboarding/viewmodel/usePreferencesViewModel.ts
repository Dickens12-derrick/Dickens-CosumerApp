// features/onboarding/viewmodel/usePreferencesViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';

export interface Category {
  id: string;
  label: string;
  icon: string;
}

const CATEGORIES: Category[] = [
  { id: 'vegetables', label: 'Vegetables', icon: '🥦' },
  { id: 'fruits', label: 'Fruits', icon: '🍎' },
  { id: 'dairy_eggs', label: 'Dairy & Eggs', icon: '🥚' },
  { id: 'grains', label: 'Grains', icon: '🌾' },
  { id: 'fish_meat', label: 'Fish & Meat', icon: '🐟' },
  { id: 'herbs', label: 'Herbs & Spices', icon: '🌿' },
];

const DEFAULT_SELECTED = ['vegetables'];

export interface UsePreferencesViewModelReturn {
  categories: Category[];
  selectedIds: string[];
  isSubmitting: boolean;
  canContinue: boolean;
  onToggleCategory: (id: string) => void;
  onContinue: () => void;
}

export function usePreferencesViewModel(): UsePreferencesViewModelReturn {
  const [selectedIds, setSelectedIds] = useState<string[]>(DEFAULT_SELECTED);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onToggleCategory = useCallback((id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    );
  }, []);

  const canContinue = selectedIds.length > 0;

  const onContinue = useCallback(async () => {
    if (!canContinue) return;
    setIsSubmitting(true);
    try {
      // TODO: persist selectedIds to backend/local store for the "For You" engine.
      await new Promise((resolve) => setTimeout(resolve, 500));
      router.replace('/(tabs)/discover');
    } finally {
      setIsSubmitting(false);
    }
  }, [canContinue]);

  return {
    categories: CATEGORIES,
    selectedIds,
    isSubmitting,
    canContinue,
    onToggleCategory,
    onContinue,
  };
}