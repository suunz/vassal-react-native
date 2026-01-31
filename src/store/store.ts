import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/presentation/slices/todosSlice";
import photosReducer from "../features/photos/presentation/slices/photosSlice";
import authReducer from "../features/auth/presentation/slices/authSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    photos: photosReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;