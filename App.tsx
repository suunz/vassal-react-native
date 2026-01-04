/**
 * Sample React Native App - Mini UI Playground
 * @format
 */

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
import {TodoScreen} from './features/todo/presentation/screens/TodoScreen';
import { Provider } from 'react-redux';
import { store } from './features/store';
import { CounterScreen } from './features/demoCounter/counterScreen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
        <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
    </Provider>
  
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  // Function to handle button presses
  const handlePress = (index: number) => {
    Alert.alert('Button Pressed', `Button ${index} pressed!`);
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.scrollContainer,
        { paddingTop: safeAreaInsets.top, paddingBottom: safeAreaInsets.bottom },
      ]}
    >
      <Text style={styles.title}>Mini UI Playground</Text>
        <TodoScreen />
        <CounterScreen />
    </ScrollView>
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
