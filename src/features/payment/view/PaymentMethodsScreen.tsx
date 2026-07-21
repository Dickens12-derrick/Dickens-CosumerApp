// features/payment/view/PaymentMethodsScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
} from 'react-native';
import { usePaymentMethodsViewModel } from '../viewmodel/usePaymentMethodsViewModel';
import { getUiIcon } from '../../../utils/imageMapping';

export default function PaymentMethodsScreen() {
  const {
    paymentMethods,
    selectedId,
    onSelectMethod,
    onAddMethod,
    onBack,
  } = usePaymentMethodsViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} hitSlop={10} style={styles.backButton}>
          <Text style={styles.backText}>←</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {paymentMethods.map((method) => {
          const isSelected = method.id === selectedId;
          return (
            <Pressable
              key={method.id}
              style={[styles.paymentCard, isSelected && styles.paymentCardSelected]}
              onPress={() => onSelectMethod(method.id)}
            >
              <View style={styles.paymentLeft}>
                <Image source={getUiIcon(method.icon)} style={styles.paymentIcon} />
                <View style={styles.paymentInfo}>
                  <Text style={[styles.paymentName, isSelected && styles.paymentNameSelected]}>
                    {method.name}
                  </Text>
                  <Text style={styles.paymentDescription}>{method.description}</Text>
                  {method.details && (
                    <Text style={styles.paymentDetails}>{method.details}</Text>
                  )}
                </View>
              </View>
              <View style={[styles.radio, isSelected && styles.radioSelected]}>
                {isSelected && <View style={styles.radioInner} />}
              </View>
            </Pressable>
          );
        })}

        <Pressable style={styles.addButton} onPress={onAddMethod}>
          <Text style={styles.addButtonText}>+ Add New Payment Method</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#1B5E20',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
    gap: 12,
  },
  paymentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E8F5E9',
    backgroundColor: '#FFFFFF',
  },
  paymentCardSelected: {
    borderColor: '#1B5E20',
    backgroundColor: '#F6FBF6',
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    flex: 1,
  },
  paymentIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  paymentNameSelected: {
    color: '#1B5E20',
  },
  paymentDescription: {
    fontSize: 12,
    color: '#666666',
    marginTop: 2,
  },
  paymentDetails: {
    fontSize: 11,
    color: '#9E9E9E',
    marginTop: 2,
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioSelected: {
    borderColor: '#1B5E20',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1B5E20',
  },
  addButton: {
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#1B5E20',
    borderStyle: 'dashed',
    alignItems: 'center',
    backgroundColor: '#F6FBF6',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B5E20',
  },
});