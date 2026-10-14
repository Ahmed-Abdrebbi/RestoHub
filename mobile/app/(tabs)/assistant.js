import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../../constants/theme";
import { MOCK_CHAT_MESSAGES } from "../../constants/mockData";
import ChatBubble from "../../components/ChatBubble";
import ChatConfirmationCard from "../../components/ChatConfirmationCard";

export default function Assistant() {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.botAvatar}>
            <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
            <View style={styles.onlineDot} />
          </View>
          <View>
            <Text style={styles.headerTitle}>Digital Waiter</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <View style={styles.pulseDot} />
              <Text style={styles.onlineText}>Online Assistant</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.headerBtn}>
          <Ionicons name="notifications-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Table status strip */}
      <View style={styles.statusStrip}>
        <View style={styles.statusLeft}>
          <Ionicons name="grid-outline" size={14} color={colors.primary} />
          <Text style={styles.statusText}>Table 14</Text>
          <View style={styles.dotSep} />
          <View style={styles.pulseDot} />
          <Text style={[styles.statusText, { color: colors.primary }]}>Instant Replies</Text>
        </View>
        <TouchableOpacity style={styles.callWaiterBtn}>
          <Ionicons name="person-outline" size={14} color={colors.textMuted} />
          <Text style={styles.callWaiterText}>Call Waiter</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Chat messages */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Timestamp divider */}
          <View style={styles.divider}>
            <Text style={styles.dividerText}>Today • 7:42 PM</Text>
          </View>

          {MOCK_CHAT_MESSAGES.map((msg) => {
            if (msg.role === "confirmation") {
              return (
                <ChatConfirmationCard
                  key={msg.id}
                  orderSummary={msg.orderSummary}
                />
              );
            }
            return <ChatBubble key={msg.id} message={msg} />;
          })}

          {/* Quick chips */}
          <View style={styles.chipsSection}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 8 }}>
              <Ionicons name="bulb-outline" size={14} color={colors.primary} />
              <Text style={styles.chipsLabel}>Quick Add & Preferences</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[
                { emoji: "🥤", label: "Add Craft Soda +$3.50" },
                { emoji: "⚠️", label: "Nut Allergy Notes" },
                { emoji: "💳", label: "Split Table Bill" },
                { emoji: "🍷", label: "Wine Pairing Recs" },
              ].map((chip, i) => (
                <TouchableOpacity key={i} style={styles.chip} activeOpacity={0.8}>
                  <Text style={{ fontSize: 14 }}>{chip.emoji}</Text>
                  <Text style={styles.chipText}>{chip.label}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        {/* Input bar */}
        <View style={styles.inputBar}>
          <View style={styles.inputRow}>
            <TouchableOpacity style={styles.micBtn}>
              <Ionicons name="mic-outline" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Ask about ingredients, wine, or modify order..."
              placeholderTextColor={colors.textMuted}
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity style={styles.sendBtn} activeOpacity={0.8}>
              <Ionicons name="send" size={19} color="#0D0D0D" />
            </TouchableOpacity>
          </View>
          <View style={styles.syncRow}>
            <View style={[styles.dotSep, { backgroundColor: "#FFB779" }]} />
            <Text style={styles.syncText}>Directly synchronized with Table 14 POS</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
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
  },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 10 },
  botAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255,102,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  onlineDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: colors.background,
  },
  headerTitle: { color: colors.text, fontSize: 17, fontWeight: "600" },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  onlineText: { color: colors.primary, fontSize: 11 },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  statusStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 28,
    paddingVertical: 8,
  },
  statusLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: { color: colors.text, fontSize: 11, fontWeight: "500" },
  dotSep: { width: 4, height: 4, borderRadius: 2, backgroundColor: colors.textMuted },
  callWaiterBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  callWaiterText: { color: colors.textMuted, fontSize: 11, fontWeight: "500" },
  chatContent: { paddingHorizontal: 24, paddingBottom: 8, paddingTop: 8 },
  divider: { alignItems: "center", marginVertical: 8 },
  dividerText: {
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 0.8,
    textTransform: "uppercase",
    backgroundColor: "#0E0E0E",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  chipsSection: { marginTop: 8 },
  chipsLabel: { color: colors.textMuted, fontSize: 11, fontWeight: "500" },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: { color: colors.text, fontSize: 11, fontWeight: "500" },
  inputBar: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 12 },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 6,
  },
  micBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  input: { flex: 1, color: colors.text, fontSize: 15, paddingVertical: 8 },
  sendBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    marginTop: 8,
  },
  syncText: { color: colors.textMuted, fontSize: 11 },
});
