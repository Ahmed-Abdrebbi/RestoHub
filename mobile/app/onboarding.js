import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      stepBadge: 'STEP 01 / 03',
      title: 'Choose your meal!',
      description: 'Explore our curated chef selection, discover daily artisan specials, and order with speed right to your table or doorstep.',
    },
    {
      stepBadge: 'STEP 02 / 03',
      title: 'Digital Waiter AI',
      description: 'Ask our AI assistant for wine pairings, allergy check, or instant custom recommendations suited to your taste.',
    },
    {
      stepBadge: 'STEP 03 / 03',
      title: 'Track in Real-Time',
      description: 'Follow every stage of your order live—from flame-grilling in the kitchen straight to your table.',
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      router.replace('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.replace('/(auth)/login');
  };

  return (
    <View style={styles.container}>
      {/* Grid Collages / Gallery Header */}
      <View style={styles.galleryContainer}>
        <View style={styles.columnLeft}>
          <View style={[styles.imageCard, { height: 210 }]}>
            <Image source={require('../assets/burger pic.png')} style={styles.cardImg} resizeMode="cover" />
          </View>
          <View style={[styles.imageCard, { height: 100, backgroundColor: '#1A1A1A' }]}>
            <View style={styles.darkTextCard}>
              <Text style={styles.darkCardSubtitle}>Welcome to The Cavern</Text>
              <Text style={styles.darkCardTitle}>Explore Our Signatures</Text>
            </View>
          </View>
        </View>

        <View style={styles.columnMiddle}>
          <View style={[styles.imageCard, { height: 130 }]}>
            <View style={styles.pizzaPlaceholder} />
          </View>
          <View style={[styles.imageCard, { height: 180 }]}>
            <View style={styles.chickenPlaceholder}>
              <View style={styles.brandBadge}>
                <View style={styles.orangeDot} />
                <Text style={styles.brandBadgeText}>SMART MENU</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.columnRight}>
          <View style={[styles.imageCard, { height: 120 }]}>
            <View style={styles.dessertPlaceholder} />
          </View>
          <View style={[styles.imageCard, { height: 190 }]}>
            <View style={styles.drinkPlaceholder} />
          </View>
        </View>
      </View>

      {/* Content Section */}
      <View style={styles.contentContainer}>
        <View style={styles.stepBadgeBox}>
          <Ionicons name="restaurant-outline" size={12} color="#FF6B00" style={{ marginRight: 6 }} />
          <Text style={styles.stepBadgeText}>{steps[currentStep].stepBadge}</Text>
        </View>

        <Text style={styles.title}>{steps[currentStep].title}</Text>
        <Text style={styles.description}>{steps[currentStep].description}</Text>

        {/* Pagination Dots */}
        <View style={styles.dotsRow}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentStep === index ? styles.activeDot : styles.inactiveDot,
              ]}
            />
          ))}
        </View>

        {/* Bottom Actions Row */}
        <View style={styles.buttonsRow}>
          <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
            <Text style={styles.skipBtnText}>Skip</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
            <Text style={styles.nextBtnText}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
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
    paddingTop: 40,
    paddingBottom: 35,
  },
  galleryContainer: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    gap: 8,
    height: '48%',
    overflow: 'hidden',
  },
  columnLeft: {
    flex: 1.2,
    gap: 8,
  },
  columnMiddle: {
    flex: 1.2,
    gap: 8,
  },
  columnRight: {
    flex: 1,
    gap: 8,
  },
  imageCard: {
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#1E1E1E',
    borderWidth: 1,
    borderColor: '#2A2A2A',
  },
  cardImg: {
    width: '100%',
    height: '100%',
  },
  darkTextCard: {
    padding: 10,
    justifyContent: 'center',
    flex: 1,
  },
  darkCardSubtitle: {
    color: '#666',
    fontSize: 9,
  },
  darkCardTitle: {
    color: '#AAA',
    fontSize: 11,
    fontWeight: 'bold',
  },
  pizzaPlaceholder: {
    flex: 1,
    backgroundColor: '#2A2018',
  },
  chickenPlaceholder: {
    flex: 1,
    backgroundColor: '#251A12',
    padding: 8,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  brandBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  orangeDot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#FF6B00',
  },
  brandBadgeText: {
    color: '#FFF',
    fontSize: 9,
    fontWeight: 'bold',
  },
  dessertPlaceholder: {
    flex: 1,
    backgroundColor: '#201815',
  },
  drinkPlaceholder: {
    flex: 1,
    backgroundColor: '#1C1C1C',
  },
  contentContainer: {
    paddingHorizontal: 24,
    alignItems: 'center',
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
    marginBottom: 16,
  },
  stepBadgeText: {
    color: '#CCC',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  title: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 30,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    width: 28,
    backgroundColor: '#FF6B00',
  },
  inactiveDot: {
    width: 6,
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