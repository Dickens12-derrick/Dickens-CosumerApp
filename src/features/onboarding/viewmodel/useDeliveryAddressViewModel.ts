// features/onboarding/viewmodel/useDeliveryAddressViewModel.ts
import { useState, useCallback } from 'react';
import { router } from 'expo-router';

export type AddressLabel = 'Home' | 'Work' | 'Other';

const LABELS: AddressLabel[] = ['Home', 'Work', 'Other'];

export interface UseDeliveryAddressViewModelReturn {
  labels: AddressLabel[];
  selectedLabel: AddressLabel;
  landmark: string;
  isLocating: boolean;
  hasPickedLocation: boolean;
  onSelectLabel: (label: AddressLabel) => void;
  onChangeLandmark: (value: string) => void;
  onUseCurrentLocation: () => void;
  onSaveAddress: () => void;
  onSkip: () => void;
}

export function useDeliveryAddressViewModel(): UseDeliveryAddressViewModelReturn {
  const [selectedLabel, setSelectedLabel] = useState<AddressLabel>('Home');
  const [landmark, setLandmark] = useState('');
  const [isLocating, setIsLocating] = useState(false);
  const [locationPickedState, setLocationPickedState] = useState(false);

  const hasPickedLocation = landmark.trim().length > 0 || locationPickedState;

  const onSelectLabel = useCallback((label: AddressLabel) => {
    setSelectedLabel(label);
  }, []);

  const onChangeLandmark = useCallback((value: string) => {
    setLandmark(value);
  }, []);

  const onUseCurrentLocation = useCallback(async () => {
    setIsLocating(true);
    try {
      // TODO: request permission + read coordinates via expo-location:
      // const { status } = await Location.requestForegroundPermissionsAsync();
      // const position = await Location.getCurrentPositionAsync({});
      await new Promise((resolve) => setTimeout(resolve, 600));
      setLocationPickedState(true);
    } finally {
      setIsLocating(false);
    }
  }, []);

  const onSaveAddress = useCallback(() => {
    // TODO: persist { selectedLabel, landmark, coordinates } to backend/local store.
    router.push('/onboarding/preferences');
  }, []);

  const onSkip = useCallback(() => {
    router.push('/onboarding/preferences');
  }, []);

  return {
    labels: LABELS,
    selectedLabel,
    landmark,
    isLocating,
    hasPickedLocation,
    onSelectLabel,
    onChangeLandmark,
    onUseCurrentLocation,
    onSaveAddress,
    onSkip,
  };
}