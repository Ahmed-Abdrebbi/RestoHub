import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { colors, radius, spacing } from "../constants/theme";
import { useCartStore } from "../store/useCartStore";

export default function MealCard({ item }) {
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.85}
      onPress={() => router.push(`/menu-item/${item.id}`)}
    >
      {/* Image */}
      <View style={styles.imageWrap}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <TouchableOpacity style={styles.heartBtn} activeOpacity={0.7}>
          <Ionicons name="heart-outline" size={16} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <View style={styles.ratingRow}>
          <Ionicons name="star" size={13} color="#FFB779" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.reviewsText}>({item.reviews})</Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
          <TouchableOpacity
            style={styles.addBtn}
            activeOpacity={0.8}
            onPress={(e) => {
              e.stopPropagation?.();
              addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
            }}
          >
            <Ionicons name="add" size={18} color="#0D0D0D" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 12,
    flex: 1,
  },
  imageWrap: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.border,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heartBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(14,14,14,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  details: {
    flex: 1,
    justifyContent: "space-between",
  },
  name: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.4,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
  },
  ratingText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: "700",
  },
  reviewsText: {
    color: colors.textMuted,
    fontSize: 11,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
  },
  price: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700",
  },
  addBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});
