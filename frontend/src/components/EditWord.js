import React from 'react'

function EditWord({ editForm, handleWordUpdate, handleChange }) {
    let { id, tag, english, finnish } = editForm

// PATCH/PUT (??? which one works better) request; calls handleWordUpdate to push changes to the page
    function handleEditForm(e) {
        e.preventDefault();
        fetch(`http://localhost:8080/vocabulary/${id}`, {
            method: "PUT",
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
            <h4>Edit Word</h4>
            <form onSubmit={handleEditForm}>
                <input placeholder="Tag" type="text" name="tag" value={tag} onChange={handleChange}/>
                <input placeholder="Word in English" type="text" name="english" value={english} onChange={handleChange}/>
                <input placeholder="Word in Finnish" type="text" name="finnish" value={finnish} onChange={handleChange}/>
                <button type="submit">Submit Changes</button>
            </form>
            <br></br>
        </div>
    )
}
export default EditWord;