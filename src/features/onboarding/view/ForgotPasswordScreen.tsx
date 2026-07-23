// features/onboarding/view/ForgotPasswordScreen.tsx
import React, { useRef, useCallback } from 'react';
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
import { useForgotPasswordViewModel } from '../viewmodel/useForgotPasswordViewModel';
import AuthTextField from './components/AuthTextField';
import OtpDigitInput from './components/OtpDigitInput';
import { getUiIcon } from '../../../utils/imageMapping';

export default function ForgotPasswordScreen() {
  const {
    step,
    phone,
    otpDigits,
    newPassword,
    confirmPassword,
    isSecureEntry,
    isSubmitting,
    errorMessage,
    secondsUntilResend,
    canResend,
    canProceed,
    onChangePhone,
    onChangeOtpDigit,
    onChangeNewPassword,
    onChangeConfirmPassword,
    onToggleSecureEntry,
    onSendCode,
    onVerifyOtp,
    onResetPassword,
    onResendCode,
    onBack,
  } = useForgotPasswordViewModel();

  const inputRefs = useRef<Array<TextInput | null>>([]);

  const handleOtpChange = (index: number, value: string) => {
    onChangeOtpDigit(index, value);
    if (value && index < otpDigits.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyPress = (index: number, key: string) => {
    if (key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}> {'< Back'}</Text>
        </Pressable>

        {/* Step indicator */}
        <View style={styles.stepIndicator}>
          <View style={[styles.stepDot, styles.stepDotActive]} />
          <View style={[styles.stepLine, step !== 'phone' && styles.stepLineActive]} />
          <View style={[styles.stepDot, step === 'otp' || step === 'reset' ? styles.stepDotActive : styles.stepDotInactive]} />
          <View style={[styles.stepLine, step === 'reset' && styles.stepLineActive]} />
          <View style={[styles.stepDot, step === 'reset' ? styles.stepDotActive : styles.stepDotInactive]} />
        </View>

        {step === 'phone' && (
          <>
            <View style={styles.iconWrap}>
              <Image source={getUiIcon('phone')} style={styles.icon} />
            </View>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Enter your phone number to receive a reset code</Text>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.inputRow}>
              <View style={styles.codeBadge}>
                <Text style={styles.codeText}>+256</Text>
              </View>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={onChangePhone}
                placeholder="7XX XXX XXX"
                placeholderTextColor="#9E9E9E"
                keyboardType="number-pad"
                maxLength={9}
              />
            </View>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <Pressable
              style={[styles.submitButton, !canProceed && styles.submitButtonDisabled]}
              onPress={onSendCode}
              disabled={!canProceed}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Send Code →</Text>
              )}
            </Pressable>
          </>
        )}

        {step === 'otp' && (
          <>
            <View style={styles.iconWrap}>
              <Image source={getUiIcon('message')} style={styles.icon} />
            </View>
            <Text style={styles.title}>Verify Code</Text>
            <Text style={styles.subtitle}>Code sent to +256 {phone}</Text>

            <View style={styles.otpRow}>
              {otpDigits.map((digit, index) => (
                <OtpDigitInput
                  key={index}
                  ref={(el: TextInput | null) => { inputRefs.current[index] = el; return undefined; }}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(index, value)}
                  onKeyPress={({ nativeEvent }) => handleOtpKeyPress(index, nativeEvent.key)}
                />
              ))}
            </View>

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <Pressable
              style={[styles.submitButton, !canProceed && styles.submitButtonDisabled]}
              onPress={onVerifyOtp}
              disabled={!canProceed}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Verify →</Text>
              )}
            </Pressable>

            <Pressable onPress={onResendCode} disabled={!canResend} hitSlop={10} style={styles.resendWrap}>
              <Text style={[styles.resendText, !canResend && styles.resendTextDisabled]}>
                {canResend ? 'Resend code' : `Resend code in ${secondsUntilResend}s`}
              </Text>
            </Pressable>
          </>
        )}

        {step === 'reset' && (
          <>
            <View style={styles.iconWrap}>
              <Image source={getUiIcon('lock')} style={styles.icon} />
            </View>
            <Text style={styles.title}>Set New Password</Text>
            <Text style={styles.subtitle}>Choose a strong password for your account</Text>

            <AuthTextField
              label="New Password"
              value={newPassword}
              placeholder="At least 6 characters"
              onChangeText={onChangeNewPassword}
              isPasswordField
              isSecureEntry={isSecureEntry}
              onToggleSecureEntry={onToggleSecureEntry}
            />

            <AuthTextField
              label="Confirm Password"
              value={confirmPassword}
              placeholder="Re-enter your password"
              onChangeText={onChangeConfirmPassword}
              isPasswordField
              isSecureEntry={isSecureEntry}
              onToggleSecureEntry={onToggleSecureEntry}
            />

            {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

            <Pressable
              style={[styles.submitButton, !canProceed && styles.submitButtonDisabled]}
              onPress={onResetPassword}
              disabled={!canProceed}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.submitButtonText}>Reset Password</Text>
              )}
            </Pressable>
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 60, paddingBottom: 40 },
  backButton: { marginBottom: 16 },
  backText: { fontSize: 14, fontWeight: '600', color: '#1B5E20' },
  // --- Step Indicator ---
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 0,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stepDotActive: {
    backgroundColor: '#1B5E20',
  },
  stepDotInactive: {
    backgroundColor: '#E0E0E0',
  },
  stepLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 4,
  },
  stepLineActive: {
    backgroundColor: '#1B5E20',
  },
  // --- Common ---
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
  subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginTop: 4, marginBottom: 28 },
  // --- Phone Input ---
  label: { fontSize: 13, fontWeight: '600', color: '#1B5E20', marginBottom: 6 },
  inputRow: { flexDirection: 'row', gap: 10 },
  codeBadge: {
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  codeText: { fontSize: 15, fontWeight: '600', color: '#1B1B1B' },
  input: {
    flex: 1,
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1B1B1B',
  },
  // --- OTP ---
  otpRow: { flexDirection: 'row', justifyContent: 'center', gap: 8, marginBottom: 20 },
  // --- Error ---
  errorText: { color: '#D32F2F', fontSize: 13, textAlign: 'center', marginTop: 12, marginBottom: 4 },
  // --- Submit ---
  submitButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  submitButtonDisabled: { backgroundColor: '#A5D6A7' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  // --- Resend ---
  resendWrap: { marginTop: 18, alignItems: 'center' },
  resendText: { fontSize: 13, fontWeight: '600', color: '#1B5E20', textDecorationLine: 'underline' },
  resendTextDisabled: { color: '#9E9E9E', textDecorationLine: 'none' },
});