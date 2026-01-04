import { useState, useEffect } from "react";
import { GetTodo } from "../../domain/usecases/GetTodo";
import { TodoRepositoryImpl } from "../../data/repositories/TodoRepositoryImpl";
import { Todo } from "../../domain/entities/Todo";

export const useTodo = () => {
  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);

      const useCase = new GetTodo(new TodoRepositoryImpl());

      try {
        const result = await useCase.execute();
        setTodo(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, []);

  return { todo, loading, error };
};
