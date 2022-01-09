import React from 'react'

function Word({word, word:{id, tag, english, finnish}, captureEdit, changeEditState}) {

  return (
    <tr key={id}>
      {/* // The <td> HTML element defines a cell of a table that contains data */}
      <td>{tag}</td>
      <td>{english}</td>
      <td>{finnish}</td>
      {/* // TODO: edit and delete */}
      <td><button onClick={() => {
                    captureEdit(word);
                    changeEditState(word)
                  }}>Edit</button></td>
      <td><button>Delete</button></td>
    </tr>
  )
}
export default Word;
