import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store/store';
import { setInitialized } from '../slices/authSlice';

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Simulate checking for stored auth token
    const initializeAuth = async () => {
      try {
        // Here you would check AsyncStorage for stored tokens
        // For now, we'll just mark as initialized
        // await new Promise(resolve => setTimeout(resolve, 1000));
        dispatch(setInitialized());
      } catch (error) {
        console.error('Auth initialization error:', error);
        dispatch(setInitialized());
      }
    };

    initializeAuth();
  }, [dispatch]);

  if (!isInitialized) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyLarge" style={styles.loadingText}>
          Initializing...
        </Text>
      </View>
    );
  }

  return <>{children}</>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default AuthWrapper;