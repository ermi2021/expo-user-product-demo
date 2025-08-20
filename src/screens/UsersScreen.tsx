import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function UsersScreen() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-4">
        <View className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 w-full max-w-sm">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            👥 Users
          </Text>
          <Text className="text-base text-gray-600 text-center mb-6">
            User management functionality will be implemented here
          </Text>
          <View className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <Text className="text-sm text-blue-700 text-center font-medium">
              Coming in Milestone 3:
            </Text>
            <Text className="text-xs text-blue-600 text-center mt-1">
              • User registration form{"\n"}
              • User list display{"\n"}
              • Email & name validation
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}