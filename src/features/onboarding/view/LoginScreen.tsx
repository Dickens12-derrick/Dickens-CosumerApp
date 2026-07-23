// features/onboarding/view/LoginScreen.tsx
import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useLoginViewModel } from '../viewmodel/useLoginViewModel';
import AuthTextField from './components/AuthTextField';

export default function LoginScreen() {
  const {
    phone,
    password,
    isSecureEntry,
    isSubmitting,
    errorMessage,
    canSubmit,
    onChangePhone,
    onChangePassword,
    onToggleSecureEntry,
    onSubmit,
    onForgotPassword,
    onBack,
  } = useLoginViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>{'< Back'} </Text>
        </Pressable>

        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Log in to continue shopping fresh produce</Text>

        <View style={styles.form}>
          <AuthTextField
            label="Phone number"
            value={phone}
            placeholder="e.g. 0700 123 456"
            onChangeText={onChangePhone}
            keyboardType="phone-pad"
          />

          <AuthTextField
            label="Password"
            value={password}
            placeholder="Enter your password"
            onChangeText={onChangePassword}
            isPasswordField
            isSecureEntry={isSecureEntry}
            onToggleSecureEntry={onToggleSecureEntry}
          />

          {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

          <Pressable onPress={onForgotPassword} hitSlop={10}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Pressable>

          <Pressable
            style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
            onPress={onSubmit}
            disabled={!canSubmit}
          >
            {isSubmitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Log In</Text>
            )}
          </Pressable>
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
    paddingTop: 60,
    paddingBottom: 40,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B1B1B',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    marginBottom: 32,
  },
  form: {
    flex: 1,
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 13,
    marginBottom: 12,
    marginTop: -4,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
    textAlign: 'right',
    marginBottom: 28,
  },
  submitButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#A5D6A7',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});
