import React, { useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllStudents } from "../../slice/students";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import EachStudent from "./EachStudent/index";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const AboutStudent = (): JSX.Element => {
  const theme = useTheme();
  const [personName, setPersonName] = useState<string[]>([]);
  const allStudents = useAppSelector(selectAllStudents);

  const testedStudents = allStudents.filter((s) => s.scores);

  const names = testedStudents.map((s) => s.studentName);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const studentDetailRender = (): JSX.Element =>
    personName.length <= 0 ? (
      <h1> Nothing to List</h1>
    ) : (
      <>
        {personName.map((p) =>
          allStudents.map((s) => {
            if (p === s.studentName) {
              return <EachStudent key={s.id} student={s} />;
            }
          })
        )}
      </>
    );
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {studentDetailRender()}
    </div>
  );
};

export default AboutStudent;
