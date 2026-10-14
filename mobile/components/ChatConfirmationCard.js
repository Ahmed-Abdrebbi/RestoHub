import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../constants/theme";

export default function ChatConfirmationCard({ orderSummary }) {
  return (
    <View style={styles.row}>
      {/* Avatar */}
      <View style={styles.avatar}>
        <Ionicons name="receipt-outline" size={18} color={colors.primary} />
      </View>

      <View style={styles.cardOuter}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <View style={styles.iconBadge}>
                <Ionicons name="cart-outline" size={17} color={colors.primary} />
              </View>
              <View>
                <Text style={styles.headerTitle}>Order Summary</Text>
                <Text style={styles.headerSub}>Review before sending to kitchen</Text>
              </View>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{orderSummary.status}</Text>
            </View>
          </View>

          {/* Items */}
          <View style={styles.itemsSection}>
            {orderSummary.items.map((item, idx) => (
              <View key={idx} style={styles.itemRow}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                    <Text style={styles.qtyLabel}>{item.qty}x</Text>
                    <Text style={styles.itemName} numberOfLines={1}>
                      {item.name}
                    </Text>
                  </View>
                  {item.detail && (
                    <Text style={styles.itemDetail}>{item.detail}</Text>
                  )}
                </View>
                <Text style={styles.itemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
              </View>
            ))}
          </View>

          {/* Totals */}
          <View style={styles.totalsBox}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Estimated Tax (8%)</Text>
              <Text style={styles.totalLabel}>${orderSummary.tax.toFixed(2)}</Text>
            </View>
            <View style={[styles.totalRow, { marginTop: 6 }]}>
              <View>
                <Text style={styles.totalAmountLabel}>TOTAL AMOUNT</Text>
                <Text style={styles.totalAmount}>
                  ${orderSummary.total.toFixed(2)}
                </Text>
              </View>
              <View style={styles.etaBadge}>
                <Ionicons name="flash" size={14} color="#FFB779" />
                <Text style={styles.etaText}>
                  Kitchen ETA: {orderSummary.eta}
                </Text>
              </View>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.modifyBtn} activeOpacity={0.8}>
              <Ionicons name="create-outline" size={16} color={colors.text} />
              <Text style={styles.modifyText}>Modify</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmBtn} activeOpacity={0.8}>
              <Ionicons name="restaurant-outline" size={16} color="#0D0D0D" />
              <Text style={styles.confirmText}>Confirm Order</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.awaitingText}>
          {orderSummary.time || "7:44 PM"} • Awaiting confirmation
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: 12,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  cardOuter: {
    flex: 1,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderTopLeftRadius: 4,
    padding: 16,
    overflow: "hidden",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconBadge: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "rgba(255,102,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
  headerSub: {
    color: colors.textMuted,
    fontSize: 11,
  },
  statusBadge: {
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  statusText: {
    color: "#FFB779",
    fontSize: 11,
    fontWeight: "600",
  },
  itemsSection: {
    gap: 12,
    paddingVertical: 8,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  qtyLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  itemName: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
    flexShrink: 1,
  },
  itemDetail: {
    color: colors.textMuted,
    fontSize: 11,
    marginLeft: 22,
    marginTop: 2,
  },
  itemPrice: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  totalsBox: {
    backgroundColor: "rgba(32,31,31,0.6)",
    borderRadius: 12,
    padding: 12,
    marginTop: 10,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
  },
  totalAmountLabel: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  totalAmount: {
    color: colors.primary,
    fontSize: 22,
    fontWeight: "700",
  },
  etaBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  etaText: {
    color: "#FFB779",
    fontSize: 11,
    fontWeight: "600",
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  modifyBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  modifyText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
  },
  confirmBtn: {
    flex: 1,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  confirmText: {
    color: "#0D0D0D",
    fontSize: 13,
    fontWeight: "700",
  },
  awaitingText: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: 6,
    marginLeft: 4,
  },
});
