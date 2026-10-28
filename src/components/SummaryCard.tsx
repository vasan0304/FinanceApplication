import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

interface SummaryCardProps {
  showProgress?: boolean;
  overrideBalance?: number;
  overrideExpense?: number;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  showProgress = true,
  overrideBalance,
  overrideExpense,
}) => {
  const { totalBalance, totalExpense, expensePercentage, budgetGoal, formatINR, theme } = useApp();

  const balance = overrideBalance !== undefined ? overrideBalance : totalBalance;
  const expense = overrideExpense !== undefined ? overrideExpense : totalExpense;

  return (
    <View style={styles.container}>
      {/* Metrics Row */}
      <View style={styles.metricsRow}>
        {/* Total Balance */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Feather name="arrow-up-right" size={14} color="#FFFFFF" />
            <Text style={styles.metricLabel}>Total Balance</Text>
          </View>
          <Text style={styles.metricValue}>
            {formatINR(balance)}
          </Text>
        </View>

        {/* Vertical Divider */}
        <View style={styles.metricDivider} />

        {/* Total Expense */}
        <View style={styles.metricColumn}>
          <View style={styles.metricHeader}>
            <Feather name="arrow-down-right" size={14} color="#93C5FD" />
            <Text style={[styles.metricLabel, { color: '#E0F2FE' }]}>Total Expense</Text>
          </View>
          <Text style={[styles.metricValue, { color: '#FFFFFF' }]}>
            {formatINR(expense, true, true)}
          </Text>
        </View>
      </View>

      {/* Progress Bar Section */}
      {showProgress && (
        <View style={styles.progressSection}>
          <View style={styles.progressBarTrack}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${Math.min(100, Math.max(15, expensePercentage))}%` },
              ]}
            >
              <Text style={styles.progressPercentText}>{expensePercentage}%</Text>
            </View>
            <Text style={styles.progressGoalText}>
              {formatINR(budgetGoal)}
            </Text>
          </View>

          <View style={styles.progressStatusRow}>
            <MaterialCommunityIcons name="checkbox-marked-outline" size={15} color="#FFFFFF" />
            <Text style={styles.progressStatusText}>
              {expensePercentage}% Of Your Expenses, Looks Good.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
  },
  metricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  metricColumn: {
    flex: 1,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '500',
    opacity: 0.95,
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  metricDivider: {
    width: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    marginHorizontal: 16,
  },
  progressSection: {
    marginTop: 2,
  },
  progressBarTrack: {
    height: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 14,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#093030',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  progressPercentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  progressGoalText: {
    color: '#093030',
    fontSize: 12,
    fontWeight: '700',
  },
  progressStatusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  progressStatusText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

