import React from 'react'

function EditWord({ editForm, handleWordUpdate, updatedWord, handleTagChange, handleEngChange, handleFinChange }) {
    let { id, tag, english, finnish } = editForm

// PATCH/PUT (??? which one works better) request; calls handleWordUpdate to push changes to the page
    function handleEditForm(e) {
        e.preventDefault();
        fetch(`http://localhost:8080/vocabulary/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(editForm),
        })
            .then(resp => resp.json())
            .then(updatedWord => {
                handleWordUpdate(updatedWord)
            })
    }

    return (
        <div>
            <h4>Edit word(s)</h4>
            <form onSubmit={handleEditForm}>
                <input placeholder="Tag" type="text" name="tag" value={tag} onChange={handleTagChange}/>
                <input placeholder="Word in English" type="text" name="english" value={english} onChange={handleEngChange}/>
                <input placeholder="Word in Finnish" type="text" name="finnish" value={finnish} onChange={handleFinChange}/>
                <button onClick={() => {handleWordUpdate(updatedWord)}} type="submit">Submit changes</button>
            </form>
            <br></br>
        </div>
    )
}
export default EditWord;