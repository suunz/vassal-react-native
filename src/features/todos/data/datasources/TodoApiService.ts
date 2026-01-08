import { apiClient } from "../../../../network/ApiClient";
import { TodoModel } from "../models/TodoModel";

export class TodoApiService {
  async getTodo(id: number): Promise<TodoModel> {
    const response = await apiClient.get<any>(`/todos/${id}`);
    return TodoModel.fromJson(response);
  }
}