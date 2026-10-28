export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar: string;
  notificationsEnabled: boolean;
  isDarkMode: boolean;
}

export type TransactionType = 'income' | 'expense';

export type CategoryName =
  | 'Salary'
  | 'Groceries'
  | 'Rent'
  | 'Transport'
  | 'Food'
  | 'Medicine'
  | 'Gifts'
  | 'Savings'
  | 'Entertainment'
  | 'Others';

export interface Transaction {
  id: string;
  title: string;
  amount: number; // in Indian Rupees ₹
  type: TransactionType;
  category: CategoryName;
  date: string; // YYYY-MM-DD
  displayDate: string; // "18:27 - April 30"
  month: string; // "April", "March", "February"
  note?: string;
  account?: string;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  dateGroup: 'Today' | 'Yesterday' | 'This Weekend' | 'Earlier';
  type: 'reminder' | 'update' | 'transaction';
  isRead: boolean;
}

export type ReportFilter = 'daily' | 'weekly' | 'monthly';

