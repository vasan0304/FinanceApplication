import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { SummaryCard } from '../components/SummaryCard';
import { CATEGORIES_CONFIG } from '../data/mockData';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 40 - 24) / 3;

export const CategoriesScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, transactions, formatINR } = useApp();

  const getCategoryTotal = (catName: string) => {
    return transactions
      .filter((t) => t.category === catName && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Categories"
        showBack={false}
        showDrawer={true}
        showNotification={true}
      />

      {/* Total Balance & Expense Card */}
      <SummaryCard showProgress={true} />

      {/* Curved White Sheet with 3x3 Grid */}
      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 80 }]}
        >
          <Text style={[styles.gridTitle, { color: theme.textPrimary }]}>
            All Categories
          </Text>

          {/* 3x3 Categories Grid matching Figma 9.4.0 */}
          <View style={styles.gridContainer}>
            {CATEGORIES_CONFIG.map((cat, idx) => {
              const spent = getCategoryTotal(cat.name);
              return (
                <TouchableOpacity
                  key={idx}
                  style={[
                    styles.gridItem,
                    {
                      width: ITEM_WIDTH,
                      backgroundColor: theme.cardWhite,
                      borderColor: theme.mintBorder,
                    },
                  ]}
                  onPress={() =>
                    navigation.navigate('CategoryDetails', {
                      categoryName: cat.name,
                    })
                  }
                  activeOpacity={0.8}
                >
                  {/* Category Rounded Icon Box */}
                  <View style={[styles.iconBox, { backgroundColor: '#3299FF' }]}>
                    <MaterialCommunityIcons
                      name={cat.icon as any}
                      size={28}
                      color="#FFFFFF"
                    />
                  </View>

                  <Text style={[styles.categoryName, { color: theme.textPrimary }]} numberOfLines={1}>
                    {cat.name}
                  </Text>

                  <Text style={[styles.categorySpent, { color: '#3299FF' }]} numberOfLines={1}>
                    {spent > 0 ? formatINR(spent) : '₹0'}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Tips banner */}
          <View style={[styles.tipCard, { backgroundColor: theme.cardWhite }]}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={20} color="#00D09E" />
            <Text style={[styles.tipText, { color: theme.textSecondary }]}>
              Tap on any category card above to view detailed expenses, analytics, and add custom entries.
            </Text>
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
    paddingTop: 20,
  },
  scrollContent: {
    flexGrow: 1,
  },
  gridTitle: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  gridItem: {
    borderRadius: 22,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    shadowColor: '#3299FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  categoryName: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
    textAlign: 'center',
  },
  categorySpent: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 18,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
  },
});

