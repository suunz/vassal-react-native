import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Card, Text, Divider } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const features = [
    {
      title: 'Photos Gallery',
      description: 'Browse photos from JSONPlaceholder API with Redux state management',
      icon: '📸',
      onPress: () => navigation.navigate('Photos'),
    },
    {
      title: 'Todo List',
      description: 'Manage your todos with clean architecture pattern',
      icon: '✅',
      onPress: () => navigation.navigate('Todos'),
    },
    {
      title: 'UI Playground',
      description: 'Explore various UI components and interactions',
      icon: '🎨',
      onPress: () => navigation.navigate('Playground'),
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text variant="headlineLarge" style={styles.title}>
          Welcome to Vassal React Native
        </Text>
        <Text variant="bodyLarge" style={styles.subtitle}>
          Explore the features below
        </Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.featuresContainer}>
        {features.map((feature, index) => (
          <Card key={index} style={styles.featureCard} mode="elevated">
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
                Open
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </View>

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
});

export default HomeScreen;