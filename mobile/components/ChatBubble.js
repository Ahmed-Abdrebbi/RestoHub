import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing } from "../constants/theme";

export default function ChatBubble({ message }) {
  const isUser = message.role === "user";

  return (
    <View style={[styles.row, isUser && styles.rowUser]}>
      {!isUser && (
        <View style={styles.avatar}>
          <Ionicons name="hardware-chip-outline" size={18} color={colors.primary} />
          <View style={styles.onlineDot} />
        </View>
      )}

      <View style={styles.col}>
        <View style={[styles.bubble, isUser ? styles.bubbleUser : styles.bubbleAssistant]}>
          <Text style={[styles.text, isUser && styles.textUser]}>
            {message.text}
          </Text>
        </View>
        <View style={[styles.metaRow, isUser && { alignSelf: "flex-end" }]}>
          <Text style={styles.time}>{message.time}</Text>
          {isUser && (
            <Ionicons name="checkmark-done" size={13} color={colors.primary} />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    maxWidth: "88%",
    marginBottom: 12,
  },
  rowUser: {
    alignSelf: "flex-end",
    flexDirection: "row-reverse",
    maxWidth: "85%",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.border,
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
  col: {
    flexShrink: 1,
  },
  bubble: {
    borderRadius: 18,
    padding: 14,
  },
  bubbleAssistant: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 4,
  },
  bubbleUser: {
    backgroundColor: colors.primary,
    borderTopRightRadius: 4,
  },
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 22,
  },
  textUser: {
    color: "#0D0D0D",
    fontWeight: "500",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 4,
    paddingLeft: 4,
  },
  time: {
    color: colors.textMuted,
    fontSize: 11,
  },
});
