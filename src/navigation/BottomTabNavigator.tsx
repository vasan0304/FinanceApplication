import React from 'react';
import { View, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Ionicons,
  MaterialCommunityIcons,
  Feather,
} from '@expo/vector-icons';
import { useApp } from '../context/AppContext';

// Screens
import { HomeScreen } from '../screens/HomeScreen';
import { AnalysisScreen } from '../screens/AnalysisScreen';
import { TransactionsScreen } from '../screens/TransactionsScreen';
import { CategoriesScreen } from '../screens/CategoriesScreen';
import { ProfileScreen } from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useApp();

  const getIcon = (routeName: string, isFocused: boolean) => {
    const iconColor = isFocused ? '#FFFFFF' : theme.textPrimary;
    switch (routeName) {
      case 'HomeTab':
        return <Ionicons name={isFocused ? 'home' : 'home-outline'} size={22} color={iconColor} />;
      case 'AnalysisTab':
        return <Ionicons name={isFocused ? 'bar-chart' : 'bar-chart-outline'} size={22} color={iconColor} />;
      case 'TransactionTab':
        return <MaterialCommunityIcons name="swap-horizontal" size={24} color={iconColor} />;
      case 'CategoriesTab':
        return <MaterialCommunityIcons name={isFocused ? 'layers' : 'layers-outline'} size={24} color={iconColor} />;
      case 'ProfileTab':
        return <Ionicons name={isFocused ? 'person' : 'person-outline'} size={22} color={iconColor} />;
      default:
        return <Ionicons name="apps-outline" size={22} color={iconColor} />;
    }
  };

  return (
    <View
      style={[
        styles.tabBarWrapper,
        {
          paddingBottom: Math.max(insets.bottom, 10),
          backgroundColor: theme.mintBackground,
        },
      ]}
    >
      <View style={[styles.tabBarContainer, { backgroundColor: theme.tabBarBackground }]}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              onPress={onPress}
              style={styles.tabButton}
              activeOpacity={0.8}
            >
              {isFocused ? (
                <View style={[styles.activeCircle, { backgroundColor: theme.primary }]}>
                  {getIcon(route.name, true)}
                </View>
              ) : (
                <View style={styles.inactiveIconWrap}>
                  {getIcon(route.name, false)}
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      id="bottom-tabs"
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="AnalysisTab" component={AnalysisScreen} />
      <Tab.Screen name="TransactionTab" component={TransactionsScreen} />
      <Tab.Screen name="CategoriesTab" component={CategoriesScreen} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarWrapper: {
    paddingHorizontal: 20,
    paddingTop: 4,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabBarContainer: {
    flexDirection: 'row',
    height: 62,
    borderRadius: 31,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  activeCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#00D09E',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 6,
    elevation: 3,
  },
  inactiveIconWrap: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
