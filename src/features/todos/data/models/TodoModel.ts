import { Todo } from "../../domain/entities/Todo";

export class TodoModel implements Todo {
  constructor(
    public userId: number,
    public id: number,
    public title: string,
    public completed: boolean
  ) {}

  static fromJson(json: any): TodoModel {
    return new TodoModel(
      json.userId,
      json.id,
      json.title,
      json.completed
    );
  }

  toJson(): any {
    return {
      userId: this.userId,
      id: this.id,
      title: this.title,
      completed: this.completed,
    };
  }
}