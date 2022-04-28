import React from "react";
import { IStudent } from "../../../model";
import {
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  tableCellClasses,
  styled,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "../../../app/hooks";
import {
  deleteStudentAsync,
  getStudentsAsync,
} from "../../../slice/students/index";

interface listProps {
  student: IStudent;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const EachStudent = ({ student }: listProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const deleteStudentButton = (): void => {
    dispatch(deleteStudentAsync(student.id));
    dispatch(getStudentsAsync());
  };
  return (
    <TableContainer component={Paper} style={{ marginBottom: "1rem" }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Studnet Name</StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            {student.scores.map((s) => (
              <StyledTableCell key={s.id} align="center">
                {s.behaviour}
              </StyledTableCell>
            ))}
            <StyledTableCell align="center">Average</StyledTableCell>
            <StyledTableCell align="center">Statistics</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell component="th" scope="row">
              <b>{student.studentName}</b>
            </StyledTableCell>
            <StyledTableCell align="center">{student.age}</StyledTableCell>
            {student.scores.map((score) => (
              <StyledTableCell align="center">{score.score}</StyledTableCell>
            ))}
            <StyledTableCell align="center">{student.average}</StyledTableCell>
            <StyledTableCell align="center">
              {student.statistics[0] === student.statistics[1]
                ? student.statistics[0]
                : `${student.statistics[0]} to ${student.statistics[1]}`}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Button
                variant="outlined"
                color="error"
                endIcon={<DeleteIcon />}
                onClick={deleteStudentButton}
              >
                Delete
              </Button>
            </StyledTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EachStudent;
