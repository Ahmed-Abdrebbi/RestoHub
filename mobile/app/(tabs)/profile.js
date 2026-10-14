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
import { colors, radius, spacing } from "../../constants/theme";
import { MOCK_USER } from "../../constants/mockData";
import { useAuthStore } from "../../store/useAuthStore";

const MENU_ITEMS = [
  { icon: "person-outline", label: "Edit Profile", route: null },
  { icon: "location-outline", label: "Delivery Addresses", route: null },
  { icon: "card-outline", label: "Payment Methods", route: null },
  { icon: "receipt-outline", label: "Order History", route: "/orders" },
  { icon: "notifications-outline", label: "Notifications", route: null },
  { icon: "help-circle-outline", label: "Help & Support", route: null },
  { icon: "shield-checkmark-outline", label: "Privacy Policy", route: null },
];

export default function Profile() {
  const router = useRouter();
  const clearAuth = useAuthStore((s) => s.clearAuth);

  const handleLogout = () => {
    clearAuth();
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        {/* Avatar Card */}
        <View style={styles.avatarCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {MOCK_USER.name.split(" ").map((w) => w[0]).join("")}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.userName}>{MOCK_USER.name}</Text>
            <Text style={styles.userEmail}>{MOCK_USER.email}</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Ionicons name="create-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Menu items */}
        <View style={styles.menuCard}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.menuRow,
                index < MENU_ITEMS.length - 1 && styles.menuRowBorder,
              ]}
              onPress={() => item.route && router.push(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrap}>
                <Ionicons name={item.icon} size={20} color={colors.textMuted} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#FF4B4B" />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>Smart Menu v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 40 },
  header: { paddingHorizontal: 24, paddingTop: 56, paddingBottom: 16 },
  headerTitle: { color: colors.text, fontSize: 26, fontWeight: "600" },
  avatarCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 20,
    gap: 14,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#0D0D0D", fontSize: 20, fontWeight: "700" },
  userName: { color: colors.text, fontSize: 17, fontWeight: "600" },
  userEmail: { color: colors.textMuted, fontSize: 13, marginTop: 2 },
  editBtn: { padding: 8 },
  menuCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    marginHorizontal: 24,
    marginBottom: 20,
    overflow: "hidden",
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    gap: 14,
  },
  menuRowBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  menuLabel: { flex: 1, color: colors.text, fontSize: 15, fontWeight: "500" },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "rgba(255,75,75,0.08)",
    borderRadius: 14,
    marginBottom: 16,
  },
  logoutText: { color: "#FF4B4B", fontSize: 15, fontWeight: "600" },
  version: { color: colors.textMuted, fontSize: 11, textAlign: "center" },
});
