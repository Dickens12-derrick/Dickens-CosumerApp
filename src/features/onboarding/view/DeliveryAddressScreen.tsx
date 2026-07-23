// features/onboarding/view/DeliveryAddressScreen.tsx
import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from 'react-native';
import { useDeliveryAddressViewModel } from '../viewmodel/useDeliveryAddressViewModel';
import AddressLabelSelector from './components/AddressLabelSelector';
import { getUiIcon } from '../../../utils/imageMapping';

export default function DeliveryAddressScreen() {
  const {
    labels,
    selectedLabel,
    landmark,
    isLocating,
    hasPickedLocation,
    onSelectLabel,
    onChangeLandmark,
    onUseCurrentLocation,
    onSaveAddress,
    onSkip,
  } = useDeliveryAddressViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Map placeholder */}
        <View style={styles.mapContainer}>
          <View style={styles.mapPlaceholder}>
            <Image source={getUiIcon('mapPin')} style={styles.mapPin} />
            <Text style={styles.mapHint}>Map will render here</Text>
          </View>
        </View>

        {/* Current location button */}
        <Pressable
          style={styles.locationButton}
          onPress={onUseCurrentLocation}
          disabled={isLocating}
        >
          {isLocating ? (
            <ActivityIndicator color="#1B5E20" size="small" />
          ) : (
            <>
              <Image source={getUiIcon('target')} style={styles.locationIcon} />
              <Text style={styles.locationButtonText}>Use My Current Location</Text>
            </>
          )}
        </Pressable>

        {/* Address label selector */}
        <Text style={styles.sectionLabel}>Label your address</Text>
        <AddressLabelSelector
          labels={labels}
          selected={selectedLabel}
          onSelect={onSelectLabel}
        />

        {/* Landmark input */}
        <Text style={[styles.sectionLabel, { marginTop: 20 }]}>Nearest landmark (optional)</Text>
        <TextInput
          style={styles.input}
          value={landmark}
          onChangeText={onChangeLandmark}
          placeholder="e.g. Near Shell Kabalagala"
          placeholderTextColor="#9E9E9E"
        />

        {/* Save address button */}
        <Pressable
          style={[styles.saveButton, !hasPickedLocation && styles.saveButtonDisabled]}
          onPress={onSaveAddress}
          disabled={!hasPickedLocation}
        >
          <Text style={styles.saveButtonText}>{'Save Address >'}</Text>
        </Pressable>

        {/* Skip link */}
        <Pressable onPress={onSkip} hitSlop={10} style={styles.skipWrap}>
          <Text style={styles.skipText}>I'll add this later</Text>
        </Pressable>

        {/* Progress dots */}
        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={[styles.progressDot, styles.progressDotActive]} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  // --- Map ---
  mapContainer: {
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    backgroundColor: '#F0F4F0',
  },
  mapPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapPin: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginBottom: 8,
  },
  mapHint: {
    fontSize: 13,
    color: '#666666',
  },
  // --- Location Button ---
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#1B5E20',
    backgroundColor: '#F6FBF6',
    marginBottom: 24,
  },
  locationIcon: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 8,
  },
  locationButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B5E20',
  },
  // --- Section Label ---
  sectionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 10,
  },
  // --- Input ---
  input: {
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1B1B1B',
    backgroundColor: '#F6FBF6',
    marginBottom: 28,
  },
  // --- Save Button ---
  saveButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1B5E20',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  saveButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // --- Skip ---
  skipWrap: {
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  skipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    textDecorationLine: 'underline',
  },
  // --- Progress ---
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  progressDot: {
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E0E0E0',
  },
  progressDotActive: {
    backgroundColor: '#1B5E20',
  },
});