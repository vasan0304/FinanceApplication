import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useApp } from '../context/AppContext';
import { Header } from '../components/Header';
import { AppNotification } from '../types';

export const NotificationScreen: React.FC = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { notifications, theme, markNotificationRead } = useApp();

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'transaction':
        return (
          <View style={[styles.iconWrap, { backgroundColor: '#3299FF' }]}>
            <MaterialCommunityIcons name="swap-horizontal" size={20} color="#FFFFFF" />
          </View>
        );
      case 'reminder':
        return (
          <View style={[styles.iconWrap, { backgroundColor: theme.primary }]}>
            <Ionicons name="notifications-outline" size={20} color="#FFFFFF" />
          </View>
        );
      case 'update':
        return (
          <View style={[styles.iconWrap, { backgroundColor: '#FFA800' }]}>
            <Ionicons name="star-outline" size={20} color="#FFFFFF" />
          </View>
        );
      default:
        return (
          <View style={[styles.iconWrap, { backgroundColor: '#00D09E' }]}>
            <Ionicons name="information" size={20} color="#FFFFFF" />
          </View>
        );
    }
  };

  const groups = ['Today', 'Yesterday', 'This Weekend', 'Earlier'] as const;

  return (
    <View style={[styles.container, { backgroundColor: theme.primary }]}>
      {/* Notch Safe Header */}
      <Header
        title="Notification"
        showBack={true}
        showDrawer={false}
        showNotification={false}
      />

      <View style={[styles.sheet, { backgroundColor: theme.mintBackground }]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 40 }]}
        >
          {groups.map((group) => {
            const groupNotifs = notifications.filter((n) => n.dateGroup === group);
            if (groupNotifs.length === 0) return null;

            return (
              <View key={group} style={styles.groupSection}>
                <Text style={[styles.groupTitle, { color: theme.textSecondary }]}>
                  {group}
                </Text>

                {groupNotifs.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.notifCard,
                      { backgroundColor: theme.cardWhite },
                      !item.isRead && styles.unreadCard,
                    ]}
                    onPress={() => markNotificationRead(item.id)}
                    activeOpacity={0.8}
                  >
                    {getNotifIcon(item.type)}

                    <View style={styles.notifContent}>
                      <View style={styles.titleRow}>
                        <Text style={[styles.notifTitle, { color: theme.textPrimary }]}>
                          {item.title}
                        </Text>
                        {!item.isRead && <View style={styles.unreadDot} />}
                      </View>

                      <Text style={[styles.notifMessage, { color: theme.textSecondary }]}>
                        {item.message}
                      </Text>

                      <Text style={[styles.notifTime, { color: '#3299FF' }]}>
                        {item.timestamp}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
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
  groupSection: {
    marginBottom: 20,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 10,
    letterSpacing: 0.3,
  },
  notifCard: {
    flexDirection: 'row',
    padding: 14,
    borderRadius: 20,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  unreadCard: {
    borderLeftWidth: 3.5,
    borderLeftColor: '#2563EB',
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  notifContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: 15,
    fontWeight: '700',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#2563EB',
  },
  notifMessage: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 6,
  },
  notifTime: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'right',
  },
});

