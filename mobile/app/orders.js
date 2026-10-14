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
import { MOCK_ORDERS } from "../constants/mockData";
import OrderStatusBadge from "../components/OrderStatusBadge";

export default function Orders() {
  const router = useRouter();

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order History</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_ORDERS.map((order) => (
          <TouchableOpacity
            key={order.id}
            style={styles.card}
            activeOpacity={0.85}
            onPress={() => router.push(`/order/${order.id}`)}
          >
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.orderNumber}>Order {order.number}</Text>
                <Text style={styles.orderDate}>{order.date}</Text>
              </View>
              <OrderStatusBadge status={order.status} />
            </View>

            <View style={styles.itemsList}>
              {order.items.map((item, idx) => (
                <Text key={idx} style={styles.itemText}>
                  {item.qty}x {item.name}
                </Text>
              ))}
            </View>

            <View style={styles.cardBottom}>
              <Text style={styles.totalText}>
                Total: <Text style={styles.totalAmount}>${order.total.toFixed(2)}</Text>
              </Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </View>
          </TouchableOpacity>
        ))}
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
  backBtn: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center" },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: "600" },
  content: { paddingHorizontal: 24, paddingBottom: 24, gap: 12 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  orderNumber: { color: colors.text, fontSize: 17, fontWeight: "600" },
  orderDate: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
  itemsList: { marginBottom: 12 },
  itemText: { color: colors.textMuted, fontSize: 14, marginBottom: 2 },
  cardBottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  totalText: { color: colors.textMuted, fontSize: 14 },
  totalAmount: { color: colors.primary, fontWeight: "700", fontSize: 16 },
});
