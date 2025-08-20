import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Product {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  lastUpdated: Date;
}

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const validateSku = (sku: string) => {
    // SKU should be alphanumeric and at least 3 characters
    const skuRegex = /^[A-Za-z0-9]{3,}$/;
    return skuRegex.test(sku);
  };

  const handleRegisterProduct = () => {
    if (!sku.trim() || !name.trim() || !price.trim() || !quantity.trim()) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!validateSku(sku)) {
      Alert.alert('Error', 'SKU must be at least 3 alphanumeric characters');
      return;
    }

    const priceNum = parseFloat(price);
    const quantityNum = parseInt(quantity);

    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Error', 'Please enter a valid price greater than 0');
      return;
    }

    if (isNaN(quantityNum) || quantityNum < 0) {
      Alert.alert('Error', 'Please enter a valid quantity (0 or greater)');
      return;
    }

    // Check if SKU already exists
    if (products.some(product => product.sku.toLowerCase() === sku.toLowerCase())) {
      Alert.alert('Error', 'A product with this SKU already exists');
      return;
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      sku: sku.trim().toUpperCase(),
      name: name.trim(),
      price: priceNum,
      quantity: quantityNum,
      createdAt: new Date(),
      lastUpdated: new Date()
    };

    setProducts(prevProducts => [...prevProducts, newProduct]);
    setSku('');
    setName('');
    setPrice('');
    setQuantity('');
    Alert.alert('Success', 'Product registered successfully!');
  };

  const formatCurrency = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const getTotalValue = () => {
    return products.reduce((total, product) => total + (product.price * product.quantity), 0);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            📦 Product Management
          </Text>
          <Text className="text-sm text-gray-600 text-center">
            Register new products and manage inventory
          </Text>
        </View>

        {/* Registration Form */}
        <View className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <Text className="text-lg font-semibold text-gray-800 mb-4">
            Register New Product
          </Text>
          
          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              SKU (Stock Keeping Unit)
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Enter SKU (e.g., ABC123)"
              value={sku}
              onChangeText={setSku}
              autoCapitalize="characters"
              autoCorrect={false}
            />
          </View>

          <View className="mb-4">
            <Text className="text-sm font-medium text-gray-700 mb-2">
              Product Name
            </Text>
            <TextInput
              className="border border-gray-300 rounded-lg px-4 py-3 text-base"
              placeholder="Enter product name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

          <View className="flex-row gap-4 mb-6">
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Price ($)
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="0.00"
                value={price}
                onChangeText={setPrice}
                keyboardType="decimal-pad"
              />
            </View>
            <View className="flex-1">
              <Text className="text-sm font-medium text-gray-700 mb-2">
                Quantity
              </Text>
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="0"
                value={quantity}
                onChangeText={setQuantity}
                keyboardType="number-pad"
              />
            </View>
          </View>

          <TouchableOpacity
            className="bg-green-600 py-3 rounded-lg"
            onPress={handleRegisterProduct}
          >
            <Text className="text-white text-center font-semibold text-base">
              Register Product
            </Text>
          </TouchableOpacity>
        </View>

        {/* Product List */}
        <View className="bg-white rounded-lg shadow-sm border border-gray-200">
          <View className="p-4 border-b border-gray-200">
            <Text className="text-lg font-semibold text-gray-800 mb-1">
              Product Inventory ({products.length})
            </Text>
            {products.length > 0 && (
              <Text className="text-sm text-gray-600">
                Total Value: {formatCurrency(getTotalValue())}
              </Text>
            )}
          </View>
          
          {products.length === 0 ? (
            <View className="p-6">
              <Text className="text-gray-500 text-center">
                No products registered yet
              </Text>
            </View>
          ) : (
            <View>
              {products.map((product, index) => (
                <View
                  key={product.id}
                  className={`p-4 ${index < products.length - 1 ? 'border-b border-gray-100' : ''}`}
                >
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-1">
                      <Text className="text-base font-medium text-gray-800 mb-1">
                        {product.name}
                      </Text>
                      <Text className="text-sm text-gray-600 mb-1">
                        SKU: {product.sku}
                      </Text>
                    </View>
                    <View className="items-end">
                      <Text className="text-lg font-semibold text-green-600">
                        {formatCurrency(product.price)}
                      </Text>
                    </View>
                  </View>
                  
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row items-center">
                      <Text className="text-sm text-gray-600 mr-4">
                        Qty: {product.quantity}
                      </Text>
                      <Text className="text-sm text-gray-600">
                        Value: {formatCurrency(product.price * product.quantity)}
                      </Text>
                    </View>
                    <Text className="text-xs text-gray-400">
                      Added: {product.createdAt.toLocaleDateString()}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}