import React from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useTodo } from "../hooks/useTodo";

export const TodoScreen: React.FC = () => {
  const { todo, loading, error } = useTodo();

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.text}>Loading todo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No todo found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Details</Text>
      <Text style={styles.text}>User ID: {todo.userId}</Text>
      <Text style={styles.text}>ID: {todo.id}</Text>
      <Text style={styles.text}>Title: {todo.title}</Text>
      <Text style={styles.text}>Completed: {todo.completed ? "Yes" : "No"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  text: {
    fontSize: 16,
    marginVertical: 5,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
});

