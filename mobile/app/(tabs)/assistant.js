import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function AssistantScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');

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
            <Text style={styles.headerStatus}>● Online Assistant</Text>
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

      <Text style={styles.timestampText}>TODAY • 7:42 PM</Text>

      {/* Chat Messages List */}
      <ScrollView contentContainerStyle={styles.chatContainer} showsVerticalScrollIndicator={false}>
        {/* Bot Greeting */}
        <View style={styles.botMessageRow}>
          <View style={styles.avatarMini}>
            <MaterialCommunityIcons name="robot" size={14} color="#FF6B00" />
          </View>
          <View style={styles.botBubble}>
            <Text style={styles.botText}>
              Hello Alex! 👋 I'm your Digital Waiter today. Looking for chef recommendations, dietary pairings, or ready to order right now?
            </Text>
            <Text style={styles.timeText}>7:42 PM</Text>
          </View>
        </View>

        {/* User Request */}
        <View style={styles.userBubble}>
          <Text style={styles.userText}>
            Can you recommend a burger and check if you have gluten-free buns?
          </Text>
          <View style={styles.userTimeRow}>
            <Text style={styles.userTimeText}>7:43 PM</Text>
            <Ionicons name="checkmark-done" size={14} color="#FFF" />
          </View>
        </View>

        {/* Bot Recommendation */}
        <View style={styles.botMessageRow}>
          <View style={styles.avatarMini}>
            <MaterialCommunityIcons name="robot" size={14} color="#FF6B00" />
          </View>
          <View style={styles.botBubble}>
            <Text style={styles.botText}>
              Our <Text style={styles.highlightText}>Cheesy Bacon Burger Deluxe</Text> is the kitchen favorite tonight!
            </Text>
            <View style={styles.infoBox}>
              <Ionicons name="checkmark-circle-outline" size={18} color="#FFF" />
              <Text style={styles.infoBoxText}>
                Freshly baked artisanal gluten-free brioche is available upon request!
              </Text>
            </View>
            <Text style={styles.botText}>Shall I prepare this for your table?</Text>
            <Text style={styles.timeText}>7:43 PM</Text>
          </View>
        </View>

        {/* User Confirmation */}
        <View style={styles.userBubble}>
          <Text style={styles.userText}>
            Yes please, 1 Cheesy Bacon Burger Deluxe with extra cheese, and 1 Truffle Garlic Mayo Dip.
          </Text>
          <View style={styles.userTimeRow}>
            <Text style={styles.userTimeText}>7:44 PM</Text>
            <Ionicons name="checkmark-done" size={14} color="#FFF" />
          </View>
        </View>

        {/* Order Summary Card from AI Agent */}
        <View style={styles.botMessageRow}>
          <View style={styles.avatarMiniOrange}>
            <Ionicons name="receipt-outline" size={14} color="#FFF" />
          </View>
          <View style={styles.orderCard}>
            <View style={styles.orderCardHeader}>
              <View style={styles.cartIconCircle}>
                <Ionicons name="cart-outline" size={16} color="#FF6B00" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.orderCardTitle}>Order Summary</Text>
                <Text style={styles.orderCardSubtitle}>Review before sending to kitchen</Text>
              </View>
              <View style={styles.pendingBadge}>
                <Text style={styles.pendingText}>Pending</Text>
              </View>
            </View>

            {/* Images Preview Row */}
            <View style={styles.imagePreviewRow}>
              <View style={styles.previewBox}>
                <Image source={require('../../assets/burger pic.png')} style={styles.previewImage} />
                <Text style={styles.previewLabel}>Bacon Burger</Text>
              </View>
              <View style={styles.previewBox}>
                <View style={[styles.previewImage, styles.placeholderDip]} />
                <Text style={styles.previewLabel}>Truffle Mayo</Text>
              </View>
            </View>

            {/* Order Items List */}
            <View style={styles.orderItemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>1x Cheesy Bacon Burger Del...</Text>
                <Text style={styles.itemSub}>Gluten-free bun, Extra Aged Cheddar</Text>
              </View>
              <Text style={styles.itemPrice}>$14.99</Text>
            </View>

            <View style={styles.orderItemRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>1x Truffle Garlic Mayo Dip</Text>
                <Text style={styles.itemSub}>House special recipe</Text>
              </View>
              <Text style={styles.itemPrice}>$1.00</Text>
            </View>

            <View style={styles.divider} />

            {/* Price Calculations */}
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Estimated Tax (8%)</Text>
              <Text style={styles.priceVal}>$1.28</Text>
            </View>

            <View style={styles.totalRow}>
              <View>
                <Text style={styles.totalLabel}>TOTAL AMOUNT</Text>
                <Text style={styles.totalVal}>$17.27</Text>
              </View>
              <View style={styles.etaBadge}>
                <Ionicons name="flash-outline" size={14} color="#FFF" />
                <Text style={styles.etaText}>Kitchen ETA: 12-15m</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.orderActionsRow}>
              <TouchableOpacity style={styles.modifyBtn}>
                <Ionicons name="create-outline" size={16} color="#FFF" />
                <Text style={styles.modifyBtnText}>Modify</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmBtn}>
                <Ionicons name="restaurant-outline" size={16} color="#FFF" />
                <Text style={styles.confirmBtnText}>Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <Text style={styles.statusFooter}>7:44 PM • Awaiting confirmation</Text>

        {/* Quick Add Preferences Chips */}
        <Text style={styles.quickAddLabel}>💡 Quick Add & Preferences</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>🥤 Add Craft Soda +$3.50</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>⚠️ Nut Allergy Notes</Text>
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
            placeholder="Ask about ingredients, wine, or m..."
            placeholderTextColor="#777"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton}>
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