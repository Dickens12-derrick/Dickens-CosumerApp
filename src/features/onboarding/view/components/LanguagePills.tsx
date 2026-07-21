// features/onboarding/view/components/LanguagePills.tsx
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

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
        const scaleValue = useRef(new Animated.Value(1)).current;

        const onPressIn = () => {
          Animated.spring(scaleValue, {
            toValue: 0.92,
            useNativeDriver: true,
          }).start();
        };

        const onPressOut = () => {
          Animated.spring(scaleValue, {
            toValue: 1,
            friction: 4,
            tension: 40,
            useNativeDriver: true,
          }).start();
        };

        return (
          <Animated.View key={lang} style={{ transform: [{ scale: scaleValue }] }}>
            <TouchableOpacity
              onPress={() => onSelect(lang)}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              style={[styles.pill, isSelected ? styles.pillSelected : styles.pillUnselected]}
              activeOpacity={0.8}
            >
              <Text style={[styles.pillText, isSelected ? styles.pillTextSelected : styles.pillTextUnselected]}>
                {lang}
              </Text>
            </TouchableOpacity>
          </Animated.View>
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