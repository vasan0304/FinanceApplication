import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export const WelcomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme } = useApp();

  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 32 : 24);
  const bottomPadding = Math.max(insets.bottom, 24);

  return (
    <View style={[styles.container, { backgroundColor: theme.mintBackground, paddingTop: topPadding, paddingBottom: bottomPadding }]}>
      {/* Upper Section / Logo */}
      <View style={styles.content}>
        <View style={styles.logoBadge}>
          <MaterialCommunityIcons name="chart-bell-curve-cumulative" size={72} color={theme.primary} />
        </View>

        <Text style={[styles.brandTitle, { color: theme.primary }]}>FinWise</Text>
        <Text style={[styles.brandSubtitle, { color: theme.textSecondary }]}>
          Smart budget and expense tracking application tailored for Indian Rupees (₹).
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.loginBtn, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.85}
        >
          <Text style={styles.loginBtnText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.signupBtn, { backgroundColor: theme.mintSoft }]}
          onPress={() => navigation.navigate('SignUp')}
          activeOpacity={0.85}
        >
          <Text style={[styles.signupBtnText, { color: theme.textPrimary }]}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          activeOpacity={0.7}
          style={styles.forgotLink}
        >
          <Text style={[styles.forgotText, { color: theme.textSecondary }]}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.dividerRow}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR DIRECT ACCESS</Text>
          <View style={styles.line} />
        </View>

        {/* Quick Demo Enter Button */}
        <TouchableOpacity
          style={styles.demoBtn}
          onPress={() => navigation.replace('MainDrawer')}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="lightning-bolt" size={18} color="#2563EB" />
          <Text style={styles.demoBtnText}>Explore Dashboard as Customer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoBadge: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  brandTitle: {
    fontSize: 40,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 12,
  },
  brandSubtitle: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    paddingHorizontal: 16,
    maxWidth: 320,
  },
  buttonContainer: {
    width: '100%',
    paddingBottom: 16,
  },
  loginBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  signupBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  signupBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  forgotLink: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 12,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#D0EBDD',
  },
  orText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#7E9B95',
    letterSpacing: 0.8,
  },
  demoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#00D09E',
  },
  demoBtnText: {
    color: '#0E3E3E',
    fontSize: 14,
    fontWeight: '700',
  },
});

