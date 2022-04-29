import React from "react";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { useParams } from "react-router";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { selectAllBehaviour } from "../../slice/behaviour";
import EachRow from "./EachRow";
import { Link } from "react-router-dom";
import {
  selectAllStudents,
  updateStudentAsync,
} from "../../slice/students/index";
import { IStudentUpdatePayload } from "../../model/students/index";
import {
  resetScoredBehaviour,
  selectAllScoredBehaviour,
} from "../../slice/scoredBehaviour";

const TestingPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const allStudents = useAppSelector(selectAllStudents);
  const allBehaviour = useAppSelector(selectAllBehaviour);
  const allScoredBehavior = useAppSelector(selectAllScoredBehaviour);
  const testedStudentName = useParams().name;
  const testedStudentDetail = allStudents.find(
    (s) => s.studentName === testedStudentName
  );

  console.log(allScoredBehavior);

  const resultButton = (): void => {
    const arr: Array<number> = [];
    allScoredBehavior.map((i) => arr.push(i.score));

    const studentUpdatePayload: IStudentUpdatePayload = {
      ...testedStudentDetail,
      scores: allScoredBehavior,
      average: arr.reduce((p, c) => p + c, 0) / arr.length,
      statistics: [Math.min(...arr), Math.max(...arr)],
    };
    dispatch(updateStudentAsync(studentUpdatePayload));
    dispatch(resetScoredBehaviour());
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
      }}
    >
      <h2>Testing for "{testedStudentName}"</h2>
      <TableContainer sx={{ maxWidth: "40%" }} component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>BeHaviour</b>
              </TableCell>
              <TableCell align="center">Score</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBehaviour.map((b) => (
              <EachRow key={b.id} b={b} />
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <Button
                  size="small"
                  variant="contained"
                  onClick={resultButton}
                  disabled={allBehaviour.length !== allScoredBehavior.length}
                >
                  <Link
                    to={"/"}
                    style={{ color: "inherit", textDecoration: "inherit" }}
                  >
                    Result
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TestingPage;
