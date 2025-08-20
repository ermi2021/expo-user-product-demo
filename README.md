# User & Product Management App

A React Native app built with Expo and NativeWind for managing users and products with local state management.

## Features

- User registration (email + full name)
- Product registration (SKU, name, price, quantity)
- Stock adjustment with validation
- Product status tracking
- Transaction history with pagination

## Tech Stack

- **React Native** with Expo
- **NativeWind** for Tailwind CSS styling
- **TypeScript** for type safety
- **React Navigation** for navigation
- **Local state management** with React hooks

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd expo-user-product-demo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Open the app:
   - Scan the QR code with Expo Go (mobile)
   - Press `w` for web
   - Press `i` for iOS simulator
   - Press `a` for Android emulator

## Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web