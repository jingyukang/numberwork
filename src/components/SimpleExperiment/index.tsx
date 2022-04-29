import React, { useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { createStudentAsync } from "../../slice/students";
import { IStudnetCreatePayload } from "../../model";
import { selectAllStudents } from "../../slice/students/index";
import StudentList from "./StudentList/index";

const SimpleExperiment = (): JSX.Element => {
  const allStudents = useAppSelector(selectAllStudents);
  const dispatch = useAppDispatch();
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentAge, setNewStudentAge] = useState(0);
  const handleNewStudentNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewStudentName(e.target.value);
  };
  const handleNewStudentAgeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewStudentAge(Number(e.target.value));
  };

  const newStudentButton = (): void => {
    const createSutdentPayload: IStudnetCreatePayload = {
      studentName: newStudentName,
      age: newStudentAge,
    };
    dispatch(createStudentAsync(createSutdentPayload));
  };

  return (
    <>
      <Stack spacing={2} direction="row">
        <TextField
          id="outlined-basic"
          size="small"
          label="Name"
          variant="outlined"
          onChange={handleNewStudentNameChange}
        />
        <TextField
          id="outlined-basic"
          size="small"
          label="Age"
          variant="outlined"
          onChange={handleNewStudentAgeChange}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={newStudentButton}
        >
          New Student
        </Button>
      </Stack>
      {allStudents.map((s) => (
        <StudentList key={s.id} student={s} />
      ))}
    </>
  );
};

export default SimpleExperiment;
