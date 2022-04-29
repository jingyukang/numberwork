import React, { FormEvent, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  selectAllBehaviour,
  createBehaviourAsync,
} from "../../slice/behaviour";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Stack,
  styled,
  tableCellClasses,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IBehaviourCreatePayload } from "../../model";
import { IBehaviour } from "../../model/behaviour/index";
import EachBehaviour from "./EachBehaviour";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BehaviourList = (): JSX.Element => {
  const allBehaviours = useAppSelector(selectAllBehaviour);
  const dispatch = useAppDispatch();

  const [behaviourName, setBehaviourName] = useState("");

  const handleBehaviourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBehaviourName(e.target.value);
  };
  const addBehaviourButton = (e: FormEvent): void => {
    e.preventDefault();
    const newBehaviour: IBehaviourCreatePayload = {
      behaviour: behaviourName,
    };
    dispatch(createBehaviourAsync(newBehaviour));
  };

  return (
    <>
      <Stack
        spacing={2}
        direction="row"
        style={{
          display: "flex",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2>NEW</h2>
        <TextField
          id="outlined-name"
          label="Behaviour"
          size="small"
          onChange={handleBehaviourChange}
        />
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={addBehaviourButton}
        >
          Add Behaviour
        </Button>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>
                <b>Behaviours ID</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Name</b>
              </StyledTableCell>
              <StyledTableCell align="center">
                <b>Action</b>
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBehaviours.map((b: IBehaviour) => (
              <EachBehaviour key={b.id} b={b} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default BehaviourList;
