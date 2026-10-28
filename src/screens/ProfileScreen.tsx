import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Ionicons,
  Feather,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export const ProfileScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, theme, logout, switchRole, showAlert } = useApp();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const menuItems = [
    {
      id: 'edit',
      title: 'Edit Profile',
      icon: 'person-outline',
      iconFamily: 'Ionicons',
      bgColor: '#3299FF',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'security',
      title: 'Security',
      icon: 'shield-checkmark-outline',
      iconFamily: 'Ionicons',
      bgColor: '#3299FF',
      onPress: () => showAlert('Security Settings 🔒', 'Fingerprint Biometric Authentication and 2FA are Active on your device.'),
    },
    {
      id: 'settings',
      title: 'Setting',
      icon: 'settings-outline',
      iconFamily: 'Ionicons',
      bgColor: '#3299FF',
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'help',
      title: 'Help',
      icon: 'help-circle-outline',
      iconFamily: 'Ionicons',
      bgColor: '#3299FF',
      onPress: () => showAlert('FinWise Help Center 💡', 'Need help? Contact support 24/7 at support@finwise.in or dial 1800-FIN-WISE.'),
    },
    {
      id: 'switch_role',
      title: user.role === 'customer' ? 'Switch to Admin Role' : 'Switch to Customer Role',
      icon: 'swap-horizontal',
      iconFamily: 'Ionicons',
      bgColor: '#2563EB',
      onPress: () => switchRole(user.role === 'customer' ? 'admin' : 'customer'),
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: 'log-out-outline',
      iconFamily: 'Ionicons',
      bgColor: '#3299FF',
      onPress: () => setShowLogoutModal(true),
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Profile"
        showBack={false}
        showDrawer={true}
        showNotification={true}
      />

      {/* User Info Upper Header matching Figma 9.5.0 */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image
            source={{ uri: user.avatar }}
            style={styles.avatarImage}
          />
        </View>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userId}>ID: {user.id}</Text>
      </View>

      {/* Curved White Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        >
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[styles.menuRow, { backgroundColor: theme.cardWhite }]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconBox, { backgroundColor: item.bgColor }]}>
                <Ionicons name={item.icon as any} size={22} color="#FFFFFF" />
              </View>

              <Text style={[styles.menuTitle, { color: theme.textPrimary }]}>
                {item.title}
              </Text>

              <Ionicons name="chevron-forward" size={20} color="#A3C4BC" />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* End Session Confirmation Modal matching Figma 9.5.5 - B */}
      <Modal
        visible={showLogoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalBox, { backgroundColor: theme.cardWhite }]}>
            <Text style={[styles.modalTitle, { color: theme.textPrimary }]}>
              End Session
            </Text>
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              Are you sure you want to log out?
            </Text>

            <TouchableOpacity
              style={[styles.confirmLogoutBtn, { backgroundColor: theme.primary }]}
              onPress={() => {
                setShowLogoutModal(false);
                logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Welcome' }],
                });
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.confirmLogoutText}>Yes, End Session</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.cancelBtn, { backgroundColor: theme.mintSoft }]}
              onPress={() => setShowLogoutModal(false)}
              activeOpacity={0.85}
            >
              <Text style={[styles.cancelBtnText, { color: theme.textPrimary }]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileHeader: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  avatarWrapper: {
    width: 86,
    height: 86,
    borderRadius: 43,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userId: {
    fontSize: 12,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.85)',
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
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  menuIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  menuTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(9, 42, 42, 0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  confirmLogoutBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  confirmLogoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  cancelBtn: {
    width: '100%',
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelBtnText: {
    fontSize: 15,
    fontWeight: '700',
  },
});

