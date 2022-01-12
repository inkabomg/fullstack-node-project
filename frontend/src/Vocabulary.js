import React, {useState, useEffect} from 'react'
import Word from './Word'
import EditWord from './EditWord'
import "./Vocabulary.css"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function Vocabulary({ vocabulary, onUpdateWord }) {
  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  const [state, setState] = useState([]);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    tag: "",
    english: "",
    finnish: ""
  });

  useEffect(() => {
    fetch("http://localhost:8080/vocabulary/")
      .then(resp => resp.json())
      .then(data => setState(data)) // set data to state
  }, []);

  // when PATCH request happens; auto-hides the form, pushes changes to display
  function handleWordUpdate(updatedWord) {
    setIsEditing(false);
    onUpdateWord(updatedWord);
    console.log(updatedWord)
  };

  // capture user input in edit form inputs
  function handleTagChange(e) {
    setEditForm({
    ...editForm,
    tag: e.target.value
    })
  };

  function handleEngChange(e) {
    setEditForm({
    ...editForm,
    english: e.target.value
    })
  };

  function handleFinChange(e) {
    setEditForm({
    ...editForm,
    finnish: e.target.value
    })
  };

  // needed logic for conditional rendering of the form - shows the word you want when you want them, and hides it when you don't
  function changeEditState(word) {
    if (word.id === editForm.id) {
      setIsEditing(isEditing => !isEditing) // hides the form
    } else if (isEditing === false) {
      setIsEditing(editing => !editing) // shows the form
    }
    console.log(word)
  }

// capture the word you wish to edit, set to state
  function captureEdit(clickedWord) {
    let filtered = vocabulary.filter(word => word.id === clickedWord.id)
    setEditForm(filtered[0])
  }

  function deleteWord(id) {
    const removed = [...state].filter(word => word.id !== id);
    setState(removed);
    fetch(`http://localhost:8080/vocabulary/` + id, {
      method: "DELETE",
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
    })
  };

  // // create a tableinto which the data gets pushed
  return (
    <div>
      {isEditing?
          (<EditWord
            editForm={editForm}
            handleTagChange={handleTagChange}
            handleEngChange={handleEngChange}
            handleFinChange={handleFinChange}
            handleWordUpdate={handleWordUpdate}
          />) : null}
    <TableContainer>
      <Table sx={{ maxWidth: 450 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Tag</TableCell>
            <TableCell>English</TableCell>
            <TableCell>Finnish</TableCell>
            <TableCell>Modify word</TableCell>
            <TableCell>Delete word</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {/* iterate through the vocabulary array and render a unique
          Word component for each word object in the array */}
          { vocabulary.map(word =>
            <Word
              key={word.id}
              word={word}
              captureEdit={captureEdit}
              changeEditState={changeEditState}
              deleteWord={deleteWord}
            />)}
            <TableRow>
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
