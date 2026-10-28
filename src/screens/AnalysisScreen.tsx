import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { SummaryCard } from '../components/SummaryCard';

type AnalysisPeriod = 'Daily' | 'Weekly' | 'Monthly' | 'Year';

export const AnalysisScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, formatINR, totalIncome, totalExpense } = useApp();

  const [period, setPeriod] = useState<AnalysisPeriod>('Weekly');

  // Chart datasets matching Figma 9.2.1, 9.2.2, 9.2.3, 9.2.4
  const chartConfigs: Record<
    AnalysisPeriod,
    {
      labels: string[];
      incomeData: number[];
      expenseData: number[];
      incomeTotal: number;
      expenseTotal: number;
    }
  > = {
    Daily: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      incomeData: [30, 45, 60, 40, 80, 20, 65],
      expenseData: [20, 35, 40, 25, 70, 15, 30],
      incomeTotal: 4120.0,
      expenseTotal: 1187.4,
    },
    Weekly: {
      labels: ['1st Week', '2nd Week', '3rd Week', '4th Week'],
      incomeData: [60, 25, 35, 65],
      expenseData: [35, 50, 85, 50],
      incomeTotal: 11420.0,
      expenseTotal: 20000.2,
    },
    Monthly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      incomeData: [50, 75, 70, 90, 40, 30],
      expenseData: [40, 65, 80, 50, 45, 20],
      incomeTotal: 47200.0,
      expenseTotal: 35510.2,
    },
    Year: {
      labels: ['2021', '2022', '2023', '2024'],
      incomeData: [70, 65, 90, 75],
      expenseData: [55, 60, 80, 65],
      incomeTotal: 430560.0,
      expenseTotal: 320300.0,
    },
  };

  const currentChart = chartConfigs[period];

  const targetCategories = [
    { name: 'Food', spent: 142.28, budget: 300.0, color: '#3299FF', icon: 'silverware-fork-knife' },
    { name: 'Rent', spent: 674.4, budget: 700.0, color: '#00D09E', icon: 'key-outline' },
    { name: 'Transport', spent: 41.3, budget: 100.0, color: '#FFA800', icon: 'bus' },
    { name: 'Groceries', spent: 100.0, budget: 250.0, color: '#FF5757', icon: 'bag-personal-outline' },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Analysis"
        showBack={false}
        showDrawer={true}
        showNotification={true}
        rightAction={
          <TouchableOpacity
            style={styles.searchHeaderBtn}
            onPress={() => navigation.navigate('Search')}
            activeOpacity={0.7}
          >
            <Ionicons name="search" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        }
      />

      {/* Summary Balance & Expense */}
      <SummaryCard showProgress={true} />

      {/* Curved White Sheet */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        >
          {/* Timeframe Pills matching Figma: Daily, Weekly, Monthly, Year */}
          <View style={styles.periodRow}>
            {(['Daily', 'Weekly', 'Monthly', 'Year'] as AnalysisPeriod[]).map((tab) => {
              const isActive = period === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[
                    styles.periodTab,
                    isActive && [styles.periodTabActive, { backgroundColor: theme.primary }],
                  ]}
                  onPress={() => setPeriod(tab)}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.periodTabText,
                      isActive ? styles.periodTabTextActive : { color: theme.textSecondary },
                    ]}
                  >
                    {tab}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Graphical Income & Expenses Bar Chart Container */}
          <View style={[styles.chartCard, { backgroundColor: theme.cardWhite }]}>
            <View style={styles.chartHeader}>
              <Text style={[styles.chartTitle, { color: theme.textPrimary }]}>
                Income & Expenses
              </Text>
              <View style={styles.chartActions}>
                <TouchableOpacity
                  style={styles.chartIconBtn}
                  onPress={() => navigation.navigate('Search')}
                >
                  <Ionicons name="search" size={16} color={theme.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.chartIconBtn}
                  onPress={() => navigation.navigate('TransactionTab')}
                >
                  <Ionicons name="calendar-outline" size={16} color={theme.primary} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Custom SVG/Flex Bar Chart */}
            <View style={styles.barsContainer}>
              {/* Y-axis grid lines */}
              <View style={styles.gridLines}>
                {['15k', '10k', '5k', '1k'].map((val, idx) => (
                  <View key={idx} style={styles.gridLineRow}>
                    <Text style={styles.axisLabel}>{val}</Text>
                    <View style={styles.gridDashedLine} />
                  </View>
                ))}
              </View>

              {/* Bars Row */}
              <View style={styles.barsRow}>
                {currentChart.labels.map((lbl, idx) => {
                  const incHeight = currentChart.incomeData[idx] || 20;
                  const expHeight = currentChart.expenseData[idx] || 15;
                  return (
                    <View key={idx} style={styles.barGroup}>
                      <View style={styles.barsPair}>
                        {/* Income Bar (Primary Indigo) */}
                        <View
                          style={[
                            styles.bar,
                            {
                              height: `${incHeight}%`,
                              backgroundColor: '#2563EB',
                            },
                          ]}
                        />
                        {/* Expense Bar (Cyan / Light Blue) */}
                        <View
                          style={[
                            styles.bar,
                            {
                              height: `${expHeight}%`,
                              backgroundColor: '#38BDF8',
                            },
                          ]}
                        />
                      </View>
                      <Text style={[styles.barLabel, { color: theme.textSecondary }]}>
                        {lbl}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Legend */}
            <View style={styles.legendRow}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText}>Income (₹)</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#38BDF8' }]} />
                <Text style={styles.legendText}>Expense (₹)</Text>
              </View>
            </View>
          </View>

          {/* Quick Metrics Cards */}
          <View style={styles.metricsTwoCol}>
            {/* Income Box */}
            <View style={[styles.metricBox, { backgroundColor: theme.cardWhite }]}>
              <View style={styles.metricIconWrap}>
                <Feather name="arrow-up-right" size={16} color="#00D09E" />
              </View>
              <Text style={styles.metricTitle}>Income</Text>
              <Text style={[styles.metricAmount, { color: '#0E3E3E' }]}>
                {formatINR(currentChart.incomeTotal)}
              </Text>
            </View>

            {/* Expense Box */}
            <View style={[styles.metricBox, { backgroundColor: theme.cardWhite }]}>
              <View style={styles.metricIconWrap}>
                <Feather name="arrow-down-right" size={16} color="#3299FF" />
              </View>
              <Text style={styles.metricTitle}>Expense</Text>
              <Text style={[styles.metricAmount, { color: '#3299FF' }]}>
                {formatINR(currentChart.expenseTotal)}
              </Text>
            </View>
          </View>

          {/* Target Breakdown Header */}
          <Text style={[styles.sectionTitle, { color: theme.textPrimary, marginTop: 18, marginBottom: 12 }]}>
            My Targets
          </Text>

          {/* Target Items with Spending Progress */}
          {targetCategories.map((cat, idx) => {
            const pct = Math.min(100, Math.round((cat.spent / cat.budget) * 100));
            return (
              <View key={idx} style={[styles.targetCard, { backgroundColor: theme.cardWhite }]}>
                <View style={styles.targetRow}>
                  <View style={styles.targetLeft}>
                    <View style={[styles.targetIconWrap, { backgroundColor: '#E9F2FF' }]}>
                      <MaterialCommunityIcons name={cat.icon as any} size={20} color={cat.color} />
                    </View>
                    <View>
                      <Text style={[styles.targetName, { color: theme.textPrimary }]}>{cat.name}</Text>
                      <Text style={styles.targetSpent}>
                        {formatINR(cat.spent)} / {formatINR(cat.budget)}
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.targetPct, { color: cat.color }]}>{pct}%</Text>
                </View>

                {/* Progress Line */}
                <View style={styles.targetTrack}>
                  <View style={[styles.targetFill, { width: `${pct}%`, backgroundColor: cat.color }]} />
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchHeaderBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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
  periodRow: {
    flexDirection: 'row',
    backgroundColor: '#DDF5E6',
    borderRadius: 22,
    padding: 4,
    marginBottom: 16,
  },
  periodTab: {
    flex: 1,
    paddingVertical: 9,
    alignItems: 'center',
    borderRadius: 18,
  },
  periodTabActive: {
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  periodTabText: {
    fontSize: 13,
    fontWeight: '600',
  },
  periodTabTextActive: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  chartCard: {
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '800',
  },
  chartActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chartIconBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6FAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  barsContainer: {
    height: 180,
    position: 'relative',
    justifyContent: 'flex-end',
    paddingBottom: 24,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 24,
    justifyContent: 'space-between',
  },
  gridLineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  axisLabel: {
    width: 24,
    fontSize: 10,
    color: '#7E9B95',
    fontWeight: '600',
  },
  gridDashedLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E2F3EB',
  },
  barsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: '100%',
    paddingLeft: 30,
  },
  barGroup: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  barsPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
    height: '80%',
  },
  bar: {
    width: 8,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 8,
  },
  barLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#5B7B7A',
    fontWeight: '600',
  },
  metricsTwoCol: {
    flexDirection: 'row',
    gap: 12,
  },
  metricBox: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  metricIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E6FAF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  metricTitle: {
    fontSize: 13,
    color: '#5B7B7A',
    fontWeight: '600',
    marginBottom: 4,
  },
  metricAmount: {
    fontSize: 18,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  targetCard: {
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
  },
  targetRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  targetIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  targetName: {
    fontSize: 15,
    fontWeight: '700',
  },
  targetSpent: {
    fontSize: 12,
    color: '#7E9B95',
    fontWeight: '500',
  },
  targetPct: {
    fontSize: 14,
    fontWeight: '800',
  },
  targetTrack: {
    height: 6,
    backgroundColor: '#EAF8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  targetFill: {
    height: '100%',
    borderRadius: 3,
  },
});

