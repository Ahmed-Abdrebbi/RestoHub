import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function CartScreen() {
  const router = useRouter();

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Cheesy Bacon Burger Delu...',
      subtitle: 'Extra Aged Cheddar, Brioche',
      price: 14.99,
      quantity: 1,
      image: require('../../assets/burger pic.png'),
    },
    {
      id: 2,
      title: 'Truffle Garlic Mayo Dip',
      subtitle: 'House special recipe',
      price: 1.00,
      quantity: 1,
      image: null,
    },
    {
      id: 3,
      title: 'Rustic Pepperoni Slice',
      subtitle: 'Crispy crust, fresh basil',
      price: 6.50,
      quantity: 1,
      image: null,
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Smart Menu Cart</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Table & Prep Info Banner */}
      <View style={styles.tableInfoBanner}>
        <View style={styles.tableInfoLeft}>
          <View style={styles.miniDot} />
          <View>
            <Text style={styles.tableTitle}>Table 14 • Dine-In</Text>
            <Text style={styles.tableSubtitle}>Estimated kitchen prep: ~15–20 min</Text>
          </View>
        </View>
        <View style={styles.priorityBadge}>
          <Ionicons name="flash" size={12} color="#FFA500" />
          <Text style={styles.priorityText}>PRIORITY</Text>
        </View>
      </View>

      {/* Section Header */}
      <View style={styles.selectionHeader}>
        <View style={styles.selectionTitleRow}>
          <Text style={styles.sectionTitle}>Your Selection</Text>
          <View style={styles.itemsCountBadge}>
            <Text style={styles.itemsCountText}>{cartItems.length} items</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.clearBtn} onPress={clearCart}>
          <Ionicons name="trash-outline" size={14} color="#888" />
          <Text style={styles.clearText}>Clear</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items List */}
      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItemCard}>
          <View style={styles.itemImageContainer}>
            {item.image ? (
              <Image source={item.image} style={styles.itemImage} resizeMode="cover" />
            ) : (
              <View style={styles.itemImagePlaceholder}>
                <Ionicons name="fast-food-outline" size={24} color="#555" />
              </View>
            )}
          </View>

          <View style={styles.itemDetails}>
            <View style={styles.itemTopRow}>
              <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
              <TouchableOpacity onPress={() => removeItem(item.id)}>
                <Ionicons name="close" size={18} color="#777" />
              </TouchableOpacity>
            </View>

            <Text style={styles.itemSubtitle}>{item.subtitle}</Text>

            <View style={styles.itemBottomRow}>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

              <View style={styles.quantityBox}>
                <TouchableOpacity onPress={() => updateQuantity(item.id, -1)}>
                  <Text style={styles.qtyMinusText}>—</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                  <Text style={styles.qtyPlusText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ))}

      {/* Kitchen Instructions Button */}
      <TouchableOpacity style={styles.instructionsBar}>
        <View style={styles.instructionsLeft}>
          <Ionicons name="options-outline" size={18} color="#FF6B00" />
          <Text style={styles.instructionsText}>Kitchen Instructions / Allergies</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color="#777" />
      </TouchableOpacity>

      {/* Promo Code Box */}
      <View style={styles.promoContainer}>
        <View style={styles.promoInputBox}>
          <Ionicons name="pricetag-outline" size={16} color="#888" style={{ marginRight: 8 }} />
          <Text style={styles.promoCodeText}>CHEFSPECIAL</Text>
        </View>
        <View style={styles.appliedBadge}>
          <Text style={styles.appliedText}>Applied</Text>
        </View>
      </View>

      <View style={styles.couponNoticeRow}>
        <Ionicons name="checkmark-circle-outline" size={14} color="#FF6B00" />
        <Text style={styles.couponNoticeText}>Coupon CHEFSPECIAL added (-$2.00 chef credit)</Text>
      </View>

      {/* Payment Summary Box */}
      <View style={styles.summaryCard}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Payment Summary</Text>
          <Text style={styles.invoiceText}>Tax Invoice #0482</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Items Subtotal</Text>
          <Text style={styles.summaryValue}>$22.49</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Chef Special Discount</Text>
          <Text style={styles.discountValue}>-$2.00</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Dine-In Service Fee</Text>
          <Text style={styles.summaryValue}>$1.50</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Estimated Tax (8%)</Text>
          <Text style={styles.summaryValue}>$1.80</Text>
        </View>

        <View style={styles.totalRow}>
          <View>
            <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
            <Text style={styles.totalSubtext}>Includes all local hospitality taxes</Text>
          </View>
          <Text style={styles.totalValue}>$23.79</Text>
        </View>
      </View>

      {/* Send Order Button */}
      <TouchableOpacity style={styles.sendOrderBtn} onPress={() => router.push('/order/123')}>
        <Ionicons name="restaurant-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
        <Text style={styles.sendOrderBtnText}>Send Order to Kitchen</Text>
        <Ionicons name="arrow-forward" size={20} color="#FFF" style={{ marginLeft: 8 }} />
      </TouchableOpacity>

      <View style={styles.encryptedRow}>
        <Ionicons name="lock-closed-outline" size={12} color="#777" />
        <Text style={styles.encryptedText}>Encrypted instant transmission to Kitchen Display</Text>
      </View>
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
  tableInfoBanner: {
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
  tableInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  miniDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B00',
  },
  tableTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  tableSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  priorityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2215',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    gap: 4,
  },
  priorityText: {
    color: '#FFA500',
    fontSize: 10,
    fontWeight: 'bold',
  },
  selectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  selectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sectionTitle: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemsCountBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  itemsCountText: {
    color: '#888',
    fontSize: 11,
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  clearText: {
    color: '#888',
    fontSize: 12,
  },
  cartItemCard: {
    flexDirection: 'row',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 12,
  },
  itemImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#252525',
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  itemImagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 6,
  },
  itemSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  itemPrice: {
    color: '#FF6B00',
    fontSize: 15,
    fontWeight: 'bold',
  },
  quantityBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 12,
  },
  qtyMinusText: {
    color: '#FF6B00',
    fontSize: 12,
    fontWeight: 'bold',
  },
  qtyValText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  qtyPlusText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: 'bold',
  },
  instructionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginVertical: 14,
  },
  instructionsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  instructionsText: {
    color: '#CCC',
    fontSize: 13,
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  promoInputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    height: 48,
  },
  promoCodeText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  appliedBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appliedText: {
    color: '#CCC',
    fontSize: 13,
    fontWeight: 'bold',
  },
  couponNoticeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 20,
  },
  couponNoticeText: {
    color: '#FF6B00',
    fontSize: 11,
  },
  summaryCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
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
  invoiceText: {
    color: '#777',
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
  summaryValue: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '600',
  },
  discountValue: {
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
    color: '#777',
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalSubtext: {
    color: '#FF6B00',
    fontSize: 9,
    marginTop: 2,
  },
  totalValue: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  sendOrderBtn: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 52,
    borderRadius: 14,
    marginBottom: 8,
  },
  sendOrderBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  encryptedRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  encryptedText: {
    color: '#666',
    fontSize: 11,
  },
});