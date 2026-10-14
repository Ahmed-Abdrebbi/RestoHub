import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../../constants/theme";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS } from "../../constants/mockData";
import MealCard from "../../components/MealCard";
import CategoryChip from "../../components/CategoryChip";

export default function Categories() {
  const [activeCategory, setActiveCategory] = useState(null);

  const filtered = activeCategory
    ? MOCK_MENU_ITEMS.filter((i) => i.categoryId === activeCategory)
    : MOCK_MENU_ITEMS;

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Categories</Text>
        <Text style={styles.headerSub}>Browse our full menu by category</Text>
      </View>

      {/* Category Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24, paddingRight: 24 }}
        style={{ marginBottom: 20, flexGrow: 0 }}
      >
        <TouchableOpacity
          style={[
            styles.pillChip,
            !activeCategory && styles.pillChipActive,
          ]}
          onPress={() => setActiveCategory(null)}
        >
          <Text
            style={[
              styles.pillText,
              !activeCategory && styles.pillTextActive,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        {MOCK_CATEGORIES.map((cat) => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.pillChip,
              activeCategory === cat.id && styles.pillChipActive,
            ]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Ionicons
              name={cat.icon}
              size={16}
              color={activeCategory === cat.id ? "#0D0D0D" : colors.textMuted}
            />
            <Text
              style={[
                styles.pillText,
                activeCategory === cat.id && styles.pillTextActive,
              ]}
            >
              {cat.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.gridWrap}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filtered.map((item) => (
            <MealCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 16 },
  headerTitle: { color: colors.text, fontSize: 26, fontWeight: "600" },
  headerSub: { color: colors.textMuted, fontSize: 15, marginTop: 4 },
  pillChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: colors.surface,
    marginRight: 8,
  },
  pillChipActive: {
    backgroundColor: colors.primary,
  },
  pillText: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
  pillTextActive: { color: "#0D0D0D" },
  gridWrap: { paddingHorizontal: 24, paddingBottom: 24 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
});
