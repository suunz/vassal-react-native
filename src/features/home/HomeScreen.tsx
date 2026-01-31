import React from 'react';
import { View, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { Button, Card, Text, Divider, Avatar, IconButton } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { logout } from '../auth/presentation/slices/authSlice';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<AppDispatch>();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await dispatch(logout());
            // Stay on the same screen but it will show the welcome view
          },
        },
      ]
    );
  };

  const features = [
    {
      title: 'Authentication',
      description: 'Login and signup screens with Material 3 design',
      icon: '🔐',
      onPress: () => navigation.navigate('Login'),
      showWhenAuthenticated: false,
      requiresAuth: false,
    },
    {
      title: 'Photos Gallery',
      description: 'Browse photos from JSONPlaceholder API with Redux state management',
      icon: '📸',
      onPress: () => navigation.navigate('Photos'),
      showWhenAuthenticated: true,
      requiresAuth: false,
    },
    {
      title: 'Todo List',
      description: 'Manage your todos with clean architecture pattern',
      icon: '✅',
      onPress: () => navigation.navigate('Todos'),
      showWhenAuthenticated: true,
      requiresAuth: false,
    },
    {
      title: 'UI Playground',
      description: 'Explore various UI components and interactions',
      icon: '🎨',
      onPress: () => navigation.navigate('Playground'),
      showWhenAuthenticated: true,
      requiresAuth: false,
    },
  ];

  // Show all features, but filter authentication feature when logged in
  const visibleFeatures = isAuthenticated 
    ? features.filter(feature => feature.showWhenAuthenticated)
    : features;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {isAuthenticated && user && (
        <Card style={styles.userCard} mode="elevated">
          <Card.Content style={styles.userCardContent}>
            <View style={styles.userInfo}>
              <Avatar.Image
                size={60}
                source={{ uri: user.avatar }}
                style={styles.avatar}
              />
              <View style={styles.userDetails}>
                <Text variant="headlineSmall" style={styles.userName}>
                  Welcome, {user.name}!
                </Text>
                <Text variant="bodyMedium" style={styles.userEmail}>
                  {user.email}
                </Text>
              </View>
              <IconButton
                icon="logout"
                mode="contained-tonal"
                onPress={handleLogout}
                style={styles.logoutButton}
              />
            </View>
          </Card.Content>
        </Card>
      )}

      <View style={styles.header}>
        <Text variant="displaySmall" style={styles.title}>
          {isAuthenticated ? 'Dashboard' : 'Welcome to Vassal React Native'}
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          {isAuthenticated ? 'Choose a feature to explore' : 'Explore the features below'}
        </Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.featuresContainer}>
        {visibleFeatures.map((feature, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={feature.onPress}
            onLongPress={() => {
              Alert.alert(
                feature.title,
                `Long press detected!\n\n${feature.description}`,
                [{ text: 'OK' }]
              );
            }}
            delayLongPress={800}
          >
            <Card style={styles.featureCard} mode="elevated">
              <Card.Content>
                <View style={styles.featureHeader}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                  <Text variant="titleLarge" style={styles.featureTitle}>
                    {feature.title}
                  </Text>
                </View>
                <Text variant="bodyMedium" style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </Card.Content>
              <Card.Actions>
                <Button mode="contained" onPress={feature.onPress}>
                  {feature.title === 'Authentication' ? 'Sign In' : 'Open'}
                </Button>
              </Card.Actions>
            </Card>
          </TouchableOpacity>
        ))}
      </View>

      {!isAuthenticated && (
        <>
          <Divider style={styles.divider} />
          <Card style={styles.guestCard} mode="outlined">
            <Card.Content>
              <Text variant="titleMedium" style={styles.guestTitle}>
                👋 Explore as Guest
              </Text>
              <Text variant="bodyMedium" style={styles.guestDescription}>
                You can explore all features without signing in. Authentication is optional for this demo app.
              </Text>
            </Card.Content>
          </Card>
        </>
      )}

      <View style={styles.footer}>
        <Text variant="bodySmall" style={styles.footerText}>
          Built with React Native, Redux Toolkit, and React Native Paper
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  divider: {
    marginBottom: 24,
  },
  featuresContainer: {
    gap: 16,
  },
  featureCard: {
    marginBottom: 8,
  },
  featureHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  featureTitle: {
    flex: 1,
    fontWeight: '600',
  },
  featureDescription: {
    opacity: 0.8,
    lineHeight: 20,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    opacity: 0.6,
  },
  userCard: {
    marginBottom: 24,
  },
  userCardContent: {
    padding: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    marginRight: 16,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    opacity: 0.7,
  },
  logoutButton: {
    margin: 0,
  },
  guestCard: {
    marginTop: 16,
    borderColor: '#E0E0E0',
  },
  guestTitle: {
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  guestDescription: {
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 20,
  },
});

export default HomeScreen;