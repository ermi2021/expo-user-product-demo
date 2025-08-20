import './global.css';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center px-4">
          <Text className="text-3xl font-bold text-gray-800 mb-4">
            User & Product Manager
          </Text>
          <Text className="text-lg text-gray-600 text-center mb-8">
            A simple React Native app for managing users and products
          </Text>
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
