import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { useApp } from '../context/AppContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showDrawer?: boolean;
  showNotification?: boolean;
  backgroundColor?: string;
  textColor?: string;
  onBackPress?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  showDrawer = true,
  showNotification = true,
  backgroundColor,
  textColor,
  onBackPress,
  rightAction,
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<any>();
  const { theme, user, notifications } = useApp();

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  // Ensure notch area is strictly cleared
  const topPadding = Math.max(insets.top, Platform.OS === 'android' ? 28 : 20);

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const handleDrawerToggle = () => {
    try {
      navigation.dispatch(DrawerActions.toggleDrawer());
    } catch (e) {
      // fallback
    }
  };

  const handleNotificationPress = () => {
    navigation.navigate('Notification');
  };

  const headerBg = backgroundColor || theme.primary;
  const contentColor = textColor || '#FFFFFF';

  return (
    <View style={[styles.container, { backgroundColor: headerBg, paddingTop: topPadding + 6 }]}>
      <View style={styles.contentRow}>
        <View style={styles.leftContainer}>
          {showBack ? (
            <TouchableOpacity
              onPress={handleBack}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="chevron-back" size={24} color={contentColor} />
            </TouchableOpacity>
          ) : showDrawer ? (
            <TouchableOpacity
              onPress={handleDrawerToggle}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="menu-outline" size={24} color={contentColor} />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>

        <View style={styles.titleContainer}>
          {title ? (
            <Text style={[styles.titleText, { color: contentColor }]} numberOfLines={1}>
              {title}
            </Text>
          ) : null}
          {user.role === 'admin' ? (
            <View style={styles.adminBadge}>
              <Text style={styles.adminBadgeText}>ADMIN</Text>
            </View>
          ) : null}
        </View>

        <View style={styles.rightContainer}>
          {rightAction ? (
            rightAction
          ) : showNotification ? (
            <TouchableOpacity
              onPress={handleNotificationPress}
              style={[styles.iconButton, { backgroundColor: 'rgba(255,255,255,0.2)' }]}
              activeOpacity={0.7}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="notifications-outline" size={20} color={contentColor} />
              {unreadCount > 0 && (
                <View style={styles.badgeContainer}>
                  <Text style={styles.badgeText}>
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          ) : (
            <View style={{ width: 40 }} />
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingBottom: 12,
    zIndex: 100,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  leftContainer: {
    width: 44,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  titleText: {
    fontSize: 19,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  rightContainer: {
    width: 44,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FF3B30',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  adminBadge: {
    backgroundColor: '#0F172A',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 6,
  },
  adminBadgeText: {
    color: '#93C5FD',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});

