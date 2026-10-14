import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../../constants/theme";
import { useAuthStore } from "../../store/useAuthStore";
import { MOCK_USER } from "../../constants/mockData";

export default function Register() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  const handleRegister = () => {
    setAuth({ user: { ...MOCK_USER, name }, accessToken: "mock-token", refreshToken: "mock-refresh" });
    router.replace("/(tabs)/home");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <StatusBar barStyle="light-content" backgroundColor={colors.background} />

        {/* Top bar */}
        <View style={styles.topBar}>
          <View style={styles.brandRow}>
            <View style={styles.brandDot} />
            <Text style={styles.brandLabel}>SMART MENU</Text>
          </View>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.skipText}>Back</Text>
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={styles.headerSection}>
          <View style={styles.iconBox}>
            <Ionicons name="person-add" size={24} color={colors.primary} />
          </View>
          <Text style={styles.heading}>Create account</Text>
          <Text style={styles.subtitle}>Join Smart Menu and start ordering.</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Full Name */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="person-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Alex Johnson"
                placeholderTextColor={colors.textMuted}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>

          {/* Email */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="name@example.com"
                placeholderTextColor={colors.textMuted}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>
          </View>

          {/* Password */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color={colors.textMuted} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Create a strong password"
                placeholderTextColor={colors.textMuted}
                secureTextEntry={!showPw}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={() => setShowPw(!showPw)} style={{ padding: 4 }}>
                <Ionicons name={showPw ? "eye-off-outline" : "eye-outline"} size={20} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* CTA */}
          <TouchableOpacity style={styles.primaryBtn} activeOpacity={0.85} onPress={handleRegister}>
            <Text style={styles.primaryBtnText}>Create account</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
            <Text style={styles.footerLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingHorizontal: 24, paddingBottom: 40 },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 56,
    marginBottom: 24,
  },
  brandRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  brandDot: {
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: colors.primary,
    shadowColor: colors.primary, shadowOpacity: 0.8, shadowRadius: 8, elevation: 4,
  },
  brandLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "500", letterSpacing: 2 },
  skipText: { color: colors.textMuted, fontSize: 13, fontWeight: "600" },
  headerSection: { marginBottom: 24 },
  iconBox: {
    width: 48, height: 48, borderRadius: 14,
    backgroundColor: colors.border, alignItems: "center", justifyContent: "center", marginBottom: 16,
  },
  heading: { color: colors.text, fontSize: 26, fontWeight: "600", letterSpacing: -0.3 },
  subtitle: { color: colors.textMuted, fontSize: 15, marginTop: 4 },
  form: { gap: 16 },
  fieldGroup: { gap: 6 },
  label: { color: colors.textMuted, fontSize: 13, fontWeight: "600", letterSpacing: 0.4 },
  inputWrap: {
    flexDirection: "row", alignItems: "center",
    backgroundColor: colors.surface, borderRadius: 14, height: 56, paddingHorizontal: 16,
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, color: colors.text, fontSize: 15 },
  primaryBtn: {
    height: 56, borderRadius: 14, backgroundColor: colors.primary,
    alignItems: "center", justifyContent: "center",
    shadowColor: "#FF6600", shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 8, marginTop: 4,
  },
  primaryBtnText: { color: "#0D0D0D", fontSize: 16, fontWeight: "700" },
  footer: { flexDirection: "row", justifyContent: "center", marginTop: 32 },
  footerText: { color: colors.textMuted, fontSize: 15 },
  footerLink: { color: colors.primary, fontSize: 15, fontWeight: "700" },
});
