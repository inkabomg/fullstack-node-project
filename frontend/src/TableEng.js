import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Input from "@mui/material/Input";

function TableEng(props) {
  function checkInput(e) {
    const input = e.target.value;
    // transform all input to lowercase to match
    const correctInput = input.toLowerCase();
    // compare input to the english word
    if (correctInput === props.english) {
      props.correctInput(correctInput);
    } else {
      props.incorrectInput(correctInput);
    }
  }

  return (
    <TableRow>
      {/* // display words on the left in Finnish */}
      <TableCell>{props.finnish}</TableCell>
      <TableCell>
        <Input
          sx={{ maxWidth: 180, fontSize: 11 }}
          placeholder="Type in English"
          type="text"
          size="small"
          // onblur event occurs when an object loses focus
          onBlur={checkInput}
        />
      </TableCell>
    </TableRow>
  );
}

export default TableEng;
