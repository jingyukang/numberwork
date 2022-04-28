import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IBehaviour } from "../../model";

interface behaviourState {
  allBehaviours: Array<IBehaviour>;
}

const initialState: behaviourState = {
  allBehaviours: [],
};

const behaviourSlice = createSlice({
  name: "allBehaviours",
  initialState,
  reducers: {
    addBehaviour: (state, action: PayloadAction<IBehaviour>) => {
      state.allBehaviours = [...state.allBehaviours, action.payload];
    },
    removeBehaviour: (state, action: PayloadAction<number>) => {
      state.allBehaviours = state.allBehaviours.filter(
        (i) => i.id !== action.payload
      );
    },
    changeBehaviour: (state, action: PayloadAction<IBehaviour>) => {
      state.allBehaviours = state.allBehaviours.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
});

export const { addBehaviour, removeBehaviour, changeBehaviour } =
  behaviourSlice.actions;

export default behaviourSlice.reducer;
