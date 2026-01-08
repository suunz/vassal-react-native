import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";
import { TodoApiService } from "../datasources/TodoApiService";

export class TodoRepositoryImpl implements TodoRepository {
  private apiService: TodoApiService;

  constructor(apiService?: TodoApiService) {
    this.apiService = apiService || new TodoApiService();
  }

  async getTodo(id: number): Promise<Todo> {
    return await this.apiService.getTodo(id);
  }
}