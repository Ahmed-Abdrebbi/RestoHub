import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../../constants/theme";
import { MOCK_CATEGORIES, MOCK_MENU_ITEMS, FEATURED_BANNER, MOCK_USER } from "../../constants/mockData";
import MealCard from "../../components/MealCard";
import CategoryChip from "../../components/CategoryChip";

export default function Home() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("c1");

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Ionicons name="restaurant" size={24} color={colors.primary} />
          <Text style={styles.headerTitle}>Smart Menu</Text>
        </View>
        <TouchableOpacity style={styles.avatarBtn}>
          <Ionicons name="person" size={18} color={colors.background} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Greeting */}
        <View style={styles.greetingRow}>
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Text style={styles.greetSub}>Hello {MOCK_USER.name.split(" ")[0]}</Text>
              <Text style={{ fontSize: 16 }}>👋</Text>
            </View>
            <Text style={styles.greetMain}>What meal do you want?</Text>
          </View>
          <TouchableOpacity style={styles.bellBtn}>
            <Ionicons name="notifications-outline" size={22} color={colors.text} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Ionicons name="search" size={20} color={colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search delicious food..."
              placeholderTextColor={colors.textMuted}
            />
          </View>
          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Featured Banner */}
        <TouchableOpacity
          style={styles.banner}
          activeOpacity={0.9}
          onPress={() => router.push(`/menu-item/${FEATURED_BANNER.itemId}`)}
        >
          <View style={styles.bannerGlow} />
          <View style={styles.bannerContent}>
            <View style={styles.bannerBadge}>
              <Text style={styles.bannerBadgeText}>{FEATURED_BANNER.badge}</Text>
            </View>
            <Text style={styles.bannerTitle}>{FEATURED_BANNER.title}</Text>
            <Text style={styles.bannerSub}>{FEATURED_BANNER.subtitle}</Text>
            <TouchableOpacity style={styles.bannerCta}>
              <Text style={styles.bannerCtaText}>Order now</Text>
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: FEATURED_BANNER.image }}
            style={styles.bannerImage}
          />
        </TouchableOpacity>

        {/* Banner indicators */}
        <View style={styles.indicators}>
          <View style={[styles.indicator, styles.indicatorActive]} />
          <View style={styles.indicator} />
          <View style={styles.indicator} />
        </View>

        {/* Categories */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => router.push("/(tabs)/categories")}
          >
            <Text style={styles.seeMore}>See more</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
          style={{ marginBottom: 24 }}
        >
          {MOCK_CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              active={activeCategory === cat.id}
              onPress={() => setActiveCategory(cat.id)}
            />
          ))}
        </ScrollView>

        {/* Popular Meals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Meals</Text>
          <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.seeMore}>See more</Text>
            <Ionicons name="chevron-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {MOCK_MENU_ITEMS.slice(0, 4).map((item) => (
            <MealCard key={item.id} item={item} />
          ))}
        </View>

        {/* Kitchen Status Pill */}
        <View style={styles.kitchenCard}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            <View style={styles.boltWrap}>
              <Ionicons name="flash" size={20} color={colors.primary} />
            </View>
            <View>
              <Text style={styles.kitchenTitle}>Fast Track Kitchen</Text>
              <Text style={styles.kitchenSub}>Average table delivery: ~14 mins</Text>
            </View>
          </View>
          <View style={styles.livePill}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        </View>
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
    backgroundColor: colors.background,
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 8 },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: "600" },
  avatarBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 24 },
  greetingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    marginTop: 8,
  },
  greetSub: { color: colors.textMuted, fontSize: 15 },
  greetMain: { color: colors.text, fontSize: 26, fontWeight: "600", marginTop: 2 },
  bellBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  bellDot: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  searchRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 20 },
  searchWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
    gap: 10,
  },
  searchInput: { flex: 1, color: colors.text, fontSize: 15 },
  filterBtn: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    borderRadius: 20,
    overflow: "hidden",
    minHeight: 168,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  bannerGlow: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primary,
    opacity: 1,
  },
  bannerContent: {
    flex: 1,
    padding: 20,
    zIndex: 2,
  },
  bannerBadge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(87,32,0,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginBottom: 8,
  },
  bannerBadgeText: { color: "#0D0D0D", fontSize: 10, fontWeight: "700", letterSpacing: 0.8, textTransform: "uppercase" },
  bannerTitle: { color: "#0D0D0D", fontSize: 22, fontWeight: "700", lineHeight: 26, marginBottom: 4 },
  bannerSub: { color: "rgba(13,13,13,0.75)", fontSize: 12, marginBottom: 12 },
  bannerCta: {
    alignSelf: "flex-start",
    backgroundColor: colors.text,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  bannerCtaText: { color: colors.background, fontSize: 13, fontWeight: "700" },
  bannerImage: {
    width: "40%",
    height: "120%",
    resizeMode: "contain",
    position: "absolute",
    right: -12,
    bottom: -8,
  },
  indicators: { flexDirection: "row", justifyContent: "center", gap: 6, marginBottom: 24 },
  indicator: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.border },
  indicatorActive: { width: 24, backgroundColor: colors.primary },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sectionTitle: { color: colors.text, fontSize: 22, fontWeight: "700" },
  seeMore: { color: colors.primary, fontSize: 13, fontWeight: "600" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 20,
  },
  kitchenCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#0E0E0E",
    borderRadius: 20,
    padding: 16,
  },
  boltWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,102,0,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  kitchenTitle: { color: colors.text, fontSize: 13, fontWeight: "700" },
  kitchenSub: { color: colors.textMuted, fontSize: 11 },
  livePill: {
    backgroundColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  liveText: { color: colors.primary, fontSize: 10, fontWeight: "600" },
});
