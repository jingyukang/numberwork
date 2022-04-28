import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchStudents,
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../api/student";
import type { RootState } from "../../app/store";
import {
  IStudent,
  IStudnetCreatePayload,
  IStudentUpdatePayload,
} from "../../model";

interface studentState {
  allStudents: Array<IStudent>;
}

const initialState: studentState = {
  allStudents: [],
};

export const getStudentsAsync = createAsyncThunk(
  "students/fetchStudents",
  async () => await fetchStudents()
);

export const createStudentAsync = createAsyncThunk(
  "students/createStudent",
  async (student: IStudnetCreatePayload) => await createStudent(student)
);

export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id: number) => await deleteStudent(id)
);

export const updateStudentAsync = createAsyncThunk(
  "students/updateStudent",
  async (student: IStudentUpdatePayload) => await updateStudent(student)
);

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
  extraReducers(builder) {
    builder
      .addCase(getStudentsAsync.fulfilled, (state, action) => {
        state.allStudents = action.payload;
      })
      .addCase(createStudentAsync.fulfilled, (state, action) => {
        studentSlice.caseReducers.addStudent(state, action);
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        studentSlice.caseReducers.removeStudent(state, action);
      })
      .addCase(updateStudentAsync.fulfilled, (state, action) => {
        studentSlice.caseReducers.changeStudent(state, action);
      });
  },
});

export const { addStudent, removeStudent, changeStudent } =
  studentSlice.actions;

export const selectAllStudents = (state: RootState): Array<IStudent> =>
  state.students.allStudents;

export default studentSlice.reducer;
