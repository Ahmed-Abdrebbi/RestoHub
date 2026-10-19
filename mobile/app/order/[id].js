import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { getOrderById } from '../../services/orderService';

export default function OrderTrackingScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (id) {
      fetchOrder();
    }
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const data = await getOrderById(id);
      setOrder(data);
    } catch (err) {
      console.log('Failed to fetch order details:', err);
    } finally {
      setLoading(false);
    }
  };

  const status = (order?.status || 'PREPARING').toUpperCase();

  const journeySteps = [
    {
      id: 1,
      title: 'Order Received',
      time: order?.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '7:38 PM',
      subtitle: 'Order confirmed & dispatched to the kitchen queue',
      icon: 'checkmark',
      completed: true,
      active: status === 'PENDING',
    },
    {
      id: 2,
      title: 'In the Kitchen',
      time: status === 'PREPARING' ? 'Active' : 'Completed',
      subtitle: 'Chef is searing burgers and baking gourmet sides',
      icon: 'restaurant',
      completed: ['READY', 'DELIVERED'].includes(status),
      active: status === 'PREPARING',
    },
    {
      id: 3,
      title: 'Ready for Table',
      time: status === 'READY' ? 'Ready Now' : '~15 min',
      subtitle: 'Final seasoning, plating, and quality presentation',
      icon: 'cube-outline',
      completed: status === 'DELIVERED',
      active: status === 'READY',
    },
    {
      id: 4,
      title: 'Served & Enjoy',
      time: status === 'DELIVERED' ? 'Delivered' : '~20 min',
      subtitle: 'Delivered piping hot straight to Table #04',
      icon: 'fast-food-outline',
      completed: status === 'DELIVERED',
      active: status === 'DELIVERED',
    },
  ];

  const items = order?.items && order.items.length > 0 ? order.items : [];
  const totalPrice = Number(order?.totalPrice || 24.79).toFixed(2);
  const tax = (Number(order?.totalPrice || 24.79) * 0.08).toFixed(2);
  const subtotal = Math.max(0, Number(totalPrice) - Number(tax) - 0.50).toFixed(2);
  const displayId = `#SM-${(id || '1234').slice(-5).toUpperCase()}`;

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order {displayId}</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.receiptHeaderBtn} onPress={fetchOrder}>
            <Ionicons name="reload-outline" size={18} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Status Banner */}
      <View style={styles.statusBanner}>
        <View style={styles.statusBannerHeader}>
          <View style={styles.activeOrderBadge}>
            <Text style={styles.activeOrderText}>{status}</Text>
          </View>
          <Text style={styles.orderIdHeader}>{displayId}</Text>
          <View style={styles.timeEstBadge}>
            <Ionicons name="time-outline" size={12} color="#FF6B00" />
            <Text style={styles.timeEstText}>15–20 min</Text>
          </View>
        </View>

        <Text style={styles.statusMainTitle}>
          {status === 'DELIVERED'
            ? 'Delivered & Served'
            : status === 'READY'
            ? 'Ready to Serve'
            : status === 'PREPARING'
            ? 'Grilling in Progress'
            : 'Order Received'}
        </Text>
        <Text style={styles.statusSubTitle}>Placed {order?.createdAt ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'} • Table #04</Text>

        <View style={styles.statusInfoBox}>
          <View style={styles.panIconCircle}>
            <MaterialCommunityIcons name="skillet" size={18} color="#FF6B00" />
          </View>
          <Text style={styles.statusInfoText}>
            Your food is being crafted with fresh fire-grilled ingredients and artisan bread!
          </Text>
        </View>
      </View>

      {/* Order Journey Timeline Section */}
      <View style={styles.journeyCard}>
        <View style={styles.journeyHeader}>
          <Text style={styles.journeyTitle}>Order Journey</Text>
          <Text style={styles.liveTrackingText}>LIVE TRACKING</Text>
        </View>

        {journeySteps.map((step, index) => (
          <View key={step.id} style={styles.timelineRow}>
            {/* Timeline Line & Dot Indicator */}
            <View style={styles.timelineIndicatorContainer}>
              <View
                style={[
                  styles.iconNode,
                  step.completed && styles.nodeCompleted,
                  step.active && styles.nodeActive,
                  !step.completed && !step.active && styles.nodeInactive,
                ]}
              >
                <Ionicons
                  name={step.icon}
                  size={14}
                  color={step.completed || step.active ? '#FFF' : '#666'}
                />
              </View>

              {index !== journeySteps.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    (step.completed || step.active) && styles.timelineLineActive,
                  ]}
                />
              )}
            </View>

            {/* Timeline Step Content */}
            <View style={styles.timelineContent}>
              <View style={styles.stepTitleRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                  <Text style={[styles.stepTitle, step.active && styles.activeStepTitleText]}>
                    {step.title}
                  </Text>
                  {step.active && <View style={styles.orangeActiveDot} />}
                </View>
                <Text style={[styles.stepTime, step.active && styles.activeStepTimeText]}>
                  {step.time}
                </Text>
              </View>
              <Text style={styles.stepSubtitle}>{step.subtitle}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Ordered Items List Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Ordered Items</Text>
          <View style={styles.itemsBadge}>
            <Text style={styles.itemsBadgeText}>{items.length} items</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.specialNotesText}>Special Notes</Text>
        </TouchableOpacity>
      </View>

      {items.length === 0 ? (
        <View style={styles.itemCard}>
          <View style={styles.itemImageContainer}>
            <Image source={require('../../assets/burger pic.png')} style={styles.itemImg} resizeMode="cover" />
          </View>
          <View style={styles.itemDetails}>
            <Text style={styles.itemTitle}>Cheesy Bacon Burger Deluxe</Text>
            <Text style={styles.itemSubtitle}>Special meal preparation</Text>
            <View style={styles.itemBottomRow}>
              <View style={styles.qtyBadge}>
                <Text style={styles.qtyText}>Qty: 1</Text>
              </View>
              <Text style={styles.itemPrice}>${totalPrice}</Text>
            </View>
          </View>
        </View>
      ) : (
        items.map((it, idx) => {
          const itemData = it.menuItem || {};
          const title = itemData.name || `Item #${idx + 1}`;
          const subtitle = itemData.description || itemData.category || 'Kitchen preparation';
          const qty = it.quantity || 1;
          const price = `$${Number(it.unitPrice || itemData.price || 0).toFixed(2)}`;
          return (
            <View key={it.id || idx} style={styles.itemCard}>
              <View style={styles.itemImageContainer}>
                {itemData.image ? (
                  <Image source={typeof itemData.image === 'string' ? { uri: itemData.image } : itemData.image} style={styles.itemImg} resizeMode="cover" />
                ) : (
                  <Ionicons name="fast-food-outline" size={24} color="#555" />
                )}
              </View>

              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle} numberOfLines={1}>{title}</Text>
                <Text style={styles.itemSubtitle} numberOfLines={1}>{subtitle}</Text>

                <View style={styles.itemBottomRow}>
                  <View style={styles.qtyBadge}>
                    <Text style={styles.qtyText}>Qty: {qty}</Text>
                  </View>
                  <Text style={styles.itemPrice}>{price}</Text>
                </View>
              </View>
            </View>
          );
        })
      )}

      {/* Payment Summary Section */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>

          <View style={styles.paymentMethodBadge}>
            <FontAwesome5 name="credit-card" size={11} color="#FF6B00" />
            <Text style={styles.paymentMethodText}>Card •••• 4092</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryVal}>${subtotal}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Estimated Tax (8%)</Text>
          <Text style={styles.summaryVal}>${tax}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Kitchen & Table Service</Text>
          <Text style={styles.summaryVal}>$0.50</Text>
        </View>

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.paidInFullText}>Paid in full</Text>
          </View>
          <Text style={styles.totalVal}>${totalPrice}</Text>
        </View>
      </View>

      {/* Call Waiter & Support Button */}
      <TouchableOpacity style={styles.callWaiterBtn}>
        <Ionicons name="notifications-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.callWaiterBtnText}>Call Waiter / Support</Text>
      </TouchableOpacity>

      {/* View Digital Receipt & Split Button */}
      <TouchableOpacity style={styles.receiptBtn}>
        <Ionicons name="receipt-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.receiptBtnText}>View Digital Receipt & Split</Text>
      </TouchableOpacity>
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
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  receiptHeaderBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#2A1A10',
    borderWidth: 1,
    borderColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBanner: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
  },
  statusBannerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeOrderBadge: {
    backgroundColor: '#252525',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 8,
  },
  activeOrderText: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  orderIdHeader: {
    color: '#888',
    fontSize: 12,
    flex: 1,
  },
  timeEstBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A1A10',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  timeEstText: {
    color: '#FF6B00',
    fontSize: 11,
    fontWeight: 'bold',
  },
  statusMainTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statusSubTitle: {
    color: '#777',
    fontSize: 12,
    marginBottom: 14,
  },
  statusInfoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 12,
    borderRadius: 12,
    gap: 10,
  },
  panIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusInfoText: {
    color: '#DDD',
    fontSize: 12,
    flex: 1,
    lineHeight: 16,
  },
  journeyCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
  },
  journeyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  journeyTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  liveTrackingText: {
    color: '#FF6B00',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineIndicatorContainer: {
    alignItems: 'center',
    marginRight: 12,
    width: 28,
  },
  iconNode: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  nodeCompleted: {
    backgroundColor: '#FF6B00',
  },
  nodeActive: {
    backgroundColor: '#FF6B00',
  },
  nodeInactive: {
    backgroundColor: '#252525',
    borderWidth: 1,
    borderColor: '#333',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#333',
    marginVertical: 4,
  },
  timelineLineActive: {
    backgroundColor: '#FF6B00',
  },
  timelineContent: {
    flex: 1,
    justifyContent: 'center',
  },
  stepTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stepTitle: {
    color: '#888',
    fontSize: 14,
    fontWeight: '600',
  },
  activeStepTitleText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  orangeActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
  },
  stepTime: {
    color: '#666',
    fontSize: 11,
  },
  activeStepTimeText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  stepSubtitle: {
    color: '#666',
    fontSize: 11,
    lineHeight: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemsBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  itemsBadgeText: {
    color: '#888',
    fontSize: 11,
  },
  specialNotesText: {
    color: '#FF6B00',
    fontSize: 12,
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 10,
  },
  itemImageContainer: {
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
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  qtyBadge: {
    backgroundColor: '#252525',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  qtyText: {
    color: '#888',
    fontSize: 11,
  },
  itemPrice: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  summaryCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginVertical: 16,
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  summaryTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentMethodBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paymentMethodText: {
    color: '#AAA',
    fontSize: 11,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: '#888',
    fontSize: 13,
  },
  summaryVal: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#2A2A2A',
    paddingTop: 12,
    marginTop: 6,
  },
  totalLabel: {
    color: '#777',
    fontSize: 10,
    fontWeight: 'bold',
  },
  paidInFullText: {
    color: '#888',
    fontSize: 10,
    marginTop: 2,
  },
  totalVal: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  callWaiterBtn: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 14,
    marginBottom: 10,
  },
  callWaiterBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  receiptBtn: {
    backgroundColor: '#252525',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  receiptBtnText: {
    color: '#CCC',
    fontSize: 14,
    fontWeight: 'bold',
  },
});