import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IStudent } from "../../model";

interface studentState {
  allStudents: Array<IStudent>;
}

const initialState: studentState = {
  allStudents: [],
};

const studentSlice = createSlice({
  name: "students",
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<IStudent>) => {
      state.allStudents = [...state.allStudents, action.payload];
    },
    removeStudent: (state, action: PayloadAction<number>) => {
      state.allStudents = state.allStudents.filter(
        (i) => i.id !== action.payload
      );
    },
    changeStudent: (state, action: PayloadAction<IStudent>) => {
      state.allStudents = state.allStudents.map((i) =>
        i.id === action.payload.id ? action.payload : i
      );
    },
  },
});

export const { addStudent, removeStudent, changeStudent } =
  studentSlice.actions;

export default studentSlice.reducer;
