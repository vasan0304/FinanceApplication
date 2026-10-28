import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { TransactionItem } from '../components/TransactionItem';

export const SearchScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { transactions, theme, formatINR } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [reportType, setReportType] = useState<'all' | 'income' | 'expense'>('all');
  const [isSearched, setIsSearched] = useState(false);

  const categories = ['All', 'Food', 'Transport', 'Medicine', 'Groceries', 'Rent', 'Salary', 'Others'];

  const results = useMemo(() => {
    return transactions.filter((tx) => {
      // text match
      const queryMatch =
        !searchQuery.trim() ||
        tx.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchQuery.toLowerCase());

      // category match
      const catMatch =
        selectedCategory === 'All' ||
        tx.category.toLowerCase() === selectedCategory.toLowerCase();

      // report type match
      const typeMatch = reportType === 'all' || tx.type === reportType;

      return queryMatch && catMatch && typeMatch;
    });
  }, [transactions, searchQuery, selectedCategory, reportType]);

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Search"
        showBack={true}
        showDrawer={false}
        showNotification={true}
      />

      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        >
          {/* Search Box matching Figma 9.2.5 - A */}
          <View style={[styles.searchInputWrapper, { backgroundColor: theme.inputBackground }]}>
            <Ionicons name="search" size={18} color={theme.textSecondary} style={{ marginRight: 8 }} />
            <TextInput
              style={[styles.searchInput, { color: theme.textPrimary }]}
              placeholder="Search transactions..."
              placeholderTextColor={theme.textMuted}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Categories Selector */}
          <View style={styles.sectionGroup}>
            <Text style={[styles.sectionLabel, { color: theme.textPrimary }]}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
              {categories.map((c) => {
                const isSelected = selectedCategory === c;
                return (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.catChip,
                      isSelected ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground },
                    ]}
                    onPress={() => setSelectedCategory(c)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.catChipText,
                        isSelected ? { color: '#FFFFFF', fontWeight: '700' } : { color: theme.textPrimary },
                      ]}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Date Selector */}
          <View style={styles.sectionGroup}>
            <Text style={[styles.sectionLabel, { color: theme.textPrimary }]}>Date</Text>
            <View style={[styles.dateWrapper, { backgroundColor: theme.inputBackground }]}>
              <Text style={[styles.dateText, { color: theme.textPrimary }]}>30 / APR / 2024</Text>
              <Ionicons name="calendar-outline" size={20} color={theme.primary} />
            </View>
          </View>

          {/* Report Radio Buttons: Income | Expense */}
          <View style={styles.sectionGroup}>
            <Text style={[styles.sectionLabel, { color: theme.textPrimary }]}>Report Type</Text>
            <View style={styles.radioRow}>
              {(['all', 'income', 'expense'] as const).map((t) => (
                <TouchableOpacity
                  key={t}
                  style={styles.radioItem}
                  onPress={() => setReportType(t)}
                  activeOpacity={0.8}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      { borderColor: reportType === t ? theme.primary : '#A3C4BC' },
                    ]}
                  >
                    {reportType === t && (
                      <View style={[styles.radioInner, { backgroundColor: theme.primary }]} />
                    )}
                  </View>
                  <Text style={[styles.radioLabel, { color: theme.textPrimary }]}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Search Action Button */}
          <TouchableOpacity
            style={[styles.searchBtn, { backgroundColor: theme.primary }]}
            onPress={() => setIsSearched(true)}
            activeOpacity={0.85}
          >
            <Text style={styles.searchBtnText}>Search</Text>
          </TouchableOpacity>

          {/* Search Results */}
          <View style={styles.resultsContainer}>
            <Text style={[styles.resultsTitle, { color: theme.textPrimary }]}>
              Matching Results ({results.length})
            </Text>

            {results.length === 0 ? (
              <View style={styles.emptyWrap}>
                <Ionicons name="search-outline" size={40} color="#A3C4BC" />
                <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                  No matching transactions found.
                </Text>
              </View>
            ) : (
              results.map((tx) => (
                <TransactionItem
                  key={tx.id}
                  transaction={tx}
                  showDelete={true}
                />
              ))
            )}
          </View>
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
    paddingTop: 24,
  },
  scrollContent: {
    flexGrow: 1,
  },
  searchInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 48,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
  },
  sectionGroup: {
    marginBottom: 14,
  },
  sectionLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
  },
  catScroll: {
    flexDirection: 'row',
  },
  catChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 8,
  },
  catChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  dateWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 48,
    borderRadius: 18,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
  },
  radioRow: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 4,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  radioLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  searchBtn: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  searchBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  resultsContainer: {
    marginTop: 4,
  },
  resultsTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 12,
  },
  emptyWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 13,
    marginTop: 6,
  },
});

