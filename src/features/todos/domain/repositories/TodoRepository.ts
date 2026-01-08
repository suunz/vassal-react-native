import { Todo } from "../entities/Todo";

export interface TodoRepository {
  getTodo(id: number): Promise<Todo>;
}