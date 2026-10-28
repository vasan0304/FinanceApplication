import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { SummaryCard } from '../components/SummaryCard';
import { TransactionItem } from '../components/TransactionItem';

export const CategoryDetailsScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { categoryName = 'Food' } = route.params || {};

  const { transactions, theme, formatINR } = useApp();

  // Transactions filtered by this category
  const categoryTransactions = useMemo(() => {
    return transactions.filter(
      (t) => t.category.toLowerCase() === categoryName.toLowerCase()
    );
  }, [transactions, categoryName]);

  const totalCategorySpent = useMemo(() => {
    return categoryTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  }, [categoryTransactions]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: Record<string, typeof categoryTransactions> = {};
    categoryTransactions.forEach((tx) => {
      const m = tx.month || 'April';
      if (!groups[m]) groups[m] = [];
      groups[m].push(tx);
    });
    return Object.keys(groups).map((m) => ({
      month: m,
      data: groups[m],
    }));
  }, [categoryTransactions]);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title={categoryName}
        showBack={true}
        showDrawer={false}
        showNotification={true}
      />

      {/* Summary Balance & Expense */}
      <SummaryCard showProgress={true} />

      {/* Curved White Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 90 }]}
        >
          {/* Category Metric Pill */}
          <View style={[styles.metricPill, { backgroundColor: theme.cardWhite }]}>
            <View>
              <Text style={styles.metricPillLabel}>Total {categoryName} Expenses</Text>
              <Text style={[styles.metricPillAmount, { color: '#3299FF' }]}>
                -{formatINR(totalCategorySpent)}
              </Text>
            </View>
            <View style={styles.badgeCount}>
              <Text style={styles.badgeCountText}>{categoryTransactions.length} entries</Text>
            </View>
          </View>

          {/* Month Wise Groupings */}
          {grouped.length === 0 ? (
            <View style={styles.emptyContainer}>
              <MaterialCommunityIcons name="silverware-clean" size={44} color="#A3C4BC" />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                No expenses logged for {categoryName} yet.
              </Text>
            </View>
          ) : (
            grouped.map((group) => (
              <View key={group.month} style={styles.monthSection}>
                <View style={styles.monthHeaderRow}>
                  <Text style={[styles.monthTitle, { color: theme.textPrimary }]}>
                    {group.month}
                  </Text>
                  <View style={[styles.calendarPill, { backgroundColor: theme.mintSoft }]}>
                    <Ionicons name="calendar-outline" size={16} color={theme.primary} />
                  </View>
                </View>

                {group.data.map((tx) => (
                  <TransactionItem
                    key={tx.id}
                    transaction={tx}
                    showDelete={true}
                  />
                ))}
              </View>
            ))
          )}

          {/* Add Expenses Pill Button matching Figma 9.4.1 */}
          <TouchableOpacity
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
            onPress={() =>
              navigation.navigate('AddExpense', {
                defaultCategory: categoryName,
              })
            }
            activeOpacity={0.85}
          >
            <Text style={styles.addBtnText}>Add Expenses</Text>
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
  metricPill: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricPillLabel: {
    fontSize: 12,
    color: '#5B7B7A',
    fontWeight: '600',
    marginBottom: 2,
  },
  metricPillAmount: {
    fontSize: 20,
    fontWeight: '800',
  },
  badgeCount: {
    backgroundColor: '#DDF5E6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  badgeCountText: {
    color: '#0E3E3E',
    fontSize: 12,
    fontWeight: '700',
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
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    marginTop: 8,
  },
  addBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

