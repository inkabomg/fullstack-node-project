import React from "react";
import Button from "@mui/material/Button";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

function Word({
  word,
  word: { id, tag, english, finnish },
  captureEdit,
  changeEditState,
  deleteWord,
}) {
  return (
    <TableRow key={id}>
      {/* // The <td> HTML element defines a cell of a table that contains data */}
      <TableCell>{tag}</TableCell>
      <TableCell>{english}</TableCell>
      <TableCell>{finnish}</TableCell>
      {/* // TODO: edit and delete */}
      <TableCell>
        <Button
          variant="contained"
          size="small"
          style={{ marginTop: "5px", background: "#a9d4c7" }}
          onClick={() => {
            captureEdit(word);
            changeEditState(word);
          }}
        >
          Edit
        </Button>
      </TableCell>
      <TableCell>
        <Button
          variant="contained"
          size="small"
          style={{ marginTop: "5px", background: "#a9d4c7" }}
          onClick={() => deleteWord(word.id)}
        >
          Delete
        </Button>
      </TableCell>
    </TableRow>
  );
}
export default Word;
