import React, {useState} from 'react'
import Word from './Word'
import EditWord from './EditWord'
import "./Vocabulary.css"

function Vocabulary({ vocabulary, onUpdateWord }) {
  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: "",
    tag: "",
    english: "",
    finnish: ""
  });

  // when PATCH request happens; auto-hides the form, pushes changes to display
  function handleWordUpdate(updatedWord) {
      setIsEditing(false);
    onUpdateWord(updatedWord);
    console.log(updatedWord)
  };

  // capture user input in edit form inputs
  function handleChange(e) {
    setEditForm({
    ...editForm,
    [e.target.name]: e.target.value
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

// capture the customer you wish to edit, set to state
  function captureEdit(clickedWord) {
    let filtered = vocabulary.filter(word => word.id === clickedWord.id)
    setEditForm(filtered[0])
  }

  // create a table (HTML tag is table) into which the data gets pushed
  return (
    <div>
      {isEditing?
          (<EditWord
            editForm={editForm}
            handleChange={handleChange}
            handleWordUpdate={handleWordUpdate}
          />) : null}
    <table>
      {/* // thead = table header where columns go (th), as well as a table body
      (tbody) where the rows of data will go (tr) */}
        <thead>
          <tr>
            <th>Tag</th>
            <th>English</th>
            <th>Finnish</th>
            <th>Modify word</th>
            <th>Delete word</th>
          </tr>
        </thead>
        <tbody>
          {/* iterate through the vocabulary array and render a unique Word component for each word object in the array */}
          { vocabulary.map(word =>
                <Word
                  key={word.id}
                  word={word}
                  captureEdit={captureEdit}
                  changeEditState={changeEditState}
                />) }
        </tbody>
      </table>
    </div>
  )
}

export default Vocabulary;
