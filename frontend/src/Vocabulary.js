import React, { useState } from "react";
import Word from "./Word";
import EditWord from "./EditWord";
import "./Vocabulary.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function Vocabulary({ vocabulary, onUpdateWord }) {
  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: "",
    tag: "",
    english: "",
    finnish: "",
  });

  function handleWordUpdate() {
    setIsEditing(false);
    const updatedWord = {
      id: editForm.id,
      tag: editForm.tag,
      english: editForm.english,
      finnish: editForm.finnish,
    };
    onUpdateWord(updatedWord);
  }

  // capture user input in edit form inputs
  function handleTagChange(e) {
    setEditForm({
      ...editForm,
      tag: e.target.value,
    });
  }

  function handleEngChange(e) {
    setEditForm({
      ...editForm,
      english: e.target.value,
    });
  }

  function handleFinChange(e) {
    setEditForm({
      ...editForm,
      finnish: e.target.value,
    });
  }

  // Needed logic for conditional rendering of the form - shows the word you want when you want them, and hides it when you don't
  function changeEditState(word) {
    if (word.id === editForm.id) {
      setIsEditing((isEditing) => !isEditing); // hides the form
    } else if (isEditing === false) {
      setIsEditing((editing) => !editing); // shows the form
    }
  }

  // Capture the word to edit, set to state
  function captureEdit(clickedWord) {
    let filtered = vocabulary.filter((word) => word.id === clickedWord.id);
    setEditForm(filtered[0]);
  }

  // // Create a table into which the data gets pushed
  return (
    <div>
      {isEditing ? (
        <EditWord
          editForm={editForm}
          handleTagChange={handleTagChange}
          handleEngChange={handleEngChange}
          handleFinChange={handleFinChange}
          handleWordUpdate={handleWordUpdate}
        />
      ) : null}
      <TableContainer>
        <Table sx={{ maxWidth: 450 }} aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ background: "#ceede4" }}>Tag</TableCell>
              <TableCell style={{ background: "#ceede4" }}>English</TableCell>
              <TableCell style={{ background: "#ceede4" }}>Finnish</TableCell>
              <TableCell
                sx={{ minWidth: 90 }}
                style={{ background: "#ceede4" }}
              >
                Modify word
              </TableCell>
              <TableCell
                sx={{ minWidth: 90 }}
                style={{ background: "#ceede4" }}
              >
                Delete word
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* iterate through the vocabulary array and render a unique
          Word component for each word object in the array */}
            {vocabulary.map((word) => (
              <Word
                key={word.id}
                word={word}
                captureEdit={captureEdit}
                changeEditState={changeEditState}
              />
            ))}
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{vocabulary.english}</TableCell>
              <TableCell>{vocabulary.finnish}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Vocabulary;
