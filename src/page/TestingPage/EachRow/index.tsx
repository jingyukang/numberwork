import React, { useState } from "react";
import { TableRow, TableCell, TextField, Button } from "@mui/material";
import { IBehaviour } from "../../../model/behaviour";
import SendIcon from "@mui/icons-material/Send";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  addScoredBehaviour,
  editScoredBehaviour,
} from "../../../slice/scoredBehaviour";
import { selectAllScoredBehaviour } from "../../../slice/scoredBehaviour/index";
import { IBehaviourScored } from "../../../model/behaviour";

interface listProps {
  b: IBehaviour;
}

const EachRow = ({ b }: listProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const allScoredBe = useAppSelector(selectAllScoredBehaviour);
  const [numScore, setNumScore] = useState<number>(0);

  const scoreSendButton = (): void => {
    const addScoredBehaviourPayload = {
      ...b,
      score: numScore,
    };
    allScoredBe.find((sb: IBehaviourScored) => sb.id === b.id)
      ? dispatch(editScoredBehaviour(addScoredBehaviourPayload))
      : dispatch(addScoredBehaviour(addScoredBehaviourPayload));
  };

  return (
    <TableRow
      key={b.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {b.behaviour}
      </TableCell>
      <TableCell align="right">
        <TextField
          id="outlined-number"
          size="small"
          label="Number"
          type="number"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setNumScore(Number(e.target.value));
          }}
        />
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          endIcon={<SendIcon />}
          onClick={scoreSendButton}
          disabled={!numScore}
        >
          Send
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EachRow;
