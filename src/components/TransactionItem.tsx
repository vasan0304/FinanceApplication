import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { Transaction } from '../types';
import { useApp } from '../context/AppContext';

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
  showDelete?: boolean;
}

export const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  onPress,
  showDelete = false,
}) => {
  const { theme, formatINR, deleteTransaction } = useApp();

  const getIcon = (category: string) => {
    switch (category) {
      case 'Salary':
        return <MaterialCommunityIcons name="cash-multiple" size={24} color="#FFFFFF" />;
      case 'Groceries':
        return <MaterialCommunityIcons name="bag-personal-outline" size={24} color="#FFFFFF" />;
      case 'Rent':
        return <MaterialCommunityIcons name="key-outline" size={24} color="#FFFFFF" />;
      case 'Transport':
        return <MaterialCommunityIcons name="bus" size={24} color="#FFFFFF" />;
      case 'Food':
        return <MaterialCommunityIcons name="silverware-fork-knife" size={24} color="#FFFFFF" />;
      case 'Medicine':
        return <MaterialCommunityIcons name="pill" size={24} color="#FFFFFF" />;
      case 'Gifts':
        return <MaterialCommunityIcons name="gift-outline" size={24} color="#FFFFFF" />;
      case 'Savings':
        return <MaterialCommunityIcons name="piggy-bank-outline" size={24} color="#FFFFFF" />;
      case 'Entertainment':
        return <MaterialCommunityIcons name="ticket-outline" size={24} color="#FFFFFF" />;
      default:
        return <MaterialCommunityIcons name="swap-horizontal" size={24} color="#FFFFFF" />;
    }
  };

  const isIncome = transaction.type === 'income';

  const handleDelete = () => {
    Alert.alert(
      'Delete Transaction',
      `Are you sure you want to delete ${transaction.title}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => deleteTransaction(transaction.id),
        },
      ]
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: theme.cardWhite,
          borderColor: theme.mintBorder,
        },
      ]}
      onPress={onPress}
      onLongPress={handleDelete}
      activeOpacity={0.8}
    >
      {/* Icon */}
      <View style={[styles.iconContainer, { backgroundColor: isIncome ? '#3299FF' : '#3299FF' }]}>
        {getIcon(transaction.category)}
      </View>

      {/* Main Info */}
      <View style={styles.infoCol}>
        <Text style={[styles.title, { color: theme.textPrimary }]} numberOfLines={1}>
          {transaction.title}
        </Text>
        <Text style={[styles.subtitle, { color: '#3299FF' }]}>
          {transaction.displayDate}
        </Text>
      </View>

      {/* Category Divider & Label */}
      <View style={styles.verticalDivider} />
      <View style={styles.categoryCol}>
        <Text style={[styles.categoryText, { color: theme.textSecondary }]} numberOfLines={1}>
          {transaction.category}
        </Text>
      </View>

      {/* Amount Divider & Value */}
      <View style={styles.verticalDivider} />
      <View style={styles.amountCol}>
        <Text
          style={[
            styles.amountText,
            { color: isIncome ? theme.textPrimary : '#3299FF' },
          ]}
          numberOfLines={1}
        >
          {formatINR(transaction.amount, true, !isIncome)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginBottom: 10,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoCol: {
    flex: 2,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: '600',
  },
  verticalDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#EEF2FF',
    marginHorizontal: 8,
  },
  categoryCol: {
    flex: 1.2,
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '500',
  },
  amountCol: {
    flex: 1.8,
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
});

