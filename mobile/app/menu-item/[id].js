import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../../constants/theme";
import { MOCK_MENU_ITEMS } from "../../constants/mockData";
import { useCartStore } from "../../store/useCartStore";

export default function MealDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const addItem = useCartStore((s) => s.addItem);

  const item = MOCK_MENU_ITEMS.find((m) => m.id === id) || MOCK_MENU_ITEMS[0];

  const [qty, setQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [descExpanded, setDescExpanded] = useState(false);
  const [fav, setFav] = useState(false);

  const toggleOption = (optId) => {
    setSelectedOptions((prev) =>
      prev.includes(optId)
        ? prev.filter((o) => o !== optId)
        : [...prev, optId]
    );
  };

  const extrasTotal = (item.options || [])
    .filter((o) => selectedOptions.includes(o.id))
    .reduce((sum, o) => sum + o.price, 0);

  const totalPrice = (item.price + extrasTotal) * qty;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price + extrasTotal,
      image: item.image,
    });
    router.back();
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <View style={styles.heroWrap}>
          <Image source={{ uri: item.image }} style={styles.heroImage} />
          <View style={styles.heroGradient} />

          {/* Top floating controls */}
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.floatingBtn} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={20} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.floatingBtn}
              onPress={() => setFav(!fav)}
            >
              <Ionicons
                name={fav ? "heart" : "heart-outline"}
                size={22}
                color={fav ? colors.primary : colors.text}
              />
            </TouchableOpacity>
          </View>

          {/* Chef badge */}
          {item.badge && (
            <View style={styles.chefBadge}>
              <View style={styles.badgeDot} />
              <Text style={styles.badgeText}>{item.badge}</Text>
            </View>
          )}
        </View>

        {/* Title + Quantity */}
        <View style={styles.titleRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.mealName}>{item.name}</Text>
          </View>
          <View style={styles.stepper}>
            <TouchableOpacity
              style={styles.stepBtn}
              onPress={() => qty > 1 && setQty(qty - 1)}
            >
              <Ionicons name="remove" size={16} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.stepCount}>{qty}</Text>
            <TouchableOpacity
              style={styles.stepBtnActive}
              onPress={() => setQty(qty + 1)}
            >
              <Ionicons name="add" size={16} color="#0D0D0D" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Metadata chips */}
        <View style={styles.metaRow}>
          <View style={styles.metaChip}>
            <Ionicons name="flame" size={16} color={colors.primary} />
            <Text style={styles.metaText}>{item.calories} kcal</Text>
          </View>
          <View style={styles.metaChip}>
            <Ionicons name="star" size={16} color="#FFB779" />
            <Text style={styles.metaText}>
              {item.rating} <Text style={{ color: colors.textMuted, fontSize: 11 }}>({item.reviews})</Text>
            </Text>
          </View>
          <View style={styles.metaChip}>
            <Ionicons name="time-outline" size={16} color={colors.textMuted} />
            <Text style={styles.metaText}>{item.prepTime}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text
            style={styles.descText}
            numberOfLines={descExpanded ? undefined : 3}
          >
            {item.description}
          </Text>
          <TouchableOpacity onPress={() => setDescExpanded(!descExpanded)}>
            <Text style={styles.readMore}>
              {descExpanded ? "Show Less" : "Read More"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Options */}
        {item.options?.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Additional options</Text>
            <Text style={styles.sectionSub}>Customize your burger</Text>
            <View style={{ gap: 10, marginTop: 8 }}>
              {item.options.map((opt) => {
                const checked = selectedOptions.includes(opt.id);
                return (
                  <TouchableOpacity
                    key={opt.id}
                    style={[
                      styles.optionRow,
                      checked && styles.optionRowActive,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => toggleOption(opt.id)}
                  >
                    <View style={styles.optionLeft}>
                      <View
                        style={[
                          styles.checkbox,
                          checked && styles.checkboxActive,
                        ]}
                      >
                        {checked && (
                          <Ionicons name="checkmark" size={14} color="#0D0D0D" />
                        )}
                      </View>
                      <View>
                        <Text
                          style={[
                            styles.optionName,
                            checked && { color: "#FFB693" },
                          ]}
                        >
                          {opt.name}
                        </Text>
                        <Text style={styles.optionDetail}>{opt.detail}</Text>
                      </View>
                    </View>
                    <Text
                      style={[
                        styles.optionPrice,
                        checked && { color: colors.primary },
                      ]}
                    >
                      +${opt.price.toFixed(2)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom bar */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total Price</Text>
          <Text style={styles.bottomTotal}>${totalPrice.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.addCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Ionicons name="bag-outline" size={22} color="#0D0D0D" />
          <Text style={styles.addCartText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  heroWrap: { position: "relative", width: "100%", aspectRatio: 4 / 3 },
  heroImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  topControls: {
    position: "absolute",
    top: 52,
    left: 16,
    right: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  floatingBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(14,14,14,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  chefBadge: {
    position: "absolute",
    bottom: 16,
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(42,42,42,0.9)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  badgeText: {
    color: colors.primary,
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  mealName: { color: colors.text, fontSize: 26, fontWeight: "600", lineHeight: 32 },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 6,
    paddingVertical: 6,
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
  stepCount: {
    color: colors.text,
    fontSize: 14,
    fontWeight: "700",
    minWidth: 28,
    textAlign: "center",
  },
  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 24,
    marginTop: 12,
  },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  metaText: { color: colors.text, fontSize: 13, fontWeight: "500" },
  section: { paddingHorizontal: 24, marginTop: 24 },
  sectionTitle: { color: colors.text, fontSize: 22, fontWeight: "600", marginBottom: 4 },
  sectionSub: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "500",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  descText: { color: colors.textMuted, fontSize: 15, lineHeight: 22 },
  readMore: { color: colors.primary, fontSize: 13, fontWeight: "600", marginTop: 4, letterSpacing: 0.4 },
  optionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 14,
  },
  optionRowActive: {
    backgroundColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 4,
  },
  optionLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxActive: { backgroundColor: colors.primary },
  optionName: { color: colors.text, fontSize: 15, fontWeight: "500" },
  optionDetail: { color: colors.textMuted, fontSize: 11 },
  optionPrice: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
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
  bottomTotal: { color: colors.text, fontSize: 26, fontWeight: "700" },
  addCartBtn: {
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
    shadowRadius: 24,
    elevation: 8,
  },
  addCartText: { color: "#0D0D0D", fontSize: 18, fontWeight: "700" },
});
