import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/presentation/slices/todosSlice";
import photosReducer from "../features/photos/presentation/slices/photosSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    photos: photosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;