import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  Checkbox,
  Snackbar,
  Divider,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { RootState, AppDispatch } from '../../../../store/store';
import { signUp, clearError } from '../slices/authSlice';
import { SignUpData } from '../../domain/entities/User';

const SignUpScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [formData, setFormData] = useState<SignUpData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [formErrors, setFormErrors] = useState<Partial<SignUpData & { terms: string }>>({});

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Welcome');
    }
  }, [isAuthenticated, navigation]);

  const validateForm = (): boolean => {
    const errors: Partial<SignUpData & { terms: string }> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = 'Password must contain uppercase, lowercase, and number';
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      errors.terms = 'You must accept the terms and conditions';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async () => {
    if (!validateForm()) return;

    try {
      await dispatch(signUp(formData)).unwrap();
    } catch (error) {
      // Error is handled by Redux
    }
  };

  const handleInputChange = (field: keyof SignUpData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear field error when user starts typing
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getPasswordStrength = (password: string): { strength: string; color: string } => {
    if (password.length === 0) return { strength: '', color: '' };
    if (password.length < 6) return { strength: 'Weak', color: '#F44336' };
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { strength: 'Medium', color: '#FF9800' };
    }
    return { strength: 'Strong', color: '#4CAF50' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="displaySmall" style={styles.title}>
            Create Account
          </Text>
          <Text variant="bodyLarge" style={styles.subtitle}>
            Join us and start your journey
          </Text>
        </View>

        <Card style={styles.card} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.form}>
              <TextInput
                label="Full Name"
                value={formData.name}
                onChangeText={(text) => handleInputChange('name', text)}
                mode="outlined"
                autoCapitalize="words"
                autoComplete="name"
                error={!!formErrors.name}
                style={styles.input}
                left={<TextInput.Icon icon="account" />}
              />
              {formErrors.name && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.name}
                </Text>
              )}

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
                autoComplete="new-password"
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
              {passwordStrength.strength && (
                <Text
                  variant="bodySmall"
                  style={[styles.strengthText, { color: passwordStrength.color }]}
                >
                  Password strength: {passwordStrength.strength}
                </Text>
              )}
              {formErrors.password && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.password}
                </Text>
              )}

              <TextInput
                label="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                mode="outlined"
                secureTextEntry={!showConfirmPassword}
                autoComplete="new-password"
                error={!!formErrors.confirmPassword}
                style={styles.input}
                left={<TextInput.Icon icon="lock-check" />}
                right={
                  <TextInput.Icon
                    icon={showConfirmPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                }
              />
              {formErrors.confirmPassword && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.confirmPassword}
                </Text>
              )}

              <View style={styles.checkboxContainer}>
                <Checkbox
                  status={acceptTerms ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setAcceptTerms(!acceptTerms);
                    if (formErrors.terms) {
                      setFormErrors(prev => ({ ...prev, terms: undefined }));
                    }
                  }}
                />
                <Text variant="bodyMedium" style={styles.checkboxText}>
                  I agree to the{' '}
                  <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </Text>
              </View>
              {formErrors.terms && (
                <Text variant="bodySmall" style={styles.errorText}>
                  {formErrors.terms}
                </Text>
              )}

              <Button
                mode="contained"
                onPress={handleSignUp}
                loading={loading}
                disabled={loading}
                style={styles.signUpButton}
                contentStyle={styles.buttonContent}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>

              <Divider style={styles.divider} />

              <Text variant="bodySmall" style={styles.securityNote}>
                🔒 Your information is secure and encrypted
              </Text>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.footerText}>
            Already have an account?{' '}
          </Text>
          <Button
            mode="text"
            onPress={() => navigation.navigate('Login')}
            compact
          >
            Sign In
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
  strengthText: {
    marginTop: -12,
    marginLeft: 16,
    fontWeight: '500',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 8,
    lineHeight: 20,
  },
  linkText: {
    color: '#1976D2',
    fontWeight: '500',
  },
  signUpButton: {
    marginTop: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
  divider: {
    marginVertical: 8,
  },
  securityNote: {
    textAlign: 'center',
    opacity: 0.6,
    fontStyle: 'italic',
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

export default SignUpScreen;