// features/onboarding/view/components/LanguagePills.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

interface LanguagePillsProps<T extends string> {
  languages: T[];
  selected: T;
  onSelect: (lang: T) => void;
}

export default function LanguagePills<T extends string>({
  languages,
  selected,
  onSelect,
}: LanguagePillsProps<T>) {
  return (
    <View style={styles.row}>
      {languages.map((lang) => {
        const isSelected = lang === selected;
        return (
          <Pressable
            key={lang}
            onPress={() => onSelect(lang)}
            style={[styles.pill, isSelected ? styles.pillSelected : styles.pillUnselected]}
          >
            <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
              {lang}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1.5,
  },
  pillSelected: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
  },
  pillUnselected: {
    backgroundColor: 'transparent',
    borderColor: '#1B5E20',
  },
  pillText: {
    fontSize: 13,
    fontWeight: '600',
  },
  pillTextSelected: {
    color: '#FFFFFF',
  },
  pillTextUnselected: {
    color: '#1B5E20',
  },
});