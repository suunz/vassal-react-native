import { TodoRepository } from "../repositories/TodoRepository";
import { Todo } from "../entities/Todo";

export class GetTodo {
  constructor(private todoRepository: TodoRepository) {}

  async execute(id: number = 1): Promise<Todo> {
    return await this.todoRepository.getTodo(id);
  }
}