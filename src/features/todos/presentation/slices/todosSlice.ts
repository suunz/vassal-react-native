import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../../domain/entities/Todo";
import { GetTodo } from "../../domain/usecases/GetTodo";
import { TodoRepositoryImpl } from "../../data/repositories/TodoRepositoryImpl";

interface TodosState {
  todo: Todo | null;
  loading: boolean;
  error: string | null;
}

const initialState: TodosState = {
  todo: null,
  loading: false,
  error: null,
};

// Async thunk for fetching todo
export const fetchTodo = createAsyncThunk(
  "todos/fetchTodo",
  async (id: number = 1, { rejectWithValue }) => {
    try {
      const getTodoUseCase = new GetTodo(new TodoRepositoryImpl());
      const todo = await getTodoUseCase.execute(id);
      return todo;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to fetch todo");
    }
  }
);

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    clearTodo: (state) => {
      state.todo = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.loading = false;
        state.todo = action.payload;
        state.error = null;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearTodo, clearError } = todosSlice.actions;
export default todosSlice.reducer;