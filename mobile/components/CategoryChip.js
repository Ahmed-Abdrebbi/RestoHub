import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../constants/theme";

export default function CategoryChip({ category, active, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={[styles.circle, active && styles.circleActive]}>
        <Ionicons
          name={category.icon}
          size={26}
          color={active ? colors.primary : colors.textMuted}
        />
        {active && <View style={styles.glowOverlay} />}
      </View>
      <Text style={[styles.label, active && styles.labelActive]}>
        {category.name}
      </Text>
      <Text style={[styles.count, active && styles.countActive]}>
        {category.count} items
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginRight: 16,
  },
  circle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  circleActive: {
    backgroundColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 6,
  },
  glowOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
    backgroundColor: "rgba(255,102,0,0.1)",
  },
  label: {
    color: colors.textMuted,
    fontSize: 13,
    fontWeight: "600",
  },
  labelActive: {
    color: colors.text,
  },
  count: {
    color: colors.textMuted,
    fontSize: 10,
  },
  countActive: {
    color: colors.primary,
  },
});
