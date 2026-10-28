import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { TransactionItem } from '../components/TransactionItem';

type TxFilter = 'all' | 'income' | 'expense';

export const TransactionsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { transactions, totalBalance, totalIncome, totalExpense, formatINR, theme } = useApp();

  const [filter, setFilter] = useState<TxFilter>('all');

  // Month-wise grouping requirement:
  // "4. Transaction (month wise) Screen (only Customer) - 5 Marks"
  const groupedByMonth = useMemo(() => {
    const filtered = transactions.filter((t) => {
      if (filter === 'all') return true;
      return t.type === filter;
    });

    const groups: Record<string, typeof transactions> = {};
    const monthOrder = ['April', 'March', 'February', 'January'];

    filtered.forEach((tx) => {
      const m = tx.month || 'April';
      if (!groups[m]) groups[m] = [];
      groups[m].push(tx);
    });

    // Return in order
    return monthOrder
      .filter((m) => groups[m] && groups[m].length > 0)
      .map((m) => ({
        month: m,
        data: groups[m],
      }));
  }, [transactions, filter]);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Transaction"
        showBack={false}
        showDrawer={true}
        showNotification={true}
        rightAction={
          <TouchableOpacity
            style={styles.addHeaderBtn}
            onPress={() => navigation.navigate('AddExpense')}
            activeOpacity={0.7}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Total Balance Card matching Figma 9.3.0 */}
      <View style={styles.topCardContainer}>
        <View style={[styles.balanceCard, { backgroundColor: theme.cardWhite }]}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={[styles.balanceAmount, { color: theme.textPrimary }]}>
            {formatINR(totalBalance)}
          </Text>
        </View>

        {/* Income & Expense Toggle Cards matching Figma 9.3.1 & 9.3.2 */}
        <View style={styles.toggleRow}>
          {/* Income Toggle */}
          <TouchableOpacity
            style={[
              styles.toggleBox,
              filter === 'income' ? styles.toggleBoxActiveIncome : { backgroundColor: theme.cardWhite },
            ]}
            onPress={() => setFilter(filter === 'income' ? 'all' : 'income')}
            activeOpacity={0.8}
          >
            <View style={styles.toggleIconWrap}>
              <Feather
                name="arrow-up-right"
                size={16}
                color={filter === 'income' ? '#FFFFFF' : '#10B981'}
              />
            </View>
            <Text
              style={[
                styles.toggleTitle,
                filter === 'income' ? styles.toggleTitleActive : { color: theme.textSecondary },
              ]}
            >
              Income
            </Text>
            <Text
              style={[
                styles.toggleValue,
                filter === 'income' ? styles.toggleValueActive : { color: theme.textPrimary },
              ]}
            >
              {formatINR(totalIncome)}
            </Text>
          </TouchableOpacity>

          {/* Expense Toggle */}
          <TouchableOpacity
            style={[
              styles.toggleBox,
              filter === 'expense' ? styles.toggleBoxActiveExpense : { backgroundColor: theme.cardWhite },
            ]}
            onPress={() => setFilter(filter === 'expense' ? 'all' : 'expense')}
            activeOpacity={0.8}
          >
            <View style={styles.toggleIconWrap}>
              <Feather
                name="arrow-down-right"
                size={16}
                color={filter === 'expense' ? '#FFFFFF' : '#3299FF'}
              />
            </View>
            <Text
              style={[
                styles.toggleTitle,
                filter === 'expense' ? styles.toggleTitleActive : { color: theme.textSecondary },
              ]}
            >
              Expense
            </Text>
            <Text
              style={[
                styles.toggleValue,
                filter === 'expense' ? styles.toggleValueActive : { color: '#3299FF' },
              ]}
            >
              {formatINR(totalExpense, true, true)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Curved White Sheet with Month-wise Transactions */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        >
          {groupedByMonth.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="wallet-outline" size={48} color="#A3C4BC" />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No transactions found for {filter} filter.
              </Text>
            </View>
          ) : (
            groupedByMonth.map((group) => (
              <View key={group.month} style={styles.monthSection}>
                {/* Month Header Row */}
                <View style={styles.monthHeaderRow}>
                  <Text style={[styles.monthTitle, { color: theme.textPrimary }]}>
                    {group.month}
                  </Text>
                  <View style={[styles.calendarPill, { backgroundColor: theme.mintSoft }]}>
                    <Ionicons name="calendar-outline" size={16} color={theme.primary} />
                  </View>
                </View>

                {/* List of Transactions in this Month */}
                {group.data.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    transaction={tx}
                    showDelete={true}
                    onPress={() => {
                      if (tx.category === 'Food') {
                        navigation.navigate('CategoryDetails', { categoryName: 'Food' });
                      }
                    }}
                  />
                ))}
              </View>
            ))
          )}

          {/* Quick Add Expense Link */}
          <TouchableOpacity
            style={[styles.addExpenseBtn, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('AddExpense')}
            activeOpacity={0.85}
          >
            <Feather name="plus-circle" size={18} color="#FFFFFF" />
            <Text style={styles.addExpenseText}>Record New Transaction</Text>
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
  addHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  balanceCard: {
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 12,
    color: '#5B7B7A',
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleBox: {
    flex: 1,
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  toggleBoxActiveIncome: {
    backgroundColor: '#10B981',
  },
  toggleBoxActiveExpense: {
    backgroundColor: '#3299FF',
  },
  toggleIconWrap: {
    marginBottom: 4,
  },
  toggleTitle: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 2,
  },
  toggleTitleActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  toggleValue: {
    fontSize: 16,
    fontWeight: '800',
  },
  toggleValueActive: {
    color: '#FFFFFF',
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
  monthSection: {
    marginBottom: 16,
  },
  monthHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 4,
  },
  monthTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  calendarPill: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#DDF5E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 8,
  },
  addExpenseBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    height: 48,
    borderRadius: 24,
    marginTop: 12,
    marginBottom: 16,
  },
  addExpenseText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});

