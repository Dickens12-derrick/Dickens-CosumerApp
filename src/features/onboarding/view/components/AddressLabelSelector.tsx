// features/onboarding/view/components/AddressLabelSelector.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import type { AddressLabel } from '../../viewmodel/useDeliveryAddressViewModel';
import { getUiIcon } from '../../../../utils/imageMapping';

interface AddressLabelSelectorProps {
  labels: AddressLabel[];
  selected: AddressLabel;
  onSelect: (label: AddressLabel) => void;
}

const ICONS: Record<AddressLabel, any> = {
  Home: getUiIcon('home'),
  Work: getUiIcon('work'),
  Other: getUiIcon('other'),
};

export default function AddressLabelSelector({ labels, selected, onSelect }: AddressLabelSelectorProps) {
  return (
    <View style={styles.row}>
      {labels.map((label) => {
        const isSelected = label === selected;
        return (
          <Pressable
            key={label}
            onPress={() => onSelect(label)}
            style={[styles.chip, isSelected ? styles.chipSelected : styles.chipUnselected]}
          >
            <Image source={ICONS[label]} style={styles.chipIcon} />
            <Text style={[styles.chipText, isSelected ? styles.chipTextSelected : styles.chipTextUnselected]}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
  },
  chipSelected: { backgroundColor: '#1B5E20', borderColor: '#1B5E20' },
  chipUnselected: { backgroundColor: 'transparent', borderColor: '#C8E6C9' },
  chipIcon: { width: 18, height: 18, borderRadius: 4 },
  chipText: { fontSize: 13, fontWeight: '600' },
  chipTextSelected: { color: '#FFFFFF' },
  chipTextUnselected: { color: '#1B1B1B' },
});