import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableFin(props) {
  function checkInput(e) {
    const input = e.target.value;
    // transform all input to lowercase to match
    const correctInput = input.toLowerCase();
    // compare input to the finnish word
    if (correctInput === props.finnish) {
      props.correctInput(correctInput);
    } else {
      props.incorrectInput(correctInput);
    }
  }

  return (
    <TableRow>
      {/* // display words on the left in English */}
      <TableCell>{props.english}</TableCell>
      <TableCell>
        <Input
          sx={{ maxWidth: 180, fontSize: 11 }}
          placeholder="Type in Finnish"
          type="text"
          size="small"
          // onblur event occurs when an object loses focus
          onBlur={checkInput}
        />
      </TableCell>
    </TableRow>
  );
}

export default TableFin;
