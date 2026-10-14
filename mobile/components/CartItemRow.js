import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../constants/theme";
import { useCartStore } from "../store/useCartStore";

export default function CartItemRow({ item }) {
  const incrementItem = useCartStore((s) => s.incrementItem);
  const decrementItem = useCartStore((s) => s.decrementItem);
  const removeItem = useCartStore((s) => s.removeItem);

  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>${(item.price * item.qty).toFixed(2)}</Text>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => decrementItem(item.id)}
          >
            <Ionicons name="remove" size={16} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.qty}</Text>
          <TouchableOpacity
            style={styles.stepBtnActive}
            onPress={() => incrementItem(item.id)}
          >
            <Ionicons name="add" size={16} color="#0D0D0D" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        style={styles.deleteBtn}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 12,
    marginBottom: 12,
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 14,
    backgroundColor: colors.border,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
  },
  price: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: "700",
    marginTop: 2,
  },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.background,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  stepBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepBtnActive: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  qty: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    minWidth: 28,
    textAlign: "center",
  },
  deleteBtn: {
    padding: 8,
  },
});
