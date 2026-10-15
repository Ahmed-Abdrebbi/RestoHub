import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function OrderConfirmationModal({ visible = true, onClose }) {
  const router = useRouter();

  const handleTrackOrder = () => {
    if (onClose) onClose();
    router.replace('/order/orders');
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <View style={styles.iconCircle}>
            <MaterialCommunityIcons name="party-popper" size={32} color="#FF6B00" />
          </View>

          <Text style={styles.title}>Congratulations!</Text>
          
          <Text style={styles.subtitle}>
            Your order has been confirmed successfully
          </Text>

          <View style={styles.orderBadge}>
            <Ionicons name="receipt-outline" size={14} color="#FFF" />
            <Text style={styles.orderBadgeText}>ORDER #SM-84920 • DELIVERY</Text>
          </View>

          <TouchableOpacity style={styles.trackBtn} onPress={handleTrackOrder}>
            <Text style={styles.trackBtnText}>Track Order / Ok</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  modalCard: {
    width: '100%',
    backgroundColor: '#1E1E1E',
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2A1A10',
    borderWidth: 1,
    borderColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#AAA',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  orderBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161616',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    gap: 6,
    marginBottom: 24,
  },
  orderBadgeText: {
    color: '#DDD',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  trackBtn: {
    width: '100%',
    backgroundColor: '#FF6B00',
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});