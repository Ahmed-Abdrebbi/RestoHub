import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingTrackingScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/(auth)/login');
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeaderContainer}>
        <ImageBackground 
          source={require('../assets/pic3.png')} 
          style={styles.bgImage}
          resizeMode="cover"
        >
          <View style={styles.imageOverlay} />
        </ImageBackground>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.stepBadgeBox}>
          <Ionicons name="navigate-outline" size={12} color="#FF6B00" style={{ marginRight: 6 }} />
          <Text style={styles.stepBadgeText}>STEP 03 / 03</Text>
        </View>

        <Text style={styles.title}>Track your order now!</Text>
        
        <Text style={styles.description}>
          Watch your meal arrive in real time from our kitchen flame straight to your table or doorstep with precision live tracking.
        </Text>

        <View style={styles.liveCard}>
          <View style={styles.orangeBarIndicator} />
          <View style={styles.liveIconBox}>
            <View style={styles.orangeDotMini} />
          </View>
          <View style={styles.liveTextContainer}>
            <View style={styles.liveHeaderRow}>
              <Text style={styles.liveTitle}>Live GPS & Table Beac...</Text>
              <View style={styles.liveBadge}>
                <Text style={styles.liveBadgeText}>● LIVE</Text>
              </View>
            </View>
            <Text style={styles.liveSubtitle}>
              Real-time updates with estimated arrival down to the minute.
            </Text>
          </View>
        </View>

        <View style={styles.dotsRow}>
          <View style={styles.inactiveDot} />
          <View style={styles.inactiveDot} />
          <View style={styles.activeDot} />
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.getStartedBtn} onPress={handleGetStarted}>
            <Text style={styles.getStartedBtnText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'space-between',
  },
  imageHeaderContainer: {
    height: '45%',
    width: '100%',
  },
  bgImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.3)',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#121212',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -25,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 35,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stepBadgeBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  stepBadgeText: {
    color: '#CCC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFF',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 8,
  },
  description: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginVertical: 8,
  },
  liveCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    width: '100%',
    marginVertical: 10,
    position: 'relative',
    overflow: 'hidden',
  },
  orangeBarIndicator: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#FF6B00',
  },
  liveIconBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    position: 'relative',
  },
  orangeDotMini: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B00',
  },
  liveTextContainer: {
    flex: 1,
  },
  liveHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  liveTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  liveBadge: {
    backgroundColor: '#2A1A10',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 107, 0, 0.3)',
  },
  liveBadgeText: {
    color: '#FF6B00',
    fontSize: 9,
    fontWeight: 'bold',
  },
  liveSubtitle: {
    color: '#777',
    fontSize: 11,
    lineHeight: 15,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 15,
  },
  activeDot: {
    width: 28,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
  },
  inactiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#333',
  },
  buttonsRow: {
    flexDirection: 'row',
    width: '100%',
    gap: 12,
  },
  skipBtn: {
    flex: 1,
    backgroundColor: '#1B1B1B',
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  skipBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  getStartedBtn: {
    flex: 2,
    backgroundColor: '#FF6B00',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  getStartedBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});