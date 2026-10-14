import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Hna kandirou timer dyal 3 secondes bach ydoz l'page dyal Login automatique
    const timer = setTimeout(() => {
      router.replace('/(auth)/login'); // wla l'page li bghitiha tban be3d splash
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      {/* L'logo dyalek mcentri */}
      <Image 
        source={require('../assets/image_72e9ff.png')} // تأكد من المسار ديال الصورة
        style={styles.logo}
        resizeMode="contain"
      />
      
      {/* Titer li bayen f l'maquette */}
      <Text style={styles.title}>Smart Menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEDE0', // L'couleur li 3titini
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderRadius: 20, // bach t3ti dak l'effet arrondi li f tsawira
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF6B00', // L'couleur orange dyal l'ktaba li f design
    letterSpacing: 1,
  }
});