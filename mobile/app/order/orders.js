import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getMyOrders } from '../../services/orderService';

export default function OrdersScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('All Orders');
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      const list = data.orders || data || [];
      setOrders(Array.isArray(list) ? list : []);
    } catch (err) {
      console.log('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const activeCount = orders.filter((o) =>
    ['PENDING', 'PREPARING', 'READY'].includes(o.status?.toUpperCase())
  ).length;

  const filteredOrders = orders.filter((order) => {
    const s = (order.status || '').toUpperCase();
    if (selectedFilter.startsWith('Active')) {
      return ['PENDING', 'PREPARING', 'READY'].includes(s);
    }
    if (selectedFilter === 'Completed') {
      return s === 'DELIVERED';
    }
    if (selectedFilter === 'Cancelled') {
      return s === 'CANCELLED';
    }
    return true;
  });

  const formatOrder = (order) => {
    const status = (order.status || 'PENDING').toUpperCase();
    let statusColor = '#FF6B00';
    let statusBg = '#2A1A10';
    let type = 'preparing';

    if (status === 'READY') {
      statusColor = '#00A3FF';
      statusBg = '#102230';
      type = 'ready';
    } else if (status === 'DELIVERED') {
      statusColor = '#A0A0A0';
      statusBg = '#222222';
      type = 'delivered_rate';
    } else if (status === 'CANCELLED') {
      statusColor = '#FF4D4D';
      statusBg = '#3D1B1B';
      type = 'cancelled';
    }

    const firstItem = order.items?.[0]?.menuItem;
    const title = firstItem?.name || `Order #${order.id?.slice(-5) || '1'}`;
    const itemCount = order.items?.length || 1;
    const subtitle = itemCount > 1 ? `${firstItem?.name || 'Item'} +${itemCount - 1} more • ${itemCount} items` : `${itemCount} item`;
    const price = `$${Number(order.totalPrice || 0).toFixed(2)}`;
    const time = order.createdAt
      ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      : 'Today';

    return {
      rawId: order.id,
      displayId: `#SM-${(order.id || '').slice(-5).toUpperCase()}`,
      time,
      status,
      statusColor,
      statusBg,
      title,
      subtitle,
      price,
      table: 'Table #04 • Dine-in',
      image: firstItem?.image || null,
      progressStep: status === 'PREPARING' ? 'On the grill & assembling' : 'Order received & queued',
      timeLeft: status === 'PREPARING' ? '~7 mins left' : '~15 mins left',
      type,
    };
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <TouchableOpacity style={styles.notificationBtn} onPress={loadOrders}>
          <Ionicons name="reload-outline" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Filter Chips Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {['All Orders', `Active (${activeCount})`, 'Completed', 'Cancelled'].map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterChip, selectedFilter === filter && styles.activeFilterChip]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[styles.filterText, selectedFilter === filter && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {loading ? (
        <ActivityIndicator size="large" color="#FF6B00" style={{ marginVertical: 40 }} />
      ) : filteredOrders.length === 0 ? (
        <View style={{ alignItems: 'center', marginVertical: 40 }}>
          <Ionicons name="receipt-outline" size={48} color="#444" style={{ marginBottom: 10 }} />
          <Text style={{ color: '#888', fontSize: 15 }}>No orders found</Text>
          <TouchableOpacity
            style={{ marginTop: 15, backgroundColor: '#FF6B00', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 }}
            onPress={() => router.push('/(tabs)/home')}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold' }}>Order Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        filteredOrders.map((rawOrder) => {
          const order = formatOrder(rawOrder);
          return (
            <View key={order.rawId} style={styles.orderCard}>
              {/* Top Info Header */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderLeft}>
                  <Text style={styles.orderId}>{order.displayId}</Text>
                  <Text style={styles.dotSeparator}>•</Text>
                  <Text style={styles.orderTime}>{order.time}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: order.statusBg }]}>
                  <View style={[styles.statusDot, { backgroundColor: order.statusColor }]} />
                  <Text style={[styles.statusText, { color: order.statusColor }]}>{order.status}</Text>
                </View>
              </View>

              {/* Item Details */}
              <View style={styles.itemMainRow}>
                <View style={styles.imagePlaceholder}>
                  {order.image ? (
                    <Image 
                      source={typeof order.image === 'string' ? { uri: order.image } : order.image} 
                      style={styles.itemImg} 
                      resizeMode="cover" 
                    />
                  ) : (
                    <Ionicons name="fast-food-outline" size={24} color="#555" />
                  )}
                </View>

                <View style={styles.itemInfo}>
                  <Text style={styles.itemTitle}>{order.title}</Text>
                  <Text style={styles.itemSubtitle}>{order.subtitle}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.priceText}>{order.price}</Text>
                    <Text style={styles.tableText}> • {order.table}</Text>
                  </View>
                </View>
              </View>

              {/* Preparing Progress Bar */}
              {order.type === 'preparing' && (
                <View style={styles.progressContainer}>
                  <View style={styles.progressHeader}>
                    <View style={styles.progressStatusLeft}>
                      <MaterialCommunityIcons name="silverware-fork-knife" size={14} color="#FF6B00" />
                      <Text style={styles.progressStatusText}>{order.progressStep}</Text>
                    </View>
                    <Text style={styles.timeLeftText}>{order.timeLeft}</Text>
                  </View>
                  <View style={styles.progressBarBackground}>
                    <View style={styles.progressBarFill} />
                  </View>
                </View>
              )}

              {/* Action Buttons depending on status */}
              <View style={styles.actionsRow}>
                {order.type === 'preparing' && (
                  <>
                    <TouchableOpacity style={styles.trackBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                      <Ionicons name="navigate-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.trackBtnText}>Track Order</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.receiptBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                      <Ionicons name="receipt-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.receiptBtnText}>Receipt</Text>
                    </TouchableOpacity>
                  </>
                )}

                {order.type === 'ready' && (
                  <>
                    <TouchableOpacity style={styles.qrBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                      <Ionicons name="qr-code-outline" size={16} color="#00A3FF" style={{ marginRight: 6 }} />
                      <Text style={styles.qrBtnText}>View QR Code</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryDetailsBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                      <Text style={styles.secondaryDetailsText}>Details</Text>
                    </TouchableOpacity>
                  </>
                )}

                {order.type === 'delivered_rate' && (
                  <>
                    <TouchableOpacity style={styles.secondaryActionBtn} onPress={() => router.push('/(tabs)/home')}>
                      <Ionicons name="reload-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.secondaryActionText}>Reorder</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.secondaryActionBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                      <Ionicons name="star-outline" size={16} color="#FFF" style={{ marginRight: 6 }} />
                      <Text style={styles.secondaryActionText}>Rate</Text>
                    </TouchableOpacity>
                  </>
                )}

                {order.type !== 'preparing' && order.type !== 'ready' && order.type !== 'delivered_rate' && (
                  <TouchableOpacity style={styles.secondaryActionBtn} onPress={() => router.push(`/order/${order.rawId}`)}>
                    <Text style={styles.secondaryActionText}>Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })
      )}

      {/* Bottom Footer Text */}
      <Text style={styles.footerNote}>Past 30 days of dine-in & takeaway</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterRow: {
    gap: 8,
    marginBottom: 20,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#1B1B1B',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  activeFilterChip: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  filterText: {
    color: '#888',
    fontSize: 13,
    fontWeight: '600',
  },
  activeFilterText: {
    color: '#FFF',
  },
  orderCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  orderId: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  dotSeparator: {
    color: '#555',
  },
  orderTime: {
    color: '#777',
    fontSize: 12,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  itemMainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  imagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    overflow: 'hidden',
  },
  itemImg: {
    width: '100%',
    height: '100%',
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemSubtitle: {
    color: '#777',
    fontSize: 11,
    marginBottom: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  tableText: {
    color: '#FF6B00',
    fontSize: 11,
    fontWeight: '500',
  },
  progressContainer: {
    backgroundColor: '#161616',
    padding: 10,
    borderRadius: 12,
    marginBottom: 14,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  progressStatusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  progressStatusText: {
    color: '#FF6B00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  timeLeftText: {
    color: '#888',
    fontSize: 11,
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: '#333',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    width: '65%',
    height: '100%',
    backgroundColor: '#FF6B00',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  trackBtn: {
    flex: 1.5,
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
  },
  trackBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  receiptBtn: {
    flex: 1,
    backgroundColor: '#252525',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  receiptBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  qrBtn: {
    flex: 1.5,
    backgroundColor: '#102230',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#00A3FF',
  },
  qrBtnText: {
    color: '#00A3FF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  secondaryDetailsBtn: {
    flex: 1,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  secondaryDetailsText: {
    color: '#CCC',
    fontSize: 13,
    fontWeight: 'bold',
  },
  secondaryActionBtn: {
    flex: 1,
    backgroundColor: '#252525',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#333',
  },
  secondaryActionText: {
    color: '#CCC',
    fontSize: 13,
    fontWeight: 'bold',
  },
  footerNote: {
    textAlign: 'center',
    color: '#555',
    fontSize: 11,
    marginTop: 10,
  },
});