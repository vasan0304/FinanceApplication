import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useApp } from '../context/AppContext';

export const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const insets = useSafeAreaInsets();
  const { user, theme, switchRole, logout } = useApp();

  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 28 : 20);

  const navItems = [
    {
      label: 'Home Dashboard',
      icon: 'home-outline',
      iconFamily: 'Ionicons',
      route: 'MainTabs',
      screen: 'HomeTab',
    },
    {
      label: 'Analysis & Trends',
      icon: 'bar-chart-outline',
      iconFamily: 'Ionicons',
      route: 'MainTabs',
      screen: 'AnalysisTab',
    },
    {
      label: 'All Transactions',
      icon: 'swap-horizontal',
      iconFamily: 'Ionicons',
      route: 'MainTabs',
      screen: 'TransactionTab',
    },
    {
      label: 'Categories',
      icon: 'layers-outline',
      iconFamily: 'Ionicons',
      route: 'MainTabs',
      screen: 'CategoriesTab',
    },
    {
      label: 'Customer Profile',
      icon: 'person-outline',
      iconFamily: 'Ionicons',
      route: 'MainTabs',
      screen: 'ProfileTab',
    },
    {
      label: 'Admin Console',
      icon: 'shield-outline',
      iconFamily: 'Ionicons',
      route: 'AdminPanel',
    },
    {
      label: 'Notifications',
      icon: 'notifications-outline',
      iconFamily: 'Ionicons',
      route: 'Notification',
    },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.cardWhite }]}>
      {/* Notch Safe Drawer Header */}
      <View style={[styles.drawerHeader, { paddingTop: topPadding + 12, backgroundColor: theme.primary }]}>
        <View style={styles.userRow}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.roleBadge}>
              <Text style={styles.roleText}>{user.role.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Drawer Links */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.menuContainer}
      >
        <Text style={[styles.menuHeading, { color: theme.textMuted }]}>MAIN NAVIGATION</Text>

        {navItems.map((item, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.navItem}
            onPress={() => {
              props.navigation.closeDrawer();
              if (item.screen) {
                props.navigation.navigate(item.route, { screen: item.screen });
              } else {
                props.navigation.navigate(item.route);
              }
            }}
            activeOpacity={0.7}
          >
            <View style={[styles.navIconBox, { backgroundColor: theme.primaryLight }]}>
              <Ionicons name={item.icon as any} size={20} color={theme.primary} />
            </View>
            <Text style={[styles.navLabel, { color: theme.textPrimary }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        {/* Role Switcher Button */}
        <View style={[styles.divider, { backgroundColor: theme.divider }]} />
        <Text style={[styles.menuHeading, { color: theme.textMuted }]}>ACCOUNT CONTROLS</Text>

        <TouchableOpacity
          style={[styles.roleSwitchCard, { backgroundColor: theme.mintSoft }]}
          onPress={() => {
            props.navigation.closeDrawer();
            switchRole(user.role === 'customer' ? 'admin' : 'customer');
          }}
          activeOpacity={0.8}
        >
          <MaterialCommunityIcons name="swap-horizontal-bold" size={20} color={theme.primary} />
          <View style={{ flex: 1 }}>
            <Text style={[styles.roleSwitchTitle, { color: theme.textPrimary }]}>
              {user.role === 'customer' ? 'Switch to Admin' : 'Switch to Customer'}
            </Text>
            <Text style={[styles.roleSwitchSub, { color: theme.textSecondary }]}>
              Tap to toggle between roles
            </Text>
          </View>
        </TouchableOpacity>

        {/* Logout */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            props.navigation.closeDrawer();
            logout();
            props.navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }}
          activeOpacity={0.7}
        >
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>End Session / Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Drawer Footer */}
      <View style={[styles.drawerFooter, { paddingBottom: Math.max(insets.bottom, 16), borderTopColor: theme.divider }]}>
        <Text style={[styles.footerBrand, { color: theme.textPrimary }]}>FinWise • MCA Practical Exam</Text>
        <Text style={[styles.footerSub, { color: theme.textSecondary }]}>Indian Rupees (₹) • Notch-Safe</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  userEmail: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.85)',
    marginTop: 2,
  },
  roleBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0F172A',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 6,
  },
  roleText: {
    color: '#93C5FD',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  menuContainer: {
    padding: 16,
  },
  menuHeading: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.6,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginBottom: 4,
    gap: 12,
  },
  navIconBox: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 14,
  },
  roleSwitchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginBottom: 12,
  },
  roleSwitchTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  roleSwitchSub: {
    fontSize: 11,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    gap: 12,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#EF4444',
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingTop: 12,
    borderTopWidth: 1,
    alignItems: 'center',
  },
  footerBrand: {
    fontSize: 11,
    fontWeight: '700',
  },
  footerSub: {
    fontSize: 10,
    marginTop: 2,
  },
});
