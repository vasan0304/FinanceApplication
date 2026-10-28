import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Switch,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export const EditProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, theme, updateProfile, showAlert, isDarkMode } = useApp();

  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [pushEnabled, setPushEnabled] = useState(user.notificationsEnabled);
  const [darkMode, setDarkMode] = useState(user.isDarkMode);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => {
    setErrorMessage('');
    if (!name.trim()) {
      setErrorMessage('Name cannot be empty.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone.trim() || phone.length < 8) {
      setErrorMessage('Please enter a valid phone number.');
      return;
    }

    updateProfile({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      notificationsEnabled: pushEnabled,
      isDarkMode: darkMode,
    });

    showAlert('Profile Updated ✨', `Your account information for ${name.trim()} was saved.`);
    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Notch Safe Header */}
      <Header
        title="Edit My Profile"
        showBack={true}
        showDrawer={false}
        showNotification={true}
      />

      {/* Avatar Section matching Figma 9.5.1 */}
      <View style={styles.avatarSection}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: user.avatar }} style={styles.avatarImage} />
          <TouchableOpacity
            style={[styles.cameraBadge, { backgroundColor: theme.primary }]}
            onPress={() => showAlert('Change Photo 📷', 'Avatar upload picker simulated.')}
            activeOpacity={0.8}
          >
            <Ionicons name="camera" size={16} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userId}>ID: {user.id}</Text>
      </View>

      {/* Curved White Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        >
          <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
            Account Settings
          </Text>

          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#FF3B30" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Username */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Username</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                value={name}
                onChangeText={setName}
                placeholder="Full Name"
                placeholderTextColor={theme.textMuted}
              />
            </View>
          </View>

          {/* Phone */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Phone</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholder="+91..."
                placeholderTextColor={theme.textMuted}
              />
            </View>
          </View>

          {/* Email Address */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Email Address</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="Email Address"
                placeholderTextColor={theme.textMuted}
              />
            </View>
          </View>

          {/* Toggle Push Notifications */}
          <View style={[styles.toggleRow, { backgroundColor: theme.cardWhite }]}>
            <View style={styles.toggleTextGroup}>
              <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
                Push Notifications
              </Text>
              <Text style={styles.toggleSub}>
                Receive alerts for new transactions
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: '#D0EBDD', true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Toggle Dark Theme */}
          <View style={[styles.toggleRow, { backgroundColor: theme.cardWhite }]}>
            <View style={styles.toggleTextGroup}>
              <Text style={[styles.toggleLabel, { color: theme.textPrimary }]}>
                Turn Dark Theme
              </Text>
              <Text style={styles.toggleSub}>
                Switch UI contrast for low-light use
              </Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={(val) => {
                setDarkMode(val);
                updateProfile({ isDarkMode: val });
              }}
              trackColor={{ false: '#D0EBDD', true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* Update Profile Button matching Figma 9.5.1 */}
          <TouchableOpacity
            style={[styles.updateBtn, { backgroundColor: theme.primary }]}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.updateBtnText}>Update Profile</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    paddingBottom: 16,
  },
  avatarWrapper: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    position: 'relative',
    marginBottom: 8,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#00D09E',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0E3E3E',
  },
  userId: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0E3E3E',
    opacity: 0.75,
    marginTop: 2,
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
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
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  inputWrapper: {
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
  },
  inputField: {
    fontSize: 14,
    fontWeight: '600',
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
  },
  toggleTextGroup: {
    flex: 1,
    marginRight: 12,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  toggleSub: {
    fontSize: 12,
    color: '#7E9B95',
  },
  updateBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  updateBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

