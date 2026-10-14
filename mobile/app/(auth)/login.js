import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.topLogoRow}>
          <View style={styles.miniDot} />
          <Text style={styles.topBrandText}>SMART MENU</Text>
        </View>
        <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
          <Text style={styles.skipText}>Skip Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Image 
          source={require('../../assets/image_72e9ff.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>Sign in</Text>
      <Text style={styles.subtitle}>Welcome back! Please enter your details.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email Address</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={20} color="#FF6B00" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="name@example.com"
            placeholderTextColor="#777"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={20} color="#FF6B00" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="••••••••••••"
            placeholderTextColor="#777"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.forgotContainer}>
        <Text style={styles.forgotText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
        <Text style={styles.signInButtonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OR SIGN IN WITH</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.socialRow}>
        <TouchableOpacity style={styles.socialIconBox}>
          <FontAwesome name="facebook" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBox}>
          <AntDesign name="google" size={20} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialIconBox}>
          <FontAwesome name="apple" size={20} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.footerRow}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  topLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF6B00',
    marginRight: 6,
  },
  topBrandText: {
    color: '#CCC',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  skipText: {
    color: '#FF6B00',
    fontSize: 14,
    fontWeight: '600',
  },
  logoContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 28,
    height: 28,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#CCC',
    fontSize: 13,
    marginBottom: 8,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    height: 52,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 25,
  },
  forgotText: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: '600',
  },
  signInButton: {
    backgroundColor: '#FF6B00',
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    fontSize: 10,
    paddingHorizontal: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 35,
  },
  socialIconBox: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: '#777',
    fontSize: 13,
  },
  signUpText: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: 'bold',
  }
});