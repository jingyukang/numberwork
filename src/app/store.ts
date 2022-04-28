import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/students";
import behaviourReducer from "../slice/behaviour";

export const store = configureStore({
  reducer: {
    behaviours: behaviourReducer,
    students: studentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
