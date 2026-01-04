import { TodoRepository } from "../repositories/TodoRepository";
import { Todo } from "../entities/Todo";

export class GetTodo {
  constructor(private todoRepo: TodoRepository) {}

  async execute(): Promise<Todo> {
    return await this.todoRepo.getTodo();
  }
}
