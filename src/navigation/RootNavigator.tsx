import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { SignUpScreen } from '../screens/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/ForgotPasswordScreen';
import { DrawerNavigator } from './DrawerNavigator';
import { CategoryDetailsScreen } from '../screens/CategoryDetailsScreen';
import { AddExpenseScreen } from '../screens/AddExpenseScreen';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { NotificationScreen } from '../screens/NotificationScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { AdminScreen } from '../screens/AdminScreen';

const Stack = createNativeStackNavigator();

export const RootNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      id="root-stack"
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      {/* Auth Stack */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

      {/* Main Drawer & Tabs Navigation */}
      <Stack.Screen name="MainDrawer" component={DrawerNavigator} />

      {/* Detail / Modal Screens */}
      <Stack.Screen name="CategoryDetails" component={CategoryDetailsScreen} />
      <Stack.Screen
        name="AddExpense"
        component={AddExpenseScreen}
        options={{ animation: 'slide_from_bottom' }}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Search" component={SearchScreen} />
      <Stack.Screen name="AdminPanel" component={AdminScreen} />
    </Stack.Navigator>
  );
};
