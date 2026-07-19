// features/onboarding/view/components/OtpDigitInput.tsx
import React, { forwardRef } from 'react';
import { TextInput, StyleSheet, NativeSyntheticEvent, TextInputKeyPressEventData } from 'react-native';

interface OtpDigitInputProps {
  value: string;
  onChangeText: (value: string) => void;
  onKeyPress?: (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => void;
}

const OtpDigitInput = forwardRef<TextInput, OtpDigitInputProps>(
  ({ value, onChangeText, onKeyPress }, ref) => {
    return (
      <TextInput
        ref={ref}
        style={styles.box}
        value={value}
        onChangeText={onChangeText}
        onKeyPress={onKeyPress}
        keyboardType="number-pad"
        maxLength={1}
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />
    );
  }
);

export default OtpDigitInput;

const styles = StyleSheet.create({
  box: {
    width: 46,
    height: 56,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#1B1B1B',
  },
});