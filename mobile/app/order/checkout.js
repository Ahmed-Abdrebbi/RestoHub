import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useCartStore } from '../../store/useCartStore';
import { createOrder } from '../../services/orderService';

export default function CheckoutScreen() {
  const router = useRouter();
  const [selectedAddress, setSelectedAddress] = useState('home');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const cartItems = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const getTotalPrice = useCartStore((s) => s.getTotalPrice);

  const subtotal = getTotalPrice();
  const deliveryFee = subtotal > 0 ? 2.50 : 0.00;
  const discount = subtotal > 0 ? 2.00 : 0.00;
  const tax = subtotal > 0 ? Number((subtotal * 0.08).toFixed(2)) : 0.00;
  const totalAmount = Math.max(0, subtotal - discount + deliveryFee + tax).toFixed(2);
  const totalCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setErrorMessage('Your cart is empty');
      return;
    }
    try {
      setSubmitting(true);
      setErrorMessage('');
      const itemsPayload = cartItems.map((item) => ({
        menuItemId: item.id || item._id,
        quantity: item.quantity || 1,
      }));

      const newOrder = await createOrder({ items: itemsPayload });
      clearCart();
      const orderId = newOrder?.id || newOrder?._id;
      if (orderId) {
        router.push(`/order/${orderId}`);
      } else {
        router.push('/order/orders');
      }
    } catch (err) {
      console.log('Order creation error:', err);
      setErrorMessage(typeof err === 'string' ? err : err.error || err.message || 'Failed to place order.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.notificationBtn}>
            <Ionicons name="notifications-outline" size={18} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.profileBtn}>
            <Ionicons name="person" size={14} color="#FF6B00" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Restaurant Info Banner */}
      <View style={styles.kitchenBanner}>
        <View style={styles.kitchenLeft}>
          <View style={styles.kitchenImagePlaceholder}>
            <Ionicons name="restaurant" size={16} color="#FF6B00" />
          </View>
          <View>
            <Text style={styles.kitchenName}>Smart Menu Kitchen</Text>
            <Text style={styles.deliveryTime}>Estimated delivery: 20–25 min</Text>
          </View>
        </View>
        <View style={styles.itemsBadge}>
          <Text style={styles.itemsBadgeText}>{totalCount} ITEMS</Text>
        </View>
      </View>

      {/* Shipping Address Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="bus-outline" size={18} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Shipping Address</Text>
        </View>
        <TouchableOpacity style={styles.addNewBtn}>
          <Ionicons name="add-circle-outline" size={14} color="#FF6B00" />
          <Text style={styles.addNewText}>Add New</Text>
        </TouchableOpacity>
      </View>

      {/* Home Address Card */}
      <TouchableOpacity 
        style={[styles.addressCard, selectedAddress === 'home' && styles.cardSelected]}
        onPress={() => setSelectedAddress('home')}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="home-outline" size={16} color="#FF6B00" />
            </View>
            <Text style={styles.cardMainTitle}>Home</Text>
            <View style={styles.defaultBadge}>
              <Text style={styles.defaultBadgeText}>DEFAULT</Text>
            </View>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil-outline" size={14} color="#888" />
            </TouchableOpacity>
            <View style={[styles.radioCircle, selectedAddress === 'home' && styles.radioActive]}>
              {selectedAddress === 'home' && <Ionicons name="checkmark" size={12} color="#FFF" />}
            </View>
          </View>
        </View>
        <Text style={styles.addressName}>Alex Johnson</Text>
        <Text style={styles.addressLine}>742 Evergreen Terrace,</Text>
        <Text style={styles.addressLine}>Springfield, OR 97477</Text>
        <Text style={styles.addressPhone}>+1 (555) 234-5678</Text>
      </TouchableOpacity>

      {/* Work Address Card */}
      <TouchableOpacity 
        style={[styles.addressCard, selectedAddress === 'work' && styles.cardSelected]}
        onPress={() => setSelectedAddress('work')}
      >
        <View style={styles.cardHeader}>
          <View style={styles.cardTitleRow}>
            <View style={styles.iconCircleInactive}>
              <Ionicons name="business-outline" size={16} color="#888" />
            </View>
            <Text style={styles.cardMainTitle}>Work</Text>
          </View>
          <View style={styles.cardActions}>
            <TouchableOpacity style={styles.editBtn}>
              <Ionicons name="pencil-outline" size={14} color="#888" />
            </TouchableOpacity>
            <View style={[styles.radioCircle, selectedAddress === 'work' && styles.radioActive]} />
          </View>
        </View>
        <Text style={styles.addressName}>Alex Johnson</Text>
        <Text style={styles.addressLine}>Tech Hub Building 4, Suite...</Text>
        <Text style={styles.addressPhone}>+1 (555) 890-1234</Text>
      </TouchableOpacity>

      {/* Payment Method Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="card-outline" size={18} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Payment Method</Text>
        </View>
        <View style={styles.encryptedBadge}>
          <Ionicons name="shield-checkmark-outline" size={12} color="#888" />
          <Text style={styles.encryptedBadgeText}>256-bit encrypted</Text>
        </View>
      </View>

      {/* Mastercard Option */}
      <TouchableOpacity 
        style={[styles.paymentCard, selectedPayment === 'card' && styles.cardSelected]}
        onPress={() => setSelectedPayment('card')}
      >
        <View style={styles.paymentLeft}>
          <View style={styles.iconCircle}>
            <FontAwesome name="credit-card" size={14} color="#FF6B00" />
          </View>
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Text style={styles.paymentTitle}>Mastercard •••• 4829</Text>
              <View style={styles.orangeDot} />
            </View>
            <Text style={styles.paymentSubtitle}>Exp: 08/26 • Default Card</Text>
          </View>
        </View>
        <View style={[styles.radioOuter, selectedPayment === 'card' && styles.radioOuterActive]}>
          {selectedPayment === 'card' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* Apple Pay Option */}
      <TouchableOpacity 
        style={[styles.paymentCard, selectedPayment === 'apple' && styles.cardSelected]}
        onPress={() => setSelectedPayment('apple')}
      >
        <View style={styles.paymentLeft}>
          <View style={styles.iconCircleInactive}>
            <FontAwesome name="apple" size={16} color="#888" />
          </View>
          <View>
            <Text style={styles.paymentTitle}>Apple Pay</Text>
            <Text style={styles.paymentSubtitle}>alex@icloud.com</Text>
          </View>
        </View>
        <View style={[styles.radioOuter, selectedPayment === 'apple' && styles.radioOuterActive]}>
          {selectedPayment === 'apple' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* Cash on Delivery Option */}
      <TouchableOpacity 
        style={[styles.paymentCard, selectedPayment === 'cash' && styles.cardSelected]}
        onPress={() => setSelectedPayment('cash')}
      >
        <View style={styles.paymentLeft}>
          <View style={styles.iconCircleInactive}>
            <Ionicons name="cash-outline" size={16} color="#888" />
          </View>
          <View>
            <Text style={styles.paymentTitle}>Cash on Delivery</Text>
            <Text style={styles.paymentSubtitle}>Pay upon receiving order</Text>
          </View>
        </View>
        <View style={[styles.radioOuter, selectedPayment === 'cash' && styles.radioOuterActive]}>
          {selectedPayment === 'cash' && <View style={styles.radioInner} />}
        </View>
      </TouchableOpacity>

      {/* Order Summary Section */}
      <View style={styles.sectionHeader}>
        <View style={styles.sectionTitleRow}>
          <Ionicons name="receipt-outline" size={18} color="#FF6B00" />
          <Text style={styles.sectionTitle}>Order Summary</Text>
        </View>
      </View>

      <View style={styles.summaryBox}>
        <View style={styles.promoRow}>
          <View style={styles.promoLeft}>
            <Ionicons name="pricetag-outline" size={14} color="#FF6B00" />
            <Text style={styles.promoCode}>CHEFPROMO</Text>
          </View>
          <Text style={styles.promoAmount}>Applied -$2.00</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryVal}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery Fee</Text>
          <Text style={styles.summaryVal}>${deliveryFee.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax & Restaurant Fees</Text>
          <Text style={styles.summaryVal}>${tax.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Discount (CHEFPromo)</Text>
          <Text style={styles.discountVal}>-${discount.toFixed(2)}</Text>
        </View>

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>Total Amount</Text>
            <Text style={styles.totalSub}>Inclusive of all local taxes</Text>
          </View>
          <Text style={styles.totalVal}>${totalAmount}</Text>
        </View>
      </View>

      {errorMessage ? (
        <View style={{ backgroundColor: '#3D1B1B', borderRadius: 10, padding: 12, marginBottom: 15, borderWidth: 1, borderColor: '#FF4D4D' }}>
          <Text style={{ color: '#FF4D4D', fontSize: 13, textAlign: 'center' }}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Confirm & Place Order Button */}
      <TouchableOpacity 
        style={[styles.placeOrderBtn, (submitting || cartItems.length === 0) && { opacity: 0.6 }]}
        disabled={submitting || cartItems.length === 0}
        onPress={handlePlaceOrder}
      >
        {submitting ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <>
            <Ionicons name="lock-closed-outline" size={18} color="#FFF" style={{ marginRight: 8 }} />
            <Text style={styles.placeOrderBtnText}>Confirm & Place Order</Text>
            <Text style={styles.btnPriceTag}>${totalAmount} →</Text>
          </>
        )}
      </TouchableOpacity>

      <Text style={styles.legalNoticeText}>
        By tapping Confirmation, you agree to our{' '}
        <Text style={styles.legalLink}>Terms of Service</Text> &{' '}
        <Text style={styles.legalLink}>Refund Policy</Text>.
      </Text>
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
  notificationBtn: {
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
  kitchenBanner: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
  },
  kitchenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  kitchenImagePlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kitchenName: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  deliveryTime: {
    color: '#777',
    fontSize: 11,
  },
  itemsBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  itemsBadgeText: {
    color: '#888',
    fontSize: 10,
    fontWeight: 'bold',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
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
  addNewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  addNewText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  addressCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 12,
  },
  cardSelected: {
    borderColor: '#FF6B00',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircleInactive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardMainTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  defaultBadge: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  defaultBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  cardActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  editBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioActive: {
    backgroundColor: '#FF6B00',
    borderColor: '#FF6B00',
  },
  addressName: {
    color: '#DDD',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 2,
  },
  addressLine: {
    color: '#888',
    fontSize: 12,
  },
  addressPhone: {
    color: '#666',
    fontSize: 11,
    marginTop: 4,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  encryptedBadgeText: {
    color: '#777',
    fontSize: 10,
  },
  paymentCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 10,
  },
  paymentLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  paymentTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
  },
  paymentSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioOuterActive: {
    borderColor: '#FF6B00',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF6B00',
  },
  summaryBox: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
  },
  promoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#252525',
  },
  promoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  promoCode: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promoAmount: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
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
  discountVal: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: 'bold',
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
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalSub: {
    color: '#666',
    fontSize: 10,
  },
  totalVal: {
    color: '#FFF',
    fontSize: 26,
    fontWeight: 'bold',
  },
  placeOrderBtn: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  placeOrderBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
  },
  btnPriceTag: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  legalNoticeText: {
    color: '#666',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 14,
  },
  legalLink: {
    color: '#888',
    textDecorationLine: 'underline',
  },
});