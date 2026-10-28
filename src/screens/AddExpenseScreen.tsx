import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { CategoryName, TransactionType } from '../types';

const CATEGORIES: CategoryName[] = [
  'Food',
  'Transport',
  'Medicine',
  'Groceries',
  'Rent',
  'Gifts',
  'Savings',
  'Entertainment',
  'Others',
  'Salary',
];

export const AddExpenseScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { defaultCategory = 'Food' } = route.params || {};

  const { theme, addTransaction } = useApp();

  const [date, setDate] = useState('April 30, 2024');
  const [category, setCategory] = useState<CategoryName>(defaultCategory);
  const [type, setType] = useState<TransactionType>(defaultCategory === 'Salary' ? 'income' : 'expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSave = () => {
    setErrorMessage('');
    if (!title.trim()) {
      setErrorMessage('Please enter an expense or income title.');
      return;
    }
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setErrorMessage('Please enter a valid amount greater than 0.');
      return;
    }

    addTransaction({
      title: title.trim(),
      amount: parsedAmount,
      type,
      category,
      date: '2024-04-30',
      month: 'April',
      note: message.trim(),
    });

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.primary }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Notch Safe Header */}
      <Header
        title={type === 'expense' ? 'Add Expenses' : 'Add Income'}
        showBack={true}
        showDrawer={false}
        showNotification={true}
      />

      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        >
          {errorMessage ? (
            <View style={styles.errorBanner}>
              <Ionicons name="alert-circle" size={16} color="#FF3B30" />
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          ) : null}

          {/* Type Toggle: Expense vs Income */}
          <View style={styles.typeToggle}>
            <TouchableOpacity
              style={[styles.typeBtn, type === 'expense' && styles.typeBtnActiveExpense]}
              onPress={() => setType('expense')}
              activeOpacity={0.8}
            >
              <Text style={[styles.typeBtnText, type === 'expense' && styles.typeBtnTextActive]}>
                Expense
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.typeBtn, type === 'income' && styles.typeBtnActiveIncome]}
              onPress={() => setType('income')}
              activeOpacity={0.8}
            >
              <Text style={[styles.typeBtnText, type === 'income' && styles.typeBtnTextActive]}>
                Income
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Field matching Figma 9.4.1 - B */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Date</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                value={date}
                onChangeText={setDate}
                placeholder="Date (e.g. April 30, 2024)"
                placeholderTextColor={theme.textMuted}
              />
              <Ionicons name="calendar-outline" size={20} color={theme.primary} />
            </View>
          </View>

          {/* Category Dropdown / Selector */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categoryPills}
            >
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryChip,
                      isSelected ? { backgroundColor: theme.primary } : { backgroundColor: theme.inputBackground },
                    ]}
                    onPress={() => setCategory(cat)}
                    activeOpacity={0.8}
                  >
                    <Text
                      style={[
                        styles.categoryChipText,
                        isSelected ? { color: '#FFFFFF', fontWeight: '700' } : { color: theme.textPrimary },
                      ]}
                    >
                      {cat}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Amount in Indian Rupees (₹) */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Amount (₹)</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <Text style={[styles.currencyPrefix, { color: theme.textPrimary }]}>₹</Text>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                placeholder="0.00"
                placeholderTextColor={theme.textMuted}
                keyboardType="decimal-pad"
                value={amount}
                onChangeText={setAmount}
              />
            </View>
          </View>

          {/* Expense Title */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Expense Title</Text>
            <View style={[styles.inputWrapper, { backgroundColor: theme.inputBackground }]}>
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary }]}
                placeholder="e.g. Dinner, Grocery Run, Electricity"
                placeholderTextColor={theme.textMuted}
                value={title}
                onChangeText={setTitle}
              />
            </View>
          </View>

          {/* Enter Message / Notes */}
          <View style={styles.inputGroup}>
            <Text style={[styles.inputLabel, { color: theme.textPrimary }]}>Enter Message</Text>
            <View
              style={[
                styles.textAreaWrapper,
                { backgroundColor: theme.inputBackground, minHeight: 90 },
              ]}
            >
              <TextInput
                style={[styles.inputField, { color: theme.textPrimary, textAlignVertical: 'top' }]}
                placeholder="Add receipt note or comment..."
                placeholderTextColor={theme.textMuted}
                multiline
                numberOfLines={3}
                value={message}
                onChangeText={setMessage}
              />
            </View>
          </View>

          {/* Save Button */}
          <TouchableOpacity
            style={[styles.saveBtn, { backgroundColor: theme.primary }]}
            onPress={handleSave}
            activeOpacity={0.85}
          >
            <Text style={styles.saveBtnText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
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
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEAEA',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 13,
    fontWeight: '600',
    flex: 1,
  },
  typeToggle: {
    flexDirection: 'row',
    backgroundColor: '#E2F6EB',
    borderRadius: 16,
    padding: 4,
    marginBottom: 16,
    gap: 6,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 12,
  },
  typeBtnActiveExpense: {
    backgroundColor: '#3299FF',
  },
  typeBtnActiveIncome: {
    backgroundColor: '#10B981',
  },
  typeBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0F172A',
  },
  typeBtnTextActive: {
    color: '#FFFFFF',
  },
  inputGroup: {
    marginBottom: 14,
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    paddingHorizontal: 16,
    height: 48,
  },
  currencyPrefix: {
    fontSize: 18,
    fontWeight: '800',
    marginRight: 6,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
  },
  textAreaWrapper: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  categoryPills: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
  },
  saveBtn: {
    width: '100%',
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
});

