import { Todo } from "../entities/Todo";

export interface TodoRepository {
  getTodo(): Promise<Todo>;
}
