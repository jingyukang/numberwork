import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "../slice/students";
import behaviourReducer from "../slice/behaviour";
import scoredBehaviourReducer from "../slice/scoredBehaviour";

export const store = configureStore({
  reducer: {
    behaviours: behaviourReducer,
    students: studentReducer,
    scoredBehaviours: scoredBehaviourReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
