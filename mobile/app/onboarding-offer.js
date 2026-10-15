import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function OnboardingOfferScreen() {
  const router = useRouter();

  const handleNext = () => {
    router.push('/(auth)/login');
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageHeaderContainer}>
        <ImageBackground 
          source={require('../assets/pic2.png')} 
          style={styles.bgImage}
          resizeMode="cover"
        >
          <View style={styles.imageOverlay} />
        </ImageBackground>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.stepBadgeBox}>
          <Text style={styles.giftIcon}>🎁</Text>
          <Text style={styles.stepBadgeText}>STEP 02 / 03</Text>
        </View>

        <Text style={styles.title}>Get a special offer!</Text>
        
        <Text style={styles.description}>
          Unlock exclusive member discounts, daily chef surprises, and zero-fee express delivery directly to your table or doorstep.
        </Text>

        <View style={styles.perkCard}>
          <View style={styles.perkIconBox}>
            <Ionicons name="flame" size={20} color="#FF6B00" />
          </View>
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>First order perk</Text>
            <Text style={styles.perkSubtitle}>Instant 30% discount applied at checkout</Text>
          </View>
          <View style={styles.vipBadge}>
            <Text style={styles.vipBadgeText}>VIP</Text>
          </View>
        </View>

        <View style={styles.dotsRow}>
          <View style={styles.inactiveDot} />
          <View style={styles.activeDot} />
          <View style={styles.inactiveDot} />
        </View>

        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Next</Text>
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
    backgroundColor: 'rgba(18, 18, 18, 0.4)',
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
    gap: 6,
  },
  giftIcon: {
    fontSize: 12,
  },
  stepBadgeText: {
    color: '#CCC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  description: {
    color: '#888',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 19,
    marginVertical: 10,
  },
  perkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    width: '100%',
    marginVertical: 10,
  },
  perkIconBox: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#252525',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  perkTextContainer: {
    flex: 1,
  },
  perkTitle: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  perkSubtitle: {
    color: '#777',
    fontSize: 11,
  },
  vipBadge: {
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  vipBadgeText: {
    color: '#AAA',
    fontSize: 10,
    fontWeight: 'bold',
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
  nextBtn: {
    flex: 2,
    backgroundColor: '#FF6B00',
    height: 52,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});