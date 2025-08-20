import './global.css';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from 'react-native';

import UsersScreen from './src/screens/UsersScreen';
import ProductsScreen from './src/screens/ProductsScreen';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const insets = useSafeAreaInsets();
  
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          paddingTop: 8,
          paddingBottom: insets.bottom + 8,
          height: 60 + insets.bottom,
        },
        headerStyle: {
          backgroundColor: '#F9FAFB',
          borderBottomColor: '#E5E7EB',
        },
        headerTitleStyle: {
          fontWeight: '600',
          color: '#1F2937',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}
        >
          <Tab.Screen
            name="Users"
            component={UsersScreen}
            options={{
              title: '👥 Users',
              tabBarLabel: 'Users',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>👥</Text>
              ),
            }}
          />
          <Tab.Screen
            name="Products"
            component={ProductsScreen}
            options={{
              title: '📦 Products',
              tabBarLabel: 'Products',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size }}>📦</Text>
              ),
            }}
          />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <TabNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
