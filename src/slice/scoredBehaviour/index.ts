import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBehaviourScored } from "../../model";
import { RootState } from "../../app/store";

export interface scoredBehaviourState {
  scoredBehaviours: Array<IBehaviourScored>;
}

const initialState: scoredBehaviourState = {
  scoredBehaviours: [],
};

const scoredBehaviourSlice = createSlice({
  name: "scoredBehaviours",
  initialState,
  reducers: {
    addScoredBehaviour: (state, action: PayloadAction<IBehaviourScored>) => {
      state.scoredBehaviours = [...state.scoredBehaviours, action.payload];
    },
    editScoredBehaviour: (state, action: PayloadAction<IBehaviourScored>) => {
      state.scoredBehaviours = state.scoredBehaviours.map((b) =>
        b.id === action.payload.id ? action.payload : b
      );
    },
    resetScoredBehaviour: (state) => {
      state.scoredBehaviours = [];
    },
  },
});

export const { addScoredBehaviour, editScoredBehaviour, resetScoredBehaviour } =
  scoredBehaviourSlice.actions;

export const selectAllScoredBehaviour = (state: RootState) =>
  state.scoredBehaviours.scoredBehaviours;

export default scoredBehaviourSlice.reducer;
