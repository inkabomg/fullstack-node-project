import React, { useEffect, useState } from "react";
import Vocabulary from "./Vocabulary";

function AdminComponent() {
  // Set state
  const [vocabulary, setVocabulary] = useState([]);
  const [tag, setTag] = useState('');
  const [english, setEnglish] = useState('');
  const [finnish, setFinnish] = useState('');

  // // To see the console up to date with the array
  // useEffect(() => {
  //   console.log(...vocabulary)
  // });

  // First data grab
  useEffect(() => {
    fetch("http://localhost:8080/vocabulary/")
      .then(resp => resp.json())
      .then(data => setVocabulary(data)) // set data to state
  }, []);

  const handleTagChange = e => {
    // Set the Tag value to anything we type in
    setTag(e.target.value);
  };

  const handleEnglishChange = e => {
    // Set the English word value to anything we type in
    setEnglish(e.target.value);
  };

  const handleFinnishChange = e => {
    // Set the Finnish word value to anything we type in
    setFinnish(e.target.value);
  };

  function handleSubmit(e) {
    // e.preventDefault(); // will refresh page
    if (!tag || !english || !finnish) {
      // A pop up window
      alert("Cannot submit an empty word pair");
    } else {
      fetch("http://localhost:8080/vocabulary/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tag: tag,
          english: english,
          finnish: finnish
        })
      })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
      // Emptying the input boxes after submitting a word
      setTag('');
      setEnglish('');
      setFinnish('');
    }
  };

  // Update vocabulary on page after edit
  function onUpdateWord(updatedWord) {
    const updatedVocabulary = vocabulary.map(
      word => {
        if (word.id === updatedWord.id) {
          return updatedWord
        } else {return word}
      }
    )
    setVocabulary(updatedVocabulary)
  }

return (
  <div>
    <form onSubmit={handleSubmit}>
      <br></br>
      <input placeholder="Tag" type="text" name="tag" value={tag} onChange={handleTagChange}/>
      <input placeholder="Word in English" type="text" name="english" value={english} onChange={handleEnglishChange}/>
      <input placeholder="Word in Finnish" type="text" name="finnish" value={finnish} onChange={handleFinnishChange}/>
      <button type="submit">Add a word pair</button>
    </form>
    <br></br>
      {/* pass data down to the Vocabulary component where creating the table */}
      <Vocabulary vocabulary={vocabulary}
      onUpdateWord={onUpdateWord}/>
    </div>
  );
}
export default AdminComponent;