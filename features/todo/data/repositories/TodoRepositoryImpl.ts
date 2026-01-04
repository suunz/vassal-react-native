import { TodoRepository } from "../../domain/repositories/TodoRepository";
import { Todo } from "../../domain/entities/Todo";
import { TodoModel } from "../models/TodoModel";
import api from "../datasources/ApiService";

export class TodoRepositoryImpl implements TodoRepository {
  async getTodo(): Promise<Todo> {
    const response = await api.get("/todos/1");
    return TodoModel.fromJson(response.data);
  }
}
