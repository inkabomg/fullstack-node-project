import React from "react";
import Button from "@mui/material/Button";

function EditWord({
  editForm,
  handleWordUpdate,
  updatedWord,
  handleTagChange,
  handleEngChange,
  handleFinChange,
}) {
  let { tag, english, finnish } = editForm;

  function handleEditForm(e) {
    e.preventDefault();
    handleWordUpdate();
  }

  return (
    <div>
      <h4>Edit word(s)</h4>
      <form onSubmit={handleEditForm}>
        <input
          placeholder="Tag"
          type="text"
          name="tag"
          value={tag}
          onChange={handleTagChange}
        />
        <input
          placeholder="Word in English"
          type="text"
          name="english"
          value={english}
          onChange={handleEngChange}
        />
        <input
          placeholder="Word in Finnish"
          type="text"
          name="finnish"
          value={finnish}
          onChange={handleFinChange}
        />
        <Button
          variant="contained"
          size="small"
          style={{ marginLeft: "5px", background: "#a9d4c7" }}
          onClick={() => {
            handleWordUpdate(updatedWord);
          }}
          type="submit"
        >
          Submit changes
        </Button>
      </form>
      <br></br>
    </div>
  );
}
export default EditWord;
