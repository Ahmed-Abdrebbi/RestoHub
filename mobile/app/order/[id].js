import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../../constants/theme";
import { MOCK_ORDERS } from "../../constants/mockData";
import OrderStatusBadge from "../../components/OrderStatusBadge";

const TRACKING_STEPS = [
  { icon: "checkmark-circle", label: "Order Confirmed", detail: "Your order has been received", done: true },
  { icon: "restaurant", label: "Preparing", detail: "Chef is preparing your meal", done: true },
  { icon: "bicycle", label: "On the Way", detail: "Your order is being delivered", done: false },
  { icon: "flag", label: "Delivered", detail: "Enjoy your meal!", done: false },
];

export default function OrderTracking() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const order = MOCK_ORDERS.find((o) => o.id === id) || MOCK_ORDERS[0];

  // Determine active step based on status
  const activeStep =
    order.status === "delivered" ? 3
    : order.status === "on-the-way" ? 2
    : order.status === "preparing" ? 1
    : 0;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order {order.number}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Status card */}
        <View style={styles.statusCard}>
          <View style={styles.statusTop}>
            <OrderStatusBadge status={order.status} />
            {order.estimatedTime && (
              <View style={styles.etaPill}>
                <Ionicons name="flash" size={14} color="#FFB779" />
                <Text style={styles.etaText}>ETA: {order.estimatedTime}</Text>
              </View>
            )}
          </View>

          {/* Tracking steps */}
          <View style={styles.stepsWrap}>
            {TRACKING_STEPS.map((step, idx) => {
              const isActive = idx <= activeStep;
              const isCurrent = idx === activeStep;
              return (
                <View key={idx} style={styles.stepRow}>
                  <View style={styles.stepIndicator}>
                    <View
                      style={[
                        styles.stepDot,
                        isActive && styles.stepDotActive,
                        isCurrent && styles.stepDotCurrent,
                      ]}
                    >
                      <Ionicons
                        name={step.icon}
                        size={16}
                        color={isActive ? "#0D0D0D" : colors.textMuted}
                      />
                    </View>
                    {idx < TRACKING_STEPS.length - 1 && (
                      <View
                        style={[
                          styles.stepLine,
                          isActive && styles.stepLineActive,
                        ]}
                      />
                    )}
                  </View>
                  <View style={styles.stepContent}>
                    <Text
                      style={[
                        styles.stepLabel,
                        isActive && styles.stepLabelActive,
                      ]}
                    >
                      {step.label}
                    </Text>
                    <Text style={styles.stepDetail}>{step.detail}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>

        {/* Order details card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="receipt-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Order Details</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{order.date}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Delivery</Text>
            <Text style={styles.infoValue}>{order.deliveryAddress}</Text>
          </View>

          <View style={styles.divider} />

          {order.items.map((item, idx) => (
            <View key={idx} style={styles.itemRow}>
              <Text style={styles.itemName}>
                {item.qty}x {item.name}
              </Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.itemRow}>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Reorder button */}
        <TouchableOpacity
          style={styles.reorderBtn}
          activeOpacity={0.85}
          onPress={() => router.push("/(tabs)/home")}
        >
          <Ionicons name="refresh" size={20} color="#0D0D0D" />
          <Text style={styles.reorderText}>Order Again</Text>
        </TouchableOpacity>
      </ScrollView>
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
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: "600" },
  content: { paddingHorizontal: 24, paddingBottom: 40, gap: 16 },
  statusCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 20,
  },
  statusTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  etaPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  etaText: { color: "#FFB779", fontSize: 11, fontWeight: "600" },
  stepsWrap: { gap: 0 },
  stepRow: { flexDirection: "row", alignItems: "flex-start" },
  stepIndicator: { alignItems: "center", width: 36 },
  stepDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotActive: { backgroundColor: colors.primary },
  stepDotCurrent: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 12,
    elevation: 8,
  },
  stepLine: {
    width: 2,
    height: 32,
    backgroundColor: colors.border,
  },
  stepLineActive: { backgroundColor: colors.primary },
  stepContent: { marginLeft: 14, paddingBottom: 24 },
  stepLabel: { color: colors.textMuted, fontSize: 15, fontWeight: "600" },
  stepLabelActive: { color: colors.text },
  stepDetail: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
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
  divider: { height: 1, backgroundColor: colors.border, marginVertical: 10 },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName: { color: colors.text, fontSize: 14, fontWeight: "500" },
  itemPrice: { color: colors.text, fontSize: 14, fontWeight: "600" },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
  },
  totalValue: { color: colors.primary, fontSize: 22, fontWeight: "700" },
  reorderBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  reorderText: { color: "#0D0D0D", fontSize: 16, fontWeight: "700" },
});
