import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../constants/theme";
import { useCartStore } from "../store/useCartStore";

export default function Checkout() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clear = useCartStore((s) => s.clear);

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    clear();
    router.replace("/order/ord2");
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Delivery info */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Delivery Details</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Table</Text>
            <Text style={styles.infoValue}>Table 14</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Service</Text>
            <Text style={styles.infoValue}>Dine-in</Text>
          </View>
        </View>

        {/* Order items */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="receipt-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Order Summary</Text>
          </View>
          {items.map((item) => (
            <View key={item.id} style={styles.orderRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.orderName}>{item.qty}x {item.name}</Text>
              </View>
              <Text style={styles.orderPrice}>
                ${(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          ))}
          <View style={styles.divider} />
          <View style={styles.orderRow}>
            <Text style={styles.infoLabel}>Subtotal</Text>
            <Text style={styles.infoValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.infoLabel}>Tax (8%)</Text>
            <Text style={styles.infoValue}>${tax.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.orderRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>
          <TouchableOpacity style={styles.paymentRow}>
            <View style={styles.payIconWrap}>
              <Ionicons name="card" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.payTitle}>Visa ending •••• 4242</Text>
              <Text style={styles.paySub}>Default payment method</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomTotal}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.placeBtn}
          activeOpacity={0.85}
          onPress={handlePlaceOrder}
        >
          <Ionicons name="checkmark-circle" size={20} color="#0D0D0D" />
          <Text style={styles.placeText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingTop: 52,
    paddingBottom: 12,
  },
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: "600" },
  content: { paddingHorizontal: 24, paddingBottom: 24, gap: 16 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  cardTitle: { color: colors.text, fontSize: 17, fontWeight: "600" },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: { color: colors.textMuted, fontSize: 14 },
  infoValue: { color: colors.text, fontSize: 14, fontWeight: "500" },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  orderName: { color: colors.text, fontSize: 14, fontWeight: "500" },
  orderPrice: { color: colors.text, fontSize: 14, fontWeight: "600" },
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 8 },
  totalLabel: { color: colors.textMuted, fontSize: 10, fontWeight: "500", letterSpacing: 1 },
  totalValue: { color: colors.primary, fontSize: 22, fontWeight: "700" },
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  payIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,102,0,0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  payTitle: { color: colors.text, fontSize: 14, fontWeight: "600" },
  paySub: { color: colors.textMuted, fontSize: 11, marginTop: 2 },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(13,13,13,0.85)",
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bottomLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  bottomTotal: { color: colors.text, fontSize: 24, fontWeight: "700" },
  placeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  placeText: { color: "#0D0D0D", fontSize: 16, fontWeight: "700" },
});
