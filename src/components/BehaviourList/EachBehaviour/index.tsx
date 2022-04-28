import React from "react";
import { TableCell, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { IBehaviour } from "../../../model";
import { useAppDispatch } from "../../../app/hooks";
import { deleteBehaviourAsync } from "../../../slice/behaviour";
import { getBehaviourAsync } from "../../../slice/behaviour/index";

interface listProps {
  b: IBehaviour;
}

const EachBehaviour = ({ b }: listProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const deleteBehaviourButton = (): void => {
    dispatch(deleteBehaviourAsync(b.id));
    dispatch(getBehaviourAsync());
  };
  return (
    <TableRow
      key={b.id}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {b.id}
      </TableCell>
      <TableCell align="center">{b.behaviour}</TableCell>
      <TableCell align="center">
        <Button
          variant="outlined"
          color="error"
          endIcon={<DeleteIcon />}
          onClick={deleteBehaviourButton}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default EachBehaviour;
