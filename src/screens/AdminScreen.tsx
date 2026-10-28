import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';

export const AdminScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { user, theme, formatINR, switchRole, transactions, totalBalance, totalIncome, totalExpense } = useApp();

  const mockUsers = [
    { id: '25030024', name: 'John Smith', role: 'Customer', balance: 7783.0, status: 'Active' },
    { id: '25030025', name: 'Priya Sharma', role: 'Customer', balance: 14500.0, status: 'Active' },
    { id: '25030026', name: 'Rahul Verma', role: 'Customer', balance: 9240.5, status: 'Active' },
    { id: '25030027', name: 'Ananya Patel', role: 'Customer', balance: 31200.0, status: 'Verified' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Admin Management"
        showBack={true}
        showDrawer={true}
        showNotification={true}
      />

      {/* Admin Title Card */}
      <View style={styles.topSection}>
        <View style={styles.roleBanner}>
          <MaterialCommunityIcons name="shield-account" size={24} color="#93C5FD" />
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitle}>Administrator Console</Text>
            <Text style={styles.bannerSubtitle}>Logged in as {user.name} ({user.id})</Text>
          </View>
          <TouchableOpacity
            style={styles.switchRoleBtn}
            onPress={() => switchRole('customer')}
            activeOpacity={0.8}
          >
            <Text style={styles.switchRoleText}>Switch to Customer</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Curved Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        >
          {/* Platform Financial Statistics in ₹ */}
          <Text style={[styles.sectionHeading, { color: theme.textPrimary }]}>
            Platform Overview (₹ INR)
          </Text>

          <View style={styles.statsGrid}>
            <View style={[styles.statBox, { backgroundColor: theme.cardWhite }]}>
              <View style={[styles.statIcon, { backgroundColor: '#EFF6FF' }]}>
                <Feather name="pie-chart" size={18} color="#2563EB" />
              </View>
              <Text style={styles.statLabel}>Platform Turnover</Text>
              <Text style={[styles.statValue, { color: theme.textPrimary }]}>
                {formatINR(totalIncome + 62723.5)}
              </Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: theme.cardWhite }]}>
              <View style={[styles.statIcon, { backgroundColor: '#E9F2FF' }]}>
                <Feather name="users" size={18} color="#3B82F6" />
              </View>
              <Text style={styles.statLabel}>Active Customers</Text>
              <Text style={[styles.statValue, { color: theme.textPrimary }]}>1,420</Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: theme.cardWhite }]}>
              <View style={[styles.statIcon, { backgroundColor: '#ECFDF5' }]}>
                <Feather name="arrow-up-right" size={18} color="#10B981" />
              </View>
              <Text style={styles.statLabel}>Total Inflows</Text>
              <Text style={[styles.statValue, { color: '#10B981' }]}>
                {formatINR(totalIncome)}
              </Text>
            </View>

            <View style={[styles.statBox, { backgroundColor: theme.cardWhite }]}>
              <View style={[styles.statIcon, { backgroundColor: '#FEE2E2' }]}>
                <Feather name="arrow-down-right" size={18} color="#EF4444" />
              </View>
              <Text style={styles.statLabel}>Total Outflows</Text>
              <Text style={[styles.statValue, { color: '#EF4444' }]}>
                {formatINR(totalExpense)}
              </Text>
            </View>
          </View>

          {/* Registered Users Section */}
          <Text style={[styles.sectionHeading, { color: theme.textPrimary, marginTop: 20 }]}>
            Customer Accounts
          </Text>

          {mockUsers.map((u) => (
            <View key={u.id} style={[styles.userRow, { backgroundColor: theme.cardWhite }]}>
              <View style={styles.userAvatar}>
                <Text style={styles.avatarLetter}>{u.name.charAt(0)}</Text>
              </View>

              <View style={styles.userInfo}>
                <Text style={[styles.userName, { color: theme.textPrimary }]}>{u.name}</Text>
                <Text style={styles.userId}>ID: {u.id} • {u.role}</Text>
              </View>

              <View style={styles.userBalanceCol}>
                <Text style={[styles.userBalance, { color: theme.textPrimary }]}>
                  {formatINR(u.balance)}
                </Text>
                <View style={styles.statusPill}>
                  <Text style={styles.statusText}>{u.status}</Text>
                </View>
              </View>
            </View>
          ))}

          {/* Audit Controls */}
          <Text style={[styles.sectionHeading, { color: theme.textPrimary, marginTop: 20 }]}>
            Admin Controls
          </Text>

          <TouchableOpacity
            style={[styles.adminActionBtn, { backgroundColor: theme.cardWhite }]}
            onPress={() => navigation.navigate('AnalysisTab')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="chart-box-outline" size={22} color="#00D09E" />
            <Text style={[styles.actionBtnText, { color: theme.textPrimary }]}>
              Inspect System Financial Analytics
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#A3C4BC" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.adminActionBtn, { backgroundColor: theme.cardWhite }]}
            onPress={() => navigation.navigate('TransactionTab')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="file-document-outline" size={22} color="#3299FF" />
            <Text style={[styles.actionBtnText, { color: theme.textPrimary }]}>
              Audit All Customer Transactions
            </Text>
            <Ionicons name="chevron-forward" size={18} color="#A3C4BC" />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  roleBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 14,
    gap: 12,
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  bannerSubtitle: {
    color: '#94A3B8',
    fontSize: 12,
    fontWeight: '500',
    marginTop: 2,
  },
  switchRoleBtn: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  switchRoleText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
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
  sectionHeading: {
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 12,
    letterSpacing: -0.3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statBox: {
    width: '48%',
    borderRadius: 20,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#7E9B95',
    fontWeight: '600',
    marginBottom: 2,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3299FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 15,
    fontWeight: '700',
  },
  userId: {
    fontSize: 11,
    color: '#7E9B95',
    fontWeight: '500',
    marginTop: 2,
  },
  userBalanceCol: {
    alignItems: 'flex-end',
  },
  userBalance: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 4,
  },
  statusPill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  statusText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '700',
  },
  adminActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    gap: 12,
  },
  actionBtnText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
  },
});

