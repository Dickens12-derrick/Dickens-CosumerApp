// features/orders/view/OrdersScreen.tsx
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import { useOrdersViewModel, OrderStatus } from '../viewmodel/useOrdersViewModel';
import { getProductImage, getUiIcon } from '../../../utils/imageMapping';

const FILTERS: { key: OrderStatus | 'all'; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'out_for_delivery', label: 'Active' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'cancelled', label: 'Cancelled' },
];

function getStatusStyle(status: OrderStatus) {
  switch (status) {
    case 'pending': return styles.status_pending;
    case 'confirmed': return styles.status_confirmed;
    case 'out_for_delivery': return styles.status_out_for_delivery;
    case 'delivered': return styles.status_delivered;
    case 'cancelled': return styles.status_cancelled;
  }
}

export default function OrdersScreen() {
  const {
    orders,
    activeFilter,
    onFilterChange,
    onOrderPress,
    onBack,
    onForward,
    getStatusLabel,
    getStatusIcon,
  } = useOrdersViewModel();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable
          onPress={onBack}
          hitSlop={10}
          style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}
        >
          <Text style={styles.navText}>‹ Go back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>My Orders</Text>
        <Pressable
          onPress={onForward}
          hitSlop={10}
          style={({ pressed }) => [styles.navButton, pressed && styles.navButtonPressed]}
        >
          <Text style={styles.navText}>Forward ›</Text>
        </Pressable>
      </View>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((filter) => {
          const isActive = filter.key === activeFilter;
          return (
            <Pressable
              key={filter.key}
              style={({ pressed }) => [
                styles.filterChip,
                isActive ? styles.filterChipActive : styles.filterChipInactive,
                pressed && styles.chipPressed,
              ]}
              onPress={() => onFilterChange(filter.key)}
            >
              <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
                {filter.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Orders list */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {orders.length === 0 ? (
          <View style={styles.emptyState}>
            <Image source={getUiIcon('package')} style={styles.emptyIcon} />
            <Text style={styles.emptyTitle}>No orders found</Text>
            <Text style={styles.emptySubtitle}>
              {activeFilter === 'all'
                ? 'Place your first order to see it here'
                : 'No orders match this filter'}
            </Text>
          </View>
        ) : (
          orders.map((order) => (
            <Pressable
              key={order.id}
              style={({ pressed }) => [styles.orderCard, pressed && styles.cardPressed]}
              onPress={() => onOrderPress(order)}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderNumberRow}>
                  <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  <View style={[styles.statusBadge, getStatusStyle(order.status)]}>
                    <Text style={styles.statusIcon}>{getStatusIcon(order.status)}</Text>
                    <Text style={styles.statusText}>{getStatusLabel(order.status)}</Text>
                  </View>
                </View>
                <Text style={styles.orderDate}>{order.placedAt}</Text>
              </View>

              <View style={styles.orderItems}>
                {order.items.slice(0, 3).map((item) => (
                  <View key={item.id} style={styles.orderItemRow}>
                    <Image
                      source={getProductImage(item.name, item.category)}
                      style={styles.orderItemImage}
                    />
                    <Text style={styles.orderItemName} numberOfLines={1}>
                      {item.name} x{item.quantity}
                    </Text>
                  </View>
                ))}
                {order.items.length > 3 && (
                  <Text style={styles.moreItems}>+{order.items.length - 3} more items</Text>
                )}
              </View>

              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>
                  UGX {order.total.toLocaleString()}
                </Text>
                <Text style={styles.orderArrow}>›</Text>
              </View>
            </Pressable>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  // --- Header ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 16,
    backgroundColor: '#1B5E20',
  },
  navButton: {
    minWidth: 86,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navButtonPressed: {
    opacity: 0.75,
    transform: [{ scale: 0.97 }],
  },
  navText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  // --- Filters ---
  filterRow: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    marginRight: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  filterChipInactive: {
    borderColor: '#C8E6C9',
    backgroundColor: 'transparent',
  },
  filterChipActive: {
    backgroundColor: '#1B5E20',
    borderColor: '#1B5E20',
  },
  chipPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.97 }],
  },
  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  // --- Scroll ---
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    gap: 12,
  },
  // --- Empty State ---
  emptyState: {
    alignItems: 'center',
    paddingTop: 60,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    textAlign: 'center',
  },
  // --- Order Card ---
  orderCard: {
    backgroundColor: '#F6FBF6',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8F5E9',
    overflow: 'hidden',
  },
  cardPressed: {
    opacity: 0.86,
    transform: [{ scale: 0.98 }],
  },
  orderHeader: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9',
  },
  orderNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B1B1B',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  status_pending: {
    backgroundColor: '#FFF3E0',
  },
  status_confirmed: {
    backgroundColor: '#E8F5E9',
  },
  status_out_for_delivery: {
    backgroundColor: '#E3F2FD',
  },
  status_delivered: {
    backgroundColor: '#E8F5E9',
  },
  status_cancelled: {
    backgroundColor: '#FFEBEE',
  },
  statusIcon: {
    fontSize: 11,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1B1B1B',
  },
  orderDate: {
    fontSize: 12,
    color: '#666666',
    marginTop: 4,
  },
  // --- Items ---
  orderItems: {
    padding: 14,
    gap: 6,
  },
  orderItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderItemImage: {
    width: 22,
    height: 22,
    borderRadius: 4,
  },
  orderItemName: {
    fontSize: 13,
    color: '#444444',
    flex: 1,
  },
  moreItems: {
    fontSize: 12,
    color: '#2E7D32',
    fontWeight: '600',
  },
  // --- Footer ---
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#E8F5E9',
    backgroundColor: '#FFFFFF',
  },
  orderTotal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B5E20',
  },
  orderArrow: {
    fontSize: 20,
    color: '#C8E6C9',
    fontWeight: '700',
  },
});
