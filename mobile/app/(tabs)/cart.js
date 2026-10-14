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
import { colors, radius, spacing } from "../../constants/theme";
import { useCartStore } from "../../store/useCartStore";
import CartItemRow from "../../components/CartItemRow";

export default function Cart() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const getTotal = useCartStore((s) => s.getTotal);
  const clear = useCartStore((s) => s.clear);

  const subtotal = getTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={clear}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="bag-outline" size={64} color={colors.border} />
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>
            Add delicious meals from the menu to get started
          </Text>
          <TouchableOpacity
            style={styles.browseBtn}
            onPress={() => router.push("/(tabs)/home")}
          >
            <Text style={styles.browseBtnText}>Browse Menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <CartItemRow key={item.id} item={item} />
            ))}

            {/* Summary */}
            <View style={styles.summaryCard}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Tax (8%)</Text>
                <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
              </View>
            </View>
          </ScrollView>

          {/* Bottom CTA */}
          <View style={styles.bottomBar}>
            <View>
              <Text style={styles.bottomLabel}>Total</Text>
              <Text style={styles.bottomTotal}>${total.toFixed(2)}</Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.85}
              onPress={() => router.push("/checkout")}
            >
              <Ionicons name="bag-check" size={20} color="#0D0D0D" />
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: { color: colors.text, fontSize: 26, fontWeight: "600" },
  clearText: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
  },
  emptyTitle: { color: colors.text, fontSize: 20, fontWeight: "600", marginTop: 20, marginBottom: 8 },
  emptySub: { color: colors.textMuted, fontSize: 15, textAlign: "center" },
  browseBtn: {
    marginTop: 24,
    backgroundColor: colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
  },
  browseBtnText: { color: "#0D0D0D", fontSize: 15, fontWeight: "700" },
  listContent: { paddingHorizontal: 24, paddingBottom: 24 },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
    marginTop: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: { color: colors.textMuted, fontSize: 14 },
  summaryValue: { color: colors.text, fontSize: 14, fontWeight: "500" },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 8,
  },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
  },
  totalValue: { color: colors.primary, fontSize: 22, fontWeight: "700" },
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
  checkoutBtn: {
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
  checkoutText: { color: "#0D0D0D", fontSize: 16, fontWeight: "700" },
});
