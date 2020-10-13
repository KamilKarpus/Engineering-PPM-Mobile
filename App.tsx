import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import HomePage from './app/pages/homePage/HomePage';
import LoginPage from './app/pages/loginPage/LoginPage';
import PackageInfoScreen from './app/pages/packageInfoScreen/PackageInfoScreen';
import ScannerScreen from './app/pages/scanScreen/ScanScreen';
import SelectPackageLocationScreen from './app/pages/selectPackageLocation/SelectPackageLocationScreen';
import { configureStore } from './app/redux';

const store = configureStore();
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen options={{headerShown: false}} name="Login" component={LoginPage} />
      <Stack.Screen options={{headerShown: false}} name="Home" component={HomePage} />
      <Stack.Screen options={{headerShown: false}} name="Scan" component={ScannerScreen} />
      <Stack.Screen options={{headerShown: false}} name="Info" component={PackageInfoScreen} />
      <Stack.Screen options={{headerShown: false}} name="Recommendation" component={SelectPackageLocationScreen} />
    </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}
