import React from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  tableCellClasses,
  styled,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IStudent } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import { deleteStudentAsync, getStudentsAsync } from "../../../slice/students";
import { Link } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

interface listProps {
  student: IStudent;
}

const StudentList = ({ student }: listProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const deleteStudentButton = (): void => {
    dispatch(deleteStudentAsync(student.id));
    dispatch(getStudentsAsync());
  };
  return (
    <TableContainer component={Paper} style={{ marginTop: "1rem" }}>
      <Table sx={{ minWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <b>Name</b>
            </StyledTableCell>
            <StyledTableCell align="center">Age</StyledTableCell>
            <StyledTableCell align="center">Tested</StyledTableCell>
            <StyledTableCell align="center">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
            <StyledTableCell component="th" scope="row">
              {student.studentName}
            </StyledTableCell>
            <StyledTableCell align="center">{student.age}</StyledTableCell>
            <StyledTableCell align="center">
              {student.scores ? <b>O</b> : <b>X</b>}
            </StyledTableCell>
            <StyledTableCell align="center">
              <Link
                to={`/testing/${student.studentName}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="secondary" variant="outlined">
                  Start the Test
                </Button>
              </Link>
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

export default StudentList;
