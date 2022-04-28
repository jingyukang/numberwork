import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { IStudent } from "../../model";

interface studentState {
  allStudents: Array<IStudent>;
}

const initialState: studentState = {
  allStudents: [
    {
      id: 1,
      studentName: "jin1",
      age: 12,
      scores: [
        { id: 1, behaviour: "read", score: 5 },
        { id: 2, behaviour: "speak", score: 4 },
        { id: 3, behaviour: "write", score: 3 },
        { id: 4, behaviour: "physical", score: 2 },
      ],
      average: 3.5,
      statistics: [2, 5],
    },
    {
      id: 2,
      studentName: "jin2",
      age: 15,
      scores: [
        { id: 1, behaviour: "read", score: 2 },
        { id: 2, behaviour: "speak", score: 3 },
        { id: 3, behaviour: "write", score: 4 },
        { id: 4, behaviour: "physical", score: 5 },
      ],
      average: 3.5,
      statistics: [2, 5],
    },
    {
      id: 3,
      studentName: "jin3",
      age: 5,
      scores: [
        { id: 1, behaviour: "read", score: 3 },
        { id: 2, behaviour: "speak", score: 3 },
        { id: 3, behaviour: "write", score: 3 },
        { id: 4, behaviour: "physical", score: 3 },
      ],
      average: 3,
      statistics: [3, 3],
    },
  ],
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
