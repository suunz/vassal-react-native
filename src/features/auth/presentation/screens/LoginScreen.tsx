import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Divider,
  IconButton,
  Snackbar,
  ActivityIndicator,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../../../store/store';
import { login, clearError } from '../slices/authSlice';
import { AuthCredentials } from '../../domain/entities/User';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState<AuthCredentials>({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<AuthCredentials>>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Welcome');
    }
  }, [isAuthenticated, navigation]);

  const validateForm = (): boolean => {
    const errors: Partial<AuthCredentials> = {};

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(login(formData)).unwrap();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleInputChange = (field: keyof AuthCredentials, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const fillDemoCredentials = () => {
    setFormData({
      email: 'demo@example.com',
      password: 'password',
    });
    setFormErrors({});
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Welcome Back
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Sign in to your account
          </Text>
        </View>

        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.form}>
              <TextInput
                label="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                error={!!formErrors.email}
                style={styles.input}
                left={<TextInput.Icon icon="email" />}
              />
              {formErrors.email && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.email}
                </Text>
              )}

              <TextInput
                label="Password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                mode="outlined"
                secureTextEntry={!showPassword}
                autoComplete="password"
                error={!!formErrors.password}
                style={styles.input}
                left={<TextInput.Icon icon="lock" />}
                right={
                  <TextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword(!showPassword)}
                  />
                }
              />
              {formErrors.password && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.password}
                </Text>
              )}

              <Button
                mode="text"
                onPress={() => Alert.alert('Forgot Password', 'Feature coming soon!')}
                style={styles.forgotButton}
              >
                Forgot Password?
              </Button>

              <Button
                mode="contained"
                onPress={handleLogin}
                loading={loading}
                disabled={loading}
                style={styles.loginButton}
                contentStyle={styles.buttonContent}
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>

              <Divider style={styles.divider} />

              <Button
                mode="outlined"
                onPress={fillDemoCredentials}
                style={styles.demoButton}
                icon="account-circle"
              >
                Use Demo Account
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.footerText}>
            Don't have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('SignUp')}
            compact
          >
            Sign Up
          </Button>
        </View>
      </ScrollView>

      <Snackbar
        visible={!!error}
        onDismiss={() => dispatch(clearError())}
        duration={4000}
        action={{
          label: 'Dismiss',
          onPress: () => dispatch(clearError()),
        }}
      >
        {error}
      </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  card: {
    marginBottom: 24,
  },
  cardContent: {
    padding: 24,
  },
  form: {
    gap: 16,
  },
  input: {
    backgroundColor: 'transparent',
  },
  errorText: {
    color: '#B00020',
    marginTop: -12,
    marginLeft: 16,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginTop: -8,
  },
  loginButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  demoButton: {
    marginTop: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    opacity: 0.7,
  },
});

export default LoginScreen;