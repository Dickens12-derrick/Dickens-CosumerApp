// features/onboarding/view/components/CategoryChip.tsx
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import type { Category } from '../../viewmodel/usePreferencesViewModel';

interface CategoryChipProps {
  category: Category;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

export default function CategoryChip({ category, isSelected, onToggle }: CategoryChipProps) {
  return (
    <Pressable
      onPress={() => onToggle(category.id)}
      style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
    >
      <Text style={styles.chipIcon}>{category.icon}</Text>
      <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : styles.chipTextUnselected]}>
        {category.label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 10,
    marginBottom: 10,
  },
  chipSelected: { backgroundColor: '#1B5E20', borderColor: '#1B5E20' },
  chipUnselected: { backgroundColor: 'transparent', borderColor: '#C8E6C9' },
  chipIcon: { fontSize: 14 },
  chipText: { fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: '#FFFFFF' },
  chipTextUnselected: { color: '#1B1B1B' },
});