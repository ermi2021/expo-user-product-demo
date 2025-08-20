import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  id: string;
  email: string;
  fullName: string;
  createdAt: Date;
}

export default function UsersScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [errors, setErrors] = useState<{email?: string; fullName?: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors: {email?: string; fullName?: string} = {};

    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (users.some(user => user.email.toLowerCase() === email.toLowerCase())) {
      newErrors.email = 'A user with this email already exists';
    }

    // Full name validation
    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    } else if (fullName.trim().length < 2) {
      newErrors.fullName = 'Full name must be at least 2 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegisterUser = async () => {
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    const newUser: User = {
      id: Date.now().toString(),
      email: email.trim(),
      fullName: fullName.trim(),
      createdAt: new Date()
    };

    setUsers(prevUsers => [...prevUsers, newUser]);
    setEmail('');
    setFullName('');
    setErrors({});
    setIsSubmitting(false);
    Alert.alert('Success', 'User registered successfully!');
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) {
      setErrors(prev => ({...prev, email: undefined}));
    }
  };

  const handleFullNameChange = (text: string) => {
    setFullName(text);
    if (errors.fullName) {
      setErrors(prev => ({...prev, fullName: undefined}));
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            👥 User Management
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            Register new users and view the user list
          </Text>
        </View>

        {/* Registration Form */}
        <View className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Register New User
          </Text>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-base ${
                errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
              value={email}
              onChangeText={handleEmailChange}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.email}
              </Text>
            )}
          </View>

          <View className="mb-6">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Full Name
            </Text>
            <TextInput
              className={`border rounded-lg px-4 py-3 text-base ${
                errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="Enter full name"
              value={fullName}
              onChangeText={handleFullNameChange}
              autoCapitalize="words"
            />
            {errors.fullName && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.fullName}
              </Text>
            )}
          </View>

          <TouchableOpacity
            className={`py-3 rounded-lg ${
              isSubmitting ? 'bg-gray-400' : 'bg-blue-600'
            }`}
            onPress={handleRegisterUser}
            disabled={isSubmitting}
          >
            <Text className="text-white text-center font-semibold text-base">
              {isSubmitting ? 'Registering...' : 'Register User'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* User List */}
        <View className="bg-white rounded-lg shadow-sm border border-gray-200">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-800">
              Registered Users ({users.length})
            </Text>
          </View>
          
          {users.length === 0 ? (
            <View className="p-6">
              <Text className="text-gray-500 text-center">
                No users registered yet
              </Text>
            </View>
          ) : (
            <View>
              {users.map((user, index) => (
                <View
                  key={user.id}
                  className={`p-4 ${index < users.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <Text className="text-base font-medium text-gray-800 mb-1">
                    {user.fullName}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-1">
                    {user.email}
                  </Text>
                  <Text className="text-xs text-gray-400">
                    Registered: {user.createdAt.toLocaleDateString()} at {user.createdAt.toLocaleTimeString()}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}