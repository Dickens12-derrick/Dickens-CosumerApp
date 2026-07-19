// features/onboarding/view/PhoneEntryScreen.tsx
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
  Image,
} from 'react-native';
import { usePhoneEntryViewModel } from '../viewmodel/usePhoneEntryViewModel';
import { getUiIcon } from '../../../utils/imageMapping';

export default function PhoneEntryScreen() {
  const {
    phoneNumber,
    countryCode,
    isValid,
    isSubmitting,
    errorMessage,
    onChangePhone,
    onSendCode,
    onBack,
  } = usePhoneEntryViewModel();

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.container}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>

        <View style={styles.iconWrap}>
          <Image source={getUiIcon('phone')} style={styles.icon} />
        </View>

        <Text style={styles.title}>Let's get you shopping</Text>
        <Text style={styles.subtitle}>Just your number — that's it</Text>

        <Text style={styles.label}>Phone Number</Text>
        <View style={styles.inputRow}>
          <View style={styles.codeBadge}>
            <Text style={styles.codeText}>{countryCode}</Text>
          </View>
          <TextInput
            style={styles.input}
            value={phoneNumber}
            onChangeText={onChangePhone}
            placeholder="7XX XXX XXX"
            placeholderTextColor="#9E9E9E"
            keyboardType="number-pad"
            maxLength={9}
          />
        </View>

        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        <View style={styles.noticeBox}>
          <Text style={styles.noticeText}>
            ℹ️ No National ID needed — that's only for farmers and sellers
          </Text>
        </View>

        <Pressable
          style={[styles.submitButton, !isValid && styles.submitButtonDisabled]}
          onPress={onSendCode}
          disabled={!isValid || isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.submitButtonText}>Send Code →</Text>
          )}
        </Pressable>

        <View style={styles.progressRow}>
          <View style={[styles.progressDot, styles.progressDotActive]} />
          <View style={styles.progressDot} />
          <View style={styles.progressDot} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
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
  subtitle: { fontSize: 14, color: '#666666', textAlign: 'center', marginTop: 4, marginBottom: 32 },
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
  errorText: { color: '#D32F2F', fontSize: 13, marginTop: 8 },
  noticeBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    padding: 12,
    marginTop: 16,
  },
  noticeText: { fontSize: 12, color: '#1565C0' },
  submitButton: {
    backgroundColor: '#1B5E20',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 28,
  },
  submitButtonDisabled: { backgroundColor: '#A5D6A7' },
  submitButtonText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },
  progressRow: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginTop: 24 },
  progressDot: { width: 20, height: 4, borderRadius: 2, backgroundColor: '#E0E0E0' },
  progressDotActive: { backgroundColor: '#1B5E20' },
});