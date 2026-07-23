// features/onboarding/view/OtpVerificationScreen.tsx
import React, { useRef, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet, ActivityIndicator, TextInput, Image } from 'react-native';
import { useOtpVerificationViewModel } from '../viewmodel/useOtpVerificationViewModel';
import OtpDigitInput from './components/OtpDigitInput';
import { getUiIcon } from '../../../utils/imageMapping';

export default function OtpVerificationScreen() {
  const {
    phone,
    digits,
    isVerifying,
    errorMessage,
    canVerify,
    secondsUntilResend,
    canResend,
    onChangeDigit,
    onVerify,
    onResend,
    onBack,
  } = useOtpVerificationViewModel();

  // Local-only refs for moving focus between boxes — pure UI mechanics,
  // not business state, so this stays in the View by design.
  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleChange = (index: number, value: string) => {
    onChangeDigit(index, value);
    if (value && index < digits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
        <Text style={styles.backText}>{'< Back'}</Text>
      </Pressable>

      <View style={styles.iconWrap}>
        <Image source={getUiIcon('message')} style={styles.icon} />
      </View>

      <Text style={styles.title}>Verify Your Number</Text>
      <Text style={styles.subtitle}>Code sent to {phone}</Text>

      <View style={styles.otpRow}>
        {digits.map((digit, index) => (
          <OtpDigitInput
            key={index}
            ref={(el: TextInput | null) => { inputRefs.current[index] = el; return undefined; }}
            value={digit}
            onChangeText={(value) => handleChange(index, value)}
            onKeyPress={({ nativeEvent }) => handleKeyPress(index, nativeEvent.key)}
          />
        ))}
      </View>

      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Pressable
        style={[styles.submitButton, !canVerify && styles.submitButtonDisabled]}
        onPress={onVerify}
        disabled={!canVerify || isVerifying}
      >
        {isVerifying ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.submitButtonText}>Verify</Text>}
      </Pressable>

      <Pressable onPress={onResend} disabled={!canResend} hitSlop={10} style={styles.resendWrap}>
        <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
          {canResend ? 'Resend code' : `Resend code in ${secondsUntilResend}s`}
        </Text>
      </Pressable>

      <View style={styles.progressRow}>
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={[styles.progressDot, styles.progressDotActive]} />
        <View style={styles.progressDot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', paddingHorizontal: 24, paddingTop: 60 },
  backButton: { marginBottom: 8 },
  backText: { fontSize: 14, fontWeight: '600', color: '#1B5E20' },
  iconWrap: {
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  icon: { width: 28, height: 28, borderRadius: 6 },
  title: { fontSize: 22, fontWeight: '800', color: '#1B1B1B', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginTop: 4, marginBottom: 28 },
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  errorText: { color: '#D32F2F', fontSize: 13, textAlign: 'center', marginBottom: 8 },
  submitButton: { backgroundColor: '#1B5E20', borderRadius: 14, paddingVertical: 16, alignItems: 'center' },
  submitButtonDisabled: { backgroundColor: '#A5D6A7' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  resendWrap: { marginTop: 18, alignItems: 'center' },
  resendText: { fontSize: 13, fontWeight: '600', color: '#1B5E20', textDecorationLine: 'underline' },
  resendTextDisabled: { color: '#9E9E9E', textDecorationLine: 'none' },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 32 },
  progressDot: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0' },
  progressDotActive: { backgroundColor: '#1B5E20' },
});