import React, { useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodo, clearTodo } from "../slices/todosSlice";
import { RootState, AppDispatch } from "../../../../store/store";

export const TodosScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { todo, loading, error } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(fetchTodo(1));
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(clearTodo());
    dispatch(fetchTodo(1));
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Loading todo...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!todo) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No todo found</Text>
        <TouchableOpacity style={styles.button} onPress={handleRefresh}>
          <Text style={styles.buttonText}>Load Todo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo Details</Text>
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.label}>User ID:</Text>
          <Text style={styles.value}>{todo.userId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>ID:</Text>
          <Text style={styles.value}>{todo.id}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.value}>{todo.title}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Completed:</Text>
          <Text
            style={[
              styles.value,
              todo.completed ? styles.completed : styles.notCompleted,
            ]}
          >
            {todo.completed ? "Yes" : "No"}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRefresh}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  row: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "flex-start",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
    width: 100,
  },
  value: {
    fontSize: 16,
    color: "#333",
    flex: 1,
  },
  completed: {
    color: "#4CAF50",
    fontWeight: "600",
  },
  notCompleted: {
    color: "#F44336",
    fontWeight: "600",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    color: "#F44336",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});