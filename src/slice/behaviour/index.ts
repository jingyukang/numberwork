import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IBehaviour } from "../../model";
import {
  fetchBehaviours,
  createBehaviour,
  deleteBehaviour,
} from "../../api/behaviour/index";
import { IBehaviourCreatePayload } from "../../model/behaviour/index";

interface behaviourState {
  allBehaviours: Array<IBehaviour>;
}

const initialState: behaviourState = {
  allBehaviours: [],
};

export const getBehaviourAsync = createAsyncThunk(
  "behaviours/fetchBehaviours",
  async () => await fetchBehaviours()
);

export const createBehaviourAsync = createAsyncThunk(
  "behaviours/createBehaviour",
  async (behaviour: IBehaviourCreatePayload) => await createBehaviour(behaviour)
);

export const deleteBehaviourAsync = createAsyncThunk(
  "behaviours/deleteBehaviour",
  async (id: number) => await deleteBehaviour(id)
);

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
  extraReducers(builder) {
    builder
      .addCase(getBehaviourAsync.fulfilled, (state, action) => {
        state.allBehaviours = action.payload;
      })
      .addCase(createBehaviourAsync.fulfilled, (state, action) =>
        behaviourSlice.caseReducers.addBehaviour(state, action)
      )
      .addCase(deleteBehaviourAsync.fulfilled, (state, action) => {
        behaviourSlice.caseReducers.removeBehaviour(state, action);
      });
  },
});

export const { addBehaviour, removeBehaviour, changeBehaviour } =
  behaviourSlice.actions;

export const selectAllBehaviour = (state: RootState): Array<IBehaviour> =>
  state.behaviours.allBehaviours;

export default behaviourSlice.reducer;
