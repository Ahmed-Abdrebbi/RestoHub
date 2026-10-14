import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../constants/theme";

const STATUS_CONFIG = {
  preparing: { label: "Preparing", bg: "rgba(255,102,0,0.15)", color: colors.primary },
  "on-the-way": { label: "On the way", bg: "rgba(5,158,255,0.15)", color: "#059EFF" },
  delivered: { label: "Delivered", bg: "rgba(76,175,80,0.15)", color: "#4CAF50" },
  cancelled: { label: "Cancelled", bg: "rgba(255,75,75,0.12)", color: "#FF4B4B" },
};

export default function OrderStatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.preparing;

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.color }]} />
      <Text style={[styles.label, { color: config.color }]}>
        {config.label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
});
