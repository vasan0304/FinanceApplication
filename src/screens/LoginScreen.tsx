import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { UserRole } from '../types';

export const LoginScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, login } = useApp();

  const [email, setEmail] = useState('john.smith@finwise.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<UserRole>('customer');
  const [errorMessage, setErrorMessage] = useState('');

  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 28 : 20);

  const handleLogin = () => {
    setErrorMessage('');
    if (!email.trim()) {
      setErrorMessage('Please enter your username or email address.');
      return;
    }
    if (!email.includes('@') && email.trim().length < 3) {
      setErrorMessage('Please enter a valid email or username.');
      return;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters.');
      return;
    }

    login(email.trim(), selectedRole);
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainDrawer' }],
    });
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Notch Safe Top Header */}
      <View style={[styles.headerArea, { paddingTop: topPadding + 10 }]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Welcome</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Curved White Sheet Matching Figma 3.0-A */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 24 }]}
        >
          {/* Role Selection Switch (Customer vs Admin) */}
          <Text style={[styles.sectionLabel, { color: theme.textSecondary }]}>Select User Type</Text>
          <View style={styles.roleToggleRow}>
            <TouchableOpacity
              style={[
                styles.roleBtn,
                selectedRole === 'customer' && styles.roleBtnActive,
              ]}
              onPress={() => {
                setSelectedRole('customer');
                setEmail('john.smith@finwise.com');
              }}
              activeOpacity={0.8}
            >
              <Feather
                name="user"
                size={16}
                color={selectedRole === 'customer' ? '#FFFFFF' : theme.textPrimary}
              />
              <Text
                style={[
                  styles.roleBtnText,
                  selectedRole === 'customer' ? styles.roleBtnTextActive : { color: theme.textPrimary },
                ]}
              >
                Customer
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleBtn,
                selectedRole === 'admin' && styles.roleBtnActive,
              ]}
              onPress={() => {
                setSelectedRole('admin');
                setEmail('admin@finwise.com');
              }}
              activeOpacity={0.8}
            >
              <Feather
                name="shield"
                size={16}
                color={selectedRole === 'admin' ? '#FFFFFF' : theme.textPrimary}
              />
              <Text
                style={[
                  styles.roleBtnText,
                  selectedRole === 'admin' ? styles.roleBtnTextActive : { color: theme.textPrimary },
                ]}
              >
                Admin
              </Text>
            </TouchableOpacity>
          </View>

          {/* Error Message */}
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#FF3B30" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Username / Email Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Username Or Email</Text>
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

          {/* Password Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Password</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                placeholder="••••••••"
                placeholderTextColor={theme.textMuted}
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeBtn}
                activeOpacity={0.7}
              >
                <Feather
                  name={showPassword ? 'eye' : 'eye-off'}
                  size={18}
                  color={theme.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Log In Button */}
          <TouchableOpacity
            style={[styles.loginBtn, { backgroundColor: theme.primary }]}
            onPress={handleLogin}
            activeOpacity={0.85}
          >
            <Text style={styles.loginBtnText}>Log In</Text>
          </TouchableOpacity>

          {/* Forgot Password */}
          <TouchableOpacity
            style={styles.forgotBtn}
            onPress={() => navigation.navigate('ForgotPassword')}
            activeOpacity={0.7}
          >
            <Text style={[styles.forgotText, { color: theme.textPrimary }]}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* Sign Up Alternative */}
          <TouchableOpacity
            style={[styles.signupBtn, { backgroundColor: theme.mintSoft }]}
            onPress={() => navigation.navigate('SignUp')}
            activeOpacity={0.85}
          >
            <Text style={[styles.signupBtnText, { color: theme.textPrimary }]}>Sign Up</Text>
          </TouchableOpacity>

          {/* Biometrics */}
          <View style={styles.biometricRow}>
            <Text style={[styles.bioText, { color: theme.textSecondary }]}>
              Use <Text style={{ color: '#3299FF', fontWeight: '700' }}>Fingerprint</Text> To Access
            </Text>
          </View>
        </ScrollView>
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
    paddingTop: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  roleToggleRow: {
    flexDirection: 'row',
    backgroundColor: '#E2F6EB',
    borderRadius: 16,
    padding: 4,
    marginBottom: 20,
    gap: 6,
  },
  roleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 12,
    gap: 6,
  },
  roleBtnActive: {
    backgroundColor: '#2563EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  roleBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  roleBtnTextActive: {
    color: '#FFFFFF',
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEAEA',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  inputGroup: {
    marginBottom: 18,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 52,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  eyeBtn: {
    padding: 6,
  },
  loginBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
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
  forgotBtn: {
    alignItems: 'center',
    paddingVertical: 6,
    marginBottom: 14,
  },
  forgotText: {
    fontSize: 13,
    fontWeight: '600',
  },
  signupBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signupBtnText: {
    fontSize: 16,
    fontWeight: '700',
  },
  biometricRow: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  bioText: {
    fontSize: 13,
    fontWeight: '500',
  },
});

