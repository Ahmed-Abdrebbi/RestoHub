import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { sendChatMessage } from '../../services/chatService';

export default function AssistantScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeTool, setActiveTool] = useState(null);
  const scrollViewRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      id: 'init-1',
      role: 'assistant',
      text: "Hello! 👋 I'm your Digital Waiter today. Looking for chef recommendations, dietary pairings, or ready to order right now?",
      time: '7:42 PM',
    },
  ]);

  const handleSend = (textToSend) => {
    const text = (typeof textToSend === 'string' ? textToSend : inputText).trim();
    if (!text || isStreaming) return;

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: `u-${Date.now()}`,
      role: 'user',
      text,
      time: now,
    };

    const assistantMsgId = `a-${Date.now()}`;
    const assistantMsg = {
      id: assistantMsgId,
      role: 'assistant',
      text: '',
      time: now,
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInputText('');
    setIsStreaming(true);
    setActiveTool(null);

    sendChatMessage(text, {
      onToken: (token) => {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId ? { ...m, text: m.text + token } : m
          )
        );
      },
      onTool: (tool) => {
        const toolName = tool.name || tool.tool || (typeof tool === 'string' ? tool : 'Processing tool');
        setActiveTool(toolName);
      },
      onDone: () => {
        setIsStreaming(false);
        setActiveTool(null);
      },
      onError: (err) => {
        setIsStreaming(false);
        setActiveTool(null);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsgId
              ? {
                  ...m,
                  text: m.text ? m.text : 'Sorry, I encountered an issue connecting to the AI assistant.',
                  isError: true,
                }
              : m
          )
        );
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* Header Bar */}
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <View style={styles.botIconCircle}>
            <MaterialCommunityIcons name="robot" size={18} color="#FF6B00" />
          </View>
          <View>
            <Text style={styles.headerTitle}>Digital Waiter</Text>
            <Text style={styles.headerStatus}>{isStreaming ? '● Generating response...' : '● Online Assistant'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Table & Call Waiter Action Bar */}
      <View style={styles.actionsBar}>
        <View style={styles.tableBadge}>
          <Ionicons name="restaurant-outline" size={14} color="#FF6B00" />
          <Text style={styles.tableText}>Table 14 • </Text>
          <Text style={styles.tableStatus}>● Instant Replies</Text>
        </View>
        <TouchableOpacity style={styles.callWaiterBtn}>
          <Ionicons name="person-outline" size={14} color="#FFF" />
          <Text style={styles.callWaiterText}>Call Waiter</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timestampText}>TODAY • LIVE SESSION</Text>

      {/* Chat Messages List */}
      <ScrollView 
        ref={scrollViewRef}
        contentContainerStyle={styles.chatContainer} 
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.map((msg, index) => {
          if (msg.role === 'user') {
            return (
              <View key={msg.id} style={styles.userBubble}>
                <Text style={styles.userText}>{msg.text}</Text>
                <View style={styles.userTimeRow}>
                  <Text style={styles.userTimeText}>{msg.time}</Text>
                  <Ionicons name="checkmark-done" size={14} color="#FFF" />
                </View>
              </View>
            );
          }

          const isLastAssistant = msg.role === 'assistant' && index === messages.length - 1;

          return (
            <View key={msg.id} style={styles.botMessageRow}>
              <View style={styles.avatarMini}>
                <MaterialCommunityIcons name="robot" size={14} color="#FF6B00" />
              </View>
              <View style={[styles.botBubble, msg.isError && { borderColor: '#FF4D4D' }]}>
                {msg.text ? (
                  <Text style={[styles.botText, msg.isError && { color: '#FF7777' }]}>{msg.text}</Text>
                ) : (
                  <ActivityIndicator size="small" color="#FF6B00" style={{ alignSelf: 'flex-start', marginVertical: 4 }} />
                )}

                {isLastAssistant && activeTool ? (
                  <View style={styles.infoBox}>
                    <Ionicons name="construct-outline" size={16} color="#FF6B00" />
                    <Text style={styles.infoBoxText}>Chef AI status: {activeTool}...</Text>
                  </View>
                ) : null}

                <Text style={styles.timeText}>{msg.time}</Text>
              </View>
            </View>
          );
        })}

        {/* Quick Add Preferences Chips */}
        <Text style={styles.quickAddLabel}>💡 Quick Suggestions</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          <TouchableOpacity style={styles.chip} onPress={() => handleSend('What burgers do you recommend?')}>
            <Text style={styles.chipText}>🍔 Popular Burgers</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip} onPress={() => handleSend('Do you have gluten-free or allergen-safe options?')}>
            <Text style={styles.chipText}>⚠️ Allergen & Gluten-Free</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip} onPress={() => handleSend('What craft drinks or sodas are available?')}>
            <Text style={styles.chipText}>🥤 Drink Recommendations</Text>
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>

      {/* Input Field Bar */}
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TouchableOpacity style={{ marginRight: 8 }}>
            <Ionicons name="mic-outline" size={20} color="#777" />
          </TouchableOpacity>
          <TextInput 
            style={styles.input}
            placeholder="Ask about ingredients, wine, or menu..."
            placeholderTextColor="#777"
            value={inputText}
            onChangeText={setInputText}
            onSubmitEditing={() => handleSend()}
          />
          <TouchableOpacity 
            style={[styles.sendButton, (!inputText.trim() || isStreaming) && { opacity: 0.6 }]}
            onPress={() => handleSend()}
            disabled={!inputText.trim() || isStreaming}
          >
            <Ionicons name="send" size={16} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.bottomSyncText}>• Directly synchronized with Table 14 POS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: 45,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  botIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B00',
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerStatus: {
    color: '#FF6B00',
    fontSize: 11,
  },
  notificationBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  tableBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 4,
  },
  tableText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  tableStatus: {
    color: '#FF6B00',
    fontSize: 12,
  },
  callWaiterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 6,
  },
  callWaiterText: {
    color: '#FFF',
    fontSize: 12,
  },
  timestampText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  chatContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  botMessageRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  avatarMini: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  avatarMiniOrange: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botBubble: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    padding: 14,
    borderRadius: 16,
    borderTopLeftRadius: 4,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  botText: {
    color: '#DDD',
    fontSize: 14,
    lineHeight: 20,
  },
  highlightText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#252525',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    gap: 8,
  },
  infoBoxText: {
    color: '#FFF',
    fontSize: 12,
    flex: 1,
  },
  timeText: {
    color: '#666',
    fontSize: 10,
    marginTop: 6,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF6B00',
    padding: 14,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    maxWidth: '85%',
    marginBottom: 16,
  },
  userText: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 20,
  },
  userTimeRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  userTimeText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 10,
  },
  orderCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#333',
  },
  orderCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cartIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderCardTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  orderCardSubtitle: {
    color: '#888',
    fontSize: 11,
  },
  pendingBadge: {
    backgroundColor: '#2A2518',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  pendingText: {
    color: '#FFA500',
    fontSize: 10,
    fontWeight: 'bold',
  },
  imagePreviewRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  previewBox: {
    width: 100,
  },
  previewImage: {
    width: 100,
    height: 60,
    borderRadius: 10,
    marginBottom: 4,
  },
  placeholderDip: {
    backgroundColor: '#333',
  },
  previewLabel: {
    color: '#AAA',
    fontSize: 11,
    textAlign: 'center',
  },
  orderItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  itemSub: {
    color: '#777',
    fontSize: 11,
  },
  itemPrice: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 10,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    color: '#777',
    fontSize: 12,
  },
  priceVal: {
    color: '#AAA',
    fontSize: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    color: '#777',
    fontSize: 10,
    fontWeight: 'bold',
  },
  totalVal: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  etaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#282828',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  etaText: {
    color: '#DDD',
    fontSize: 11,
  },
  orderActionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  modifyBtn: {
    flex: 1,
    backgroundColor: '#333',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  modifyBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  confirmBtn: {
    flex: 1,
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    gap: 6,
  },
  confirmBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  statusFooter: {
    color: '#666',
    fontSize: 11,
    textAlign: 'center',
    marginBottom: 15,
  },
  quickAddLabel: {
    color: '#888',
    fontSize: 12,
    marginBottom: 10,
  },
  chipsRow: {
    gap: 8,
  },
  chip: {
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  chipText: {
    color: '#DDD',
    fontSize: 12,
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingBottom: 25,
    backgroundColor: '#121212',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    height: 48,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontSize: 13,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSyncText: {
    color: '#666',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 6,
  }
});