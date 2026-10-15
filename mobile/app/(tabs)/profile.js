import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(true);
  const [pushAlerts, setPushAlerts] = useState(true);

  const handleLogout = () => {
    router.replace('/(auth)/login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.headerBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.notificationBtn}>
          <Ionicons name="notifications-outline" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileCard}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color="#FF6B00" />
            </View>
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Ionicons name="pencil" size={12} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <View style={styles.userNameRow}>
              <Text style={styles.userName}>Alex Johnson</Text>
              <View style={styles.vipBadge}>
                <Text style={styles.vipText}>● VIP</Text>
              </View>
            </View>
            <Text style={styles.userEmail}>alex.johnson@email.com</Text>
            <View style={styles.userStatusRow}>
              <Ionicons name="star-outline" size={12} color="#FF6B00" />
              <Text style={styles.statusText}>Gold Foodie • Table #04</Text>
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>20</Text>
            <Text style={styles.statLabel}>Total Visits</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1,420</Text>
            <Text style={styles.statLabel}>Ember Pts</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Level 3</Text>
            <Text style={styles.statLabel}>Tier Status</Text>
          </View>
        </View>
      </View>

      <View style={styles.walletCard}>
        <View style={styles.walletLeft}>
          <View style={styles.walletIconBox}>
            <Ionicons name="wallet-outline" size={20} color="#FF6B00" />
          </View>
          <View>
            <Text style={styles.walletLabel}>SMART WALLET BALANCE</Text>
            <Text style={styles.walletBalance}>$148.50 <Text style={styles.currencyText}>USD</Text></Text>
          </View>
        </View>
        <TouchableOpacity style={styles.topUpBtn}>
          <Ionicons name="add" size={16} color="#FFF" />
          <Text style={styles.topUpText}>Top Up</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionHeaderTitle}>PREFERENCES</Text>
      <View style={styles.menuGroup}>
        <View style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="moon-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Dark Mode</Text>
            <Text style={styles.menuSubtitle}>Obsidian high-contrast theme</Text>
          </View>
          <Switch 
            value={darkMode} 
            onValueChange={setDarkMode}
            trackColor={{ false: '#333', true: '#FF6B00' }}
            thumbColor="#FFF"
          />
        </View>

        <View style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="notifications-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Push Alerts</Text>
            <Text style={styles.menuSubtitle}>Order ready & chef updates</Text>
          </View>
          <Switch 
            value={pushAlerts} 
            onValueChange={setPushAlerts}
            trackColor={{ false: '#333', true: '#FF6B00' }}
            thumbColor="#FFF"
          />
        </View>
      </View>

      <Text style={styles.sectionHeaderTitle}>MENU & ACCOUNT</Text>
      <View style={styles.menuGroup}>
        <TouchableOpacity style={styles.menuItemRow} onPress={() => router.push('/order/orders')}>
          <View style={styles.menuIconBox}>
            <Ionicons name="receipt-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Order History</Text>
            <Text style={styles.menuSubtitle}>2 active, 18 completed</Text>
          </View>
          <View style={styles.orangeDot} />
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="heart-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Favorites</Text>
            <Text style={styles.menuSubtitle}>12 saved dishes</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="globe-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Language</Text>
            <Text style={styles.menuSubtitle}>Interface voice & text</Text>
          </View>
          <View style={styles.langBadge}>
            <Text style={styles.langText}>English (US)</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="options-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Settings</Text>
            <Text style={styles.menuSubtitle}>Preferences & Security</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="help-circle-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>FAQ & Help Support</Text>
            <Text style={styles.menuSubtitle}>Live waiter assistance</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="document-text-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Terms of Use</Text>
            <Text style={styles.menuSubtitle}>Restaurant & payment rules</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItemRow}>
          <View style={styles.menuIconBox}>
            <Ionicons name="shield-checkmark-outline" size={18} color="#FF6B00" />
          </View>
          <View style={styles.menuTextContainer}>
            <Text style={styles.menuTitle}>Privacy Policy</Text>
            <Text style={styles.menuSubtitle}>Your data & preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#777" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color="#FF4D4D" style={{ marginRight: 8 }} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Smart Menu v2.4.1 • Table Experience Engine</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 45,
    paddingBottom: 40,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  notificationBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: '#1B1B1B',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileCard: {
    backgroundColor: '#1B1B1B',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 16,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 14,
  },
  avatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#2A1A10',
    borderWidth: 1,
    borderColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B00',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 2,
  },
  userName: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  vipBadge: {
    backgroundColor: '#2A1A10',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  vipText: {
    color: '#FF6B00',
    fontSize: 10,
    fontWeight: 'bold',
  },
  userEmail: {
    color: '#888',
    fontSize: 12,
    marginBottom: 4,
  },
  userStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    color: '#DDD',
    fontSize: 11,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#252525',
    paddingTop: 14,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  statLabel: {
    color: '#777',
    fontSize: 10,
  },
  walletCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  walletIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2A1A10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletLabel: {
    color: '#777',
    fontSize: 9,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  walletBalance: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  currencyText: {
    fontSize: 11,
    color: '#777',
  },
  topUpBtn: {
    backgroundColor: '#FF6B00',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 4,
  },
  topUpText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  sectionHeaderTitle: {
    color: '#777',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  menuGroup: {
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    marginBottom: 20,
    overflow: 'hidden',
  },
  menuItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  menuIconBox: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  menuSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  orangeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
    marginRight: 8,
  },
  langBadge: {
    backgroundColor: '#252525',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    marginRight: 6,
  },
  langText: {
    color: '#AAA',
    fontSize: 11,
  },
  logoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#221515',
    borderRadius: 14,
    height: 48,
    borderWidth: 1,
    borderColor: '#3D1B1B',
    marginBottom: 16,
  },
  logoutText: {
    color: '#FF4D4D',
    fontSize: 14,
    fontWeight: 'bold',
  },
  versionText: {
    textAlign: 'center',
    color: '#555',
    fontSize: 10,
  },
});