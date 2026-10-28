import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

export const ForgotPasswordScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, showAlert } = useApp();

  const [email, setEmail] = useState('');
  const [pinSent, setPinSent] = useState(false);
  const [pin, setPin] = useState(['2', '7', '3', '9', '1', '6']);

  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 28 : 20);

  const handleSendReset = () => {
    if (!email.trim() || !email.includes('@')) {
      showAlert('Invalid Email', 'Please enter a valid email address to receive password reset PIN.', 'warning');
      return;
    }
    setPinSent(true);
    showAlert('PIN Sent! ✉️', `A 6-digit recovery PIN has been sent to ${email}. Check your inbox.`);
  };

  const handleVerifyPin = () => {
    showAlert('Password Reset ✨', 'Your temporary security PIN has been verified. You can now log in.');
    navigation.navigate('Login');
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={[styles.headerArea, { paddingTop: topPadding + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {pinSent ? 'Security Pin' : 'Forgot Password'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        {!pinSent ? (
          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Reset Password?</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              Enter your registered email address below. We'll send you a 6-digit verification code to reset your account credentials.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Enter Email Address</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
                <TextInput
                  style={[styles.inputField, { color: theme.textPrimary }]}
                  placeholder="example@example.com"
                  placeholderTextColor={theme.textMuted}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.primary }]}
              onPress={handleSendReset}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>Next Step</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.backLink}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.7}
            >
              <Text style={[styles.backLinkText, { color: theme.textSecondary }]}>
                Remember password? <Text style={{ color: theme.primary, fontWeight: '700' }}>Sign In</Text>
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>Enter Security Pin</Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              We have dispatched a verification PIN code to {email}.
            </Text>

            <View style={styles.pinRow}>
              {pin.map((digit, idx) => (
                <View key={idx} style={[styles.pinBox, { borderColor: theme.primary }]}>
                  <Text style={[styles.pinDigit, { color: theme.primary }]}>{digit}</Text>
                </View>
              ))}
            </View>

            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: theme.primary, marginTop: 24 }]}
              onPress={handleVerifyPin}
              activeOpacity={0.85}
            >
              <Text style={styles.actionBtnText}>Accept</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.sendAgainBtn, { backgroundColor: theme.mintSoft }]}
              onPress={() => showAlert('Resent Code', 'A new verification code was sent to your email.')}
              activeOpacity={0.85}
            >
              <Text style={[styles.sendAgainText, { color: theme.textPrimary }]}>Send Again</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 24,
    paddingTop: 32,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrapper: {
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 52,
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 15,
    fontWeight: '600',
  },
  actionBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  sendAgainBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
  },
  sendAgainText: {
    fontSize: 16,
    fontWeight: '700',
  },
  backLink: {
    alignItems: 'center',
    marginTop: 24,
    paddingVertical: 8,
  },
  backLinkText: {
    fontSize: 14,
  },
  pinRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  pinBox: {
    width: 44,
    height: 48,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  pinDigit: {
    fontSize: 20,
    fontWeight: '800',
  },
});

