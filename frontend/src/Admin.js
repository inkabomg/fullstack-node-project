import React, { useEffect, useState } from "react";
import Vocabulary from "./Vocabulary";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";

function AdminComponent(props) {
  // Set state
  const [vocabulary, setVocabulary] = useState([]);
  const [tag, setTag] = useState("");
  const [english, setEnglish] = useState("");
  const [finnish, setFinnish] = useState("");

  // // To see the console up to date with the array
  // useEffect(() => {
  //   console.log(...vocabulary)
  // });

  // First data grab
  useEffect(() => {
    fetch("http://localhost:8080/vocabulary/")
      .then((resp) => resp.json())
      .then((data) => setVocabulary(data)); // set data to state
  }, []);

  const handleTagChange = (e) => {
    // Set the Tag value to anything we type in
    setTag(e.target.value);
  };

  const handleEngChange = (e) => {
    // Set the English word value to anything we type in
    setEnglish(e.target.value);
  };

  const handleFinChange = (e) => {
    // Set the Finnish word value to anything we type in
    setFinnish(e.target.value);
  };

  function handleSubmit() {
    if (!tag || !english || !finnish) {
      // A pop up window
      alert("Cannot submit an empty word pair");
    } else {
      fetch("http://localhost:8080/vocabulary/", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: tag,
          english: english,
          finnish: finnish,
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((err) => console.log(err));
      // Emptying the input boxes after submitting a word
      setTag("");
      setEnglish("");
      setFinnish("");
    }
  }

  // PUT request
  function onUpdateWord(updatedWord) {
    fetch(`http://localhost:8080/vocabulary/${updatedWord.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedWord),
    }).then((resp) => resp.json());

    // Update vocabulary on page after edit
    const updatedVocabulary = vocabulary.map((word) => {
      if (word.id === updatedWord.id) {
        return updatedWord;
      } else {
        return word;
      }
    });
    setVocabulary(updatedVocabulary);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a word pair</h3>
        <Input
          size="small"
          sx={{ maxWidth: 130, marginRight: 2, fontSize: 12 }}
          placeholder="Tag"
          type="text"
          name="tag"
          value={tag}
          onChange={handleTagChange}
        />
        <Input
          size="small"
          sx={{ maxWidth: 130, fontSize: 12 }}
          placeholder="Word in English"
          type="text"
          name="english"
          value={english}
          onChange={handleEngChange}
        />
        <Input
          size="small"
          sx={{ maxWidth: 130, marginLeft: 2, fontSize: 12 }}
          placeholder="Word in Finnish"
          type="text"
          name="finnish"
          value={finnish}
          onChange={handleFinChange}
        />
        <Button
          variant="outlined"
          sx={{ marginLeft: 2 }}
          color="success"
          style={{ maringLeft: "1px", color: "#004643" }}
          size="small"
          type="submit"
        >
          Add a word pair
        </Button>
      </form>
      <br></br>
      {/* pass data down to the Vocabulary component where creating the table */}
      <Vocabulary vocabulary={vocabulary} onUpdateWord={onUpdateWord} />
    </div>
  );
}
export default AdminComponent;
