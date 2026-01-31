/**
 * Sample React Native App - Mini UI Playground
 * 
 * 
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { TodosScreen } from './src/features/todos/presentation/screens/TodosScreen';
import PhotosScreen from './src/features/photos/presentation/screens/PhotosScreen';
import LoginScreen from './src/features/auth/presentation/screens/LoginScreen';
import SignUpScreen from './src/features/auth/presentation/screens/SignUpScreen';
import { store } from './src/store/store';
import { PaperProvider } from 'react-native-paper';
import { customLightTheme, customDarkTheme } from './src/theme/appTheme';
import CustomPlayGround from './src/features/playground/CustomPlayGround';
import HomeScreen from './src/features/home/HomeScreen';

const Stack = createNativeStackNavigator();

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const scheme = useColorScheme();
  const theme = scheme === 'dark' ? customDarkTheme : customLightTheme;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <PaperProvider theme={theme}>
          <Provider store={store}>
            <NavigationContainer>
              <Stack.Navigator 
                initialRouteName="Welcome"
                screenOptions={{
                  headerTitleAlign: 'center',
                  headerStyle: {
                    backgroundColor: '#f5f5f5',
                  },
                  gestureEnabled: true,
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Screen 
                  name="Welcome" 
                  component={HomeScreen} 
                  options={{ 
                    title: 'Vassal React Native',
                    headerShown: false,
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen 
                  name="Login" 
                  component={LoginScreen} 
                  options={{ 
                    headerShown: false,
                    presentation: 'modal',
                    animation: 'slide_from_bottom',
                  }}
                />
                <Stack.Screen 
                  name="SignUp" 
                  component={SignUpScreen} 
                  options={{ 
                    title: 'Create Account',
                    headerBackTitle: 'Back',
                    presentation: 'card',
                  }}
                />
                <Stack.Screen 
                  name="Home" 
                  component={HomeScreen} 
                  options={{ 
                    title: 'Dashboard',
                    headerBackVisible: false,
                    gestureEnabled: false,
                  }}
                />
                <Stack.Screen 
                  name="Photos" 
                  component={PhotosScreen} 
                  options={{ 
                    title: 'Photos Gallery',
                    headerTintColor: '#1976D2',
                  }}
                />
                <Stack.Screen 
                  name="Todos" 
                  component={TodosScreen} 
                  options={{ 
                    title: 'Todo List',
                    headerTintColor: '#4CAF50',
                  }}
                />
                <Stack.Screen 
                  name="Playground" 
                  component={CustomPlayGround} 
                  options={{ 
                    title: 'UI Playground',
                    headerTintColor: '#FF9800',
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </Provider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
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

