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

interface Transaction {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  type: 'increment' | 'decrement';
  quantityChange: number;
  previousQuantity: number;
  newQuantity: number;
  timestamp: Date;
}

export default function ProductsScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showTransactions, setShowTransactions] = useState(false);
  const transactionsPerPage = 5;

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

    // Check if SKU (Stock Keeping Unit) already exists
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

  const getPaginatedTransactions = () => {
    const startIndex = (currentPage - 1) * transactionsPerPage;
    const endIndex = startIndex + transactionsPerPage;
    return transactions.slice(startIndex, endIndex);
  };

  const getTotalPages = () => {
    return Math.ceil(transactions.length / transactionsPerPage);
  };

  const goToNextPage = () => {
    if (currentPage < getTotalPages()) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const formatTransactionTime = (date: Date) => {
    return date.toLocaleString([], {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const adjustStock = (productId: string, adjustment: number) => {
    setProducts(prevProducts => 
      prevProducts.map(product => {
        if (product.id === productId) {
          const newQuantity = product.quantity + adjustment;
          
          // Prevent negative stock
          if (newQuantity < 0) {
            Alert.alert('Error', 'Stock cannot be negative');
            return product;
          }
          
          // Record transaction
          const transaction: Transaction = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            productId: product.id,
            productName: product.name,
            productSku: product.sku,
            type: adjustment > 0 ? 'increment' : 'decrement',
            quantityChange: Math.abs(adjustment),
            previousQuantity: product.quantity,
            newQuantity: newQuantity,
            timestamp: new Date()
          };
          
          setTransactions(prevTransactions => [transaction, ...prevTransactions]);
          
          return {
            ...product,
            quantity: newQuantity,
            lastUpdated: new Date()
          };
        }
        return product;
      })
    );
  };

  const incrementStock = (productId: string) => {
    adjustStock(productId, 1);
  };

  const decrementStock = (productId: string) => {
    adjustStock(productId, -1);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Header */}
        <View className="mb-6">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-2">
            📦 Product Management
          </Text>
          <Text className="text-sm text-gray-600 text-center mb-6">
            Register new products and manage inventory
          </Text>
          
          {/* Toggle Transaction History */}
          <TouchableOpacity
            className="bg-blue-600 py-2 px-4 rounded-lg self-center"
            onPress={() => setShowTransactions(!showTransactions)}
          >
            <Text className="text-white text-center font-medium text-sm">
              {showTransactions ? 'Hide' : 'Show'} Transaction History ({transactions.length})
            </Text>
          </TouchableOpacity>
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
                  
                  <View className="flex-row justify-between items-center mb-3">
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
                   
                   {/* Stock Adjustment Controls */}
                   <View className="flex-row justify-between items-center">
                     <View className="flex-row items-center">
                       <TouchableOpacity
                         className="bg-red-500 px-3 py-2 rounded-lg mr-2"
                         onPress={() => decrementStock(product.id)}
                       >
                         <Text className="text-white font-semibold text-sm">-</Text>
                       </TouchableOpacity>
                       
                       <View className="bg-gray-100 px-4 py-2 rounded-lg mx-2">
                         <Text className="text-gray-800 font-medium text-sm">
                           Stock: {product.quantity}
                         </Text>
                       </View>
                       
                       <TouchableOpacity
                         className="bg-green-500 px-3 py-2 rounded-lg ml-2"
                         onPress={() => incrementStock(product.id)}
                       >
                         <Text className="text-white font-semibold text-sm">+</Text>
                       </TouchableOpacity>
                     </View>
                     
                     <View className="items-end">
                       <Text className="text-xs text-gray-400">
                         Updated: {product.lastUpdated.toLocaleDateString()}
                       </Text>
                       <Text className="text-xs text-gray-400">
                         {product.lastUpdated.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                       </Text>
                     </View>
                   </View>
                </View>
              ))}
            </View>
           )}
         </View>

         {/* Transaction History */}
         {showTransactions && (
           <View className="bg-white rounded-lg shadow-sm border border-gray-200 mt-6">
             <View className="p-4 border-b border-gray-200">
               <Text className="text-lg font-semibold text-gray-800 mb-1">
                 📊 Transaction History
               </Text>
               <Text className="text-sm text-gray-600">
                 Recent stock adjustments ({transactions.length} total)
               </Text>
             </View>
             
             {transactions.length === 0 ? (
               <View className="p-6">
                 <Text className="text-gray-500 text-center">
                   No transactions recorded yet
                 </Text>
               </View>
             ) : (
               <View>
                 {getPaginatedTransactions().map((transaction, index) => (
                   <View
                     key={transaction.id}
                     className={`p-4 ${index < getPaginatedTransactions().length - 1 ? 'border-b border-gray-100' : ''}`}
                   >
                     <View className="flex-row justify-between items-start mb-2">
                       <View className="flex-1">
                         <Text className="text-base font-medium text-gray-800 mb-1">
                           {transaction.productName}
                         </Text>
                         <Text className="text-sm text-gray-600">
                           SKU: {transaction.productSku}
                         </Text>
                       </View>
                       <View className="items-end">
                         <View className={`px-2 py-1 rounded-full ${
                           transaction.type === 'increment' ? 'bg-green-100' : 'bg-red-100'
                         }`}>
                           <Text className={`text-xs font-medium ${
                             transaction.type === 'increment' ? 'text-green-700' : 'text-red-700'
                           }`}>
                             {transaction.type === 'increment' ? '+' : '-'}{transaction.quantityChange}
                           </Text>
                         </View>
                       </View>
                     </View>
                     
                     <View className="flex-row justify-between items-center">
                       <View className="flex-row items-center">
                         <Text className="text-sm text-gray-600 mr-4">
                           {transaction.previousQuantity} → {transaction.newQuantity}
                         </Text>
                         <Text className="text-sm text-gray-500">
                           Stock {transaction.type === 'increment' ? 'increased' : 'decreased'}
                         </Text>
                       </View>
                       <Text className="text-xs text-gray-400">
                         {formatTransactionTime(transaction.timestamp)}
                       </Text>
                     </View>
                   </View>
                 ))}
                 
                 {/* Pagination Controls */}
                 {getTotalPages() > 1 && (
                   <View className="p-4 border-t border-gray-200">
                     <View className="flex-row justify-between items-center">
                       <TouchableOpacity
                         className={`px-4 py-2 rounded-lg ${
                           currentPage === 1 ? 'bg-gray-200' : 'bg-blue-600'
                         }`}
                         onPress={goToPreviousPage}
                         disabled={currentPage === 1}
                       >
                         <Text className={`text-sm font-medium ${
                           currentPage === 1 ? 'text-gray-400' : 'text-white'
                         }`}>
                           Previous
                         </Text>
                       </TouchableOpacity>
                       
                       <View className="flex-row items-center">
                         <Text className="text-sm text-gray-600 mx-4">
                           Page {currentPage} of {getTotalPages()}
                         </Text>
                       </View>
                       
                       <TouchableOpacity
                         className={`px-4 py-2 rounded-lg ${
                           currentPage === getTotalPages() ? 'bg-gray-200' : 'bg-blue-600'
                         }`}
                         onPress={goToNextPage}
                         disabled={currentPage === getTotalPages()}
                       >
                         <Text className={`text-sm font-medium ${
                           currentPage === getTotalPages() ? 'text-gray-400' : 'text-white'
                         }`}>
                           Next
                         </Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                 )}
               </View>
             )}
           </View>
         )}
       </ScrollView>
     </SafeAreaView>
   );
 }