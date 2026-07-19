// features/onboarding/view/components/AuthTextField.tsx
import React from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

interface AuthTextFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText: (text: string) => void;
  keyboardType?: 'default' | 'phone-pad' | 'email-address' | 'numeric' | 'number-pad';
  isPasswordField?: boolean;
  isSecureEntry?: boolean;
  onToggleSecureEntry?: () => void;
}

export default function AuthTextField({
  label,
  value,
  placeholder,
  onChangeText,
  keyboardType = 'default',
  isPasswordField = false,
  isSecureEntry = true,
  onToggleSecureEntry,
}: AuthTextFieldProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#9E9E9E"
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={isPasswordField ? isSecureEntry : false}
          autoCapitalize={isPasswordField ? 'none' : 'sentences'}
          autoCorrect={false}
        />
        {isPasswordField && (
          <Pressable onPress={onToggleSecureEntry} hitSlop={12} style={styles.toggle}>
            <Text style={styles.toggleText}>{isSecureEntry ? 'Show' : 'Hide'}</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 8,
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#C8E6C9',
    borderRadius: 12,
    backgroundColor: '#F6FBF6',
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: '#1B1B1B',
  },
  toggle: {
    paddingVertical: 6,
    paddingLeft: 10,
  },
  toggleText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2E7D32',
  },
});
