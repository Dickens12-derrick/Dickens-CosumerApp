// features/onboarding/view/PreferencesScreen.tsx
import React from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { usePreferencesViewModel } from '../viewmodel/usePreferencesViewModel';
import CategoryChip from './components/CategoryChip';
import { getUiIcon } from '../../../utils/imageMapping';

export default function PreferencesScreen() {
  const { categories, selectedIds, isSubmitting, canContinue, onToggleCategory, onContinue } =
    usePreferencesViewModel();

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Image source={getUiIcon('carrot')} style={styles.icon} />
      </View>

      <Text style={styles.title}>What do you usually shop for?</Text>
      <Text style={styles.subtitle}>Pick a few — helps us show you the right deals first</Text>

      <View style={styles.chipGrid}>
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            category={category}
            isSelected={selectedIds.includes(category.id)}
            onToggle={onToggleCategory}
          />
        ))}
      </View>

      <View style={styles.spacer} />

      <Pressable
        style={[styles.submitButton, !canContinue && styles.submitButtonDisabled]}
        onPress={onContinue}
        disabled={!canContinue || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Continue →</Text>
        )}
      </Pressable>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
  iconWrap: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  icon: { width: 28, height: 28, borderRadius: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B1B1B', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  spacer: { flex: 1 },
  submitButton: { backgroundColor: '#1B5E20', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  submitButtonDisabled: { backgroundColor: '#A5D6A7' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 20, marginBottom: 20 },
  progressDot: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0' },
  progressDotActive: { backgroundColor: '#1B5E20' },
});