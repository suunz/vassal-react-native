/**
 * Sample React Native App - Mini UI Playground
 * 
 * 
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
  Alert,
} from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { TodosScreen } from './src/features/todos/presentation/screens/TodosScreen';
import { store } from './src/store/store';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { customLightTheme, customDarkTheme } from './src/theme/appTheme';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  const scheme = useColorScheme(); // 'light' or 'dark' based on system setting

  const theme = scheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PaperProvider theme={theme}>
       <AppContent />
      </PaperProvider>
    </SafeAreaProvider>
  
  );
}

function AppContent() {
  return (
    <Provider store={store}>  
      <TodosScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 20,
  },
  box: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
  },
  textItem: {
    fontSize: 20,
    color: 'black',
    marginVertical: 5,
    textAlign: 'center',
  },
});

export default App;
