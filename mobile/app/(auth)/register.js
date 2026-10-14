import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome, AntDesign } from '@expo/vector-icons';

export default function RegisterScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = () => {
    router.replace('/(tabs)/home');
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
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

      <Text style={styles.title}>Sign up</Text>
      <Text style={styles.subtitle}>Create an account to get started with delicious food.</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>FULL NAME</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={20} color="#FF6B00" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="e.g. John Doe"
            placeholderTextColor="#777"
            value={fullName}
            onChangeText={setFullName}
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>EMAIL ADDRESS</Text>
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
        <Text style={styles.label}>PASSWORD</Text>
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

      <View style={styles.inputContainer}>
        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <View style={styles.inputBox}>
          <Ionicons name="shield-outline" size={20} color="#FF6B00" style={styles.inputIcon} />
          <TextInput 
            style={styles.input}
            placeholder="••••••••••••"
            placeholderTextColor="#777"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons name={showConfirmPassword ? "eye-outline" : "eye-off-outline"} size={20} color="#777" />
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>OR SIGN UP WITH</Text>
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
        <Text style={styles.footerText}>Already have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
          <Text style={styles.signInLinkText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 24,
    paddingTop: 50,
    paddingBottom: 30,
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
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 26,
    height: 26,
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
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 14,
  },
  label: {
    color: '#AAA',
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B1B1B',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2A2A2A',
    paddingHorizontal: 14,
    height: 50,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 15,
  },
  signUpButton: {
    backgroundColor: '#FF6B00',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 25,
  },
  socialIconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
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
  signInLinkText: {
    color: '#FF6B00',
    fontSize: 13,
    fontWeight: 'bold',
  }
});