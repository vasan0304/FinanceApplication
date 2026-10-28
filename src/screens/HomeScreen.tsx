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
  FontAwesome5,
  Feather,
} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionItem } from '../components/TransactionItem';
import { ReportFilter } from '../types';

export const HomeScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const {
    user,
    theme,
    reportFilter,
    setReportFilter,
    filteredTransactions,
    filteredIncome,
    filteredExpense,
    totalBalance,
    formatINR,
  } = useApp();

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Custom Header */}
      <Header
        showBack={false}
        showDrawer={true}
        showNotification={true}
      />

      {/* Greeting Title */}
      <View style={styles.greetingSection}>
        <View>
          <Text style={styles.greetingTitle}>Hi, Welcome Back</Text>
          <Text style={styles.greetingSubtitle}>Good Morning, {user.name}</Text>
        </View>

        {user.role === 'admin' && (
          <TouchableOpacity
            style={styles.adminPill}
            onPress={() => navigation.navigate('AdminPanel')}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="shield-crown" size={16} color="#93C5FD" />
            <Text style={styles.adminPillText}>Admin Panel</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Balance & Expense Summary Card */}
      <SummaryCard showProgress={true} />

      {/* Curved Bottom Container */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: insets.bottom + 80 },
          ]}
        >
          {/* Savings On Goals Card */}
          <View style={[styles.goalsCard, { backgroundColor: theme.cardWhite }]}>
            <View style={styles.goalsLeft}>
              <View style={[styles.goalsCircleOuter, { borderColor: theme.primary }]}>
                <View style={[styles.goalsCircleInner, { backgroundColor: theme.primaryLight }]}>
                  <MaterialCommunityIcons name="car-outline" size={26} color={theme.primary} />
                </View>
              </View>
              <Text style={[styles.goalsTitle, { color: theme.textPrimary }]}>Savings</Text>
              <Text style={[styles.goalsSubtitle, { color: theme.textSecondary }]}>On Goals</Text>
            </View>

            <View style={[styles.goalsDivider, { backgroundColor: theme.divider }]} />

            <View style={styles.goalsRight}>
              {/* Revenue Metric */}
              <View style={styles.goalMetricRow}>
                <View style={[styles.goalMetricIcon, { backgroundColor: theme.primaryLight }]}>
                  <MaterialCommunityIcons name="cash-multiple" size={20} color={theme.primary} />
                </View>
                <View>
                  <Text style={[styles.goalMetricLabel, { color: theme.textSecondary }]}>Revenue Last Week</Text>
                  <Text style={[styles.goalMetricValue, { color: theme.textPrimary }]}>
                    {formatINR(4000.0)}
                  </Text>
                </View>
              </View>

              <View style={[styles.goalInnerDivider, { backgroundColor: theme.divider }]} />

              {/* Food Metric */}
              <View style={styles.goalMetricRow}>
                <View style={[styles.goalMetricIcon, { backgroundColor: '#FEE2E2' }]}>
                  <MaterialCommunityIcons name="silverware-fork-knife" size={18} color="#EF4444" />
                </View>
                <View>
                  <Text style={[styles.goalMetricLabel, { color: theme.textSecondary }]}>Food Last Week</Text>
                  <Text style={[styles.goalMetricValue, { color: '#EF4444' }]}>
                    -₹100.00
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Report Timeframe Filter Pills (Daily / Weekly / Monthly) */}
          <View style={styles.filterSection}>
            <View style={[styles.filterContainer, { backgroundColor: theme.mintSoft }]}>
              {(['daily', 'weekly', 'monthly'] as ReportFilter[]).map((tab) => {
                const isActive = reportFilter === tab;
                return (
                  <TouchableOpacity
                    key={tab}
                    style={[
                      styles.filterTab,
                      isActive && [styles.filterTabActive, { backgroundColor: theme.primary }],
                    ]}
                    onPress={() => setReportFilter(tab)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.filterTabText,
                        isActive ? styles.filterTabTextActive : { color: theme.textSecondary },
                      ]}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* Quick Filter Summary Pill */}
          <View style={[styles.periodSummaryRow, { backgroundColor: theme.cardWhite }]}>
            <View style={styles.periodSummaryCol}>
              <Text style={[styles.periodSummaryLabel, { color: theme.textSecondary }]}>
                {reportFilter.toUpperCase()} INFLOW
              </Text>
              <Text style={[styles.periodSummaryVal, { color: '#10B981' }]}>
                +{formatINR(filteredIncome)}
              </Text>
            </View>
            <View style={[styles.summaryVerticalDivider, { backgroundColor: theme.divider }]} />
            <View style={styles.periodSummaryCol}>
              <Text style={[styles.periodSummaryLabel, { color: theme.textSecondary }]}>
                {reportFilter.toUpperCase()} OUTFLOW
              </Text>
              <Text style={[styles.periodSummaryVal, { color: '#EF4444' }]}>
                -{formatINR(filteredExpense)}
              </Text>
            </View>
          </View>

          {/* Header Row for Transactions */}
          <View style={styles.sectionHeaderRow}>
            <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
              Recent Transactions
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('TransactionTab')}
              activeOpacity={0.7}
            >
              <Text style={[styles.seeAllText, { color: theme.primary }]}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Filtered Transactions List */}
          {filteredTransactions.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="clipboard-text-outline" size={44} color={theme.textMuted} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No transactions recorded for this period.
              </Text>
            </View>
          ) : (
            filteredTransactions.slice(0, 6).map((tx) => (
              <TransactionItem
                key={tx.id}
                transaction={tx}
                onPress={() => {
                  if (tx.category === 'Food') {
                    navigation.navigate('CategoryDetails', { categoryName: 'Food' });
                  } else {
                    navigation.navigate('TransactionTab');
                  }
                }}
              />
            ))
          )}

          {/* Quick Add Expense Button */}
          <TouchableOpacity
            style={[styles.floatingAddBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('AddExpense')}
            activeOpacity={0.85}
          >
            <Feather name="plus" size={20} color="#FFFFFF" />
            <Text style={styles.floatingAddText}>Add New Expense / Income</Text>
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
  greetingSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  greetingTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  greetingSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '500',
    marginTop: 2,
  },
  adminPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  adminPillText: {
    color: '#93C5FD',
    fontSize: 12,
    fontWeight: '700',
  },
  sheet: {
    flex: 1,
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  goalsCard: {
    borderRadius: 24,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  goalsLeft: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  goalsCircleOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  goalsCircleInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalsTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  goalsSubtitle: {
    fontSize: 11,
    fontWeight: '500',
  },
  goalsDivider: {
    width: 1,
    height: 70,
    marginHorizontal: 16,
  },
  goalsRight: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
  },
  goalMetricRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  goalMetricIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalMetricLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  goalMetricValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  goalInnerDivider: {
    height: 1,
  },
  filterSection: {
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: 'row',
    borderRadius: 22,
    padding: 4,
  },
  filterTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 18,
  },
  filterTabActive: {
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '600',
  },
  filterTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  periodSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  periodSummaryCol: {
    flex: 1,
    alignItems: 'center',
  },
  periodSummaryLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  periodSummaryVal: {
    fontSize: 15,
    fontWeight: '800',
  },
  summaryVerticalDivider: {
    width: 1,
    height: 24,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 8,
  },
  floatingAddBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 50,
    borderRadius: 25,
    marginTop: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  floatingAddText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
