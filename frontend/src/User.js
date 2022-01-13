import React, { useState, useEffect } from "react";
import TableEng from "./TableEng";
import TableFin from "./Table";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

var point = 0;

function UserComponent(props) {
  const [state, setState] = useState([]);
  const [title, setTitle] = useState("");
  const [finalScore, setFinalScore] = useState([]);

  // useEffect(() => {
  //   const fetchTag = async () => {
  //     const result = await fetch(
  //       `http://localhost:8080/vocabulary/${props.tag}`
  //     );
  //     let json = Object.values(result.data);
  //     setState(json);
  //   };
  //   fetchTag();
  // }, []);

  async function getFinnish() {
    const result = await fetch("http://localhost:8080/vocabulary/");
    const state = await result.json();
    const table = state.map((id) => {
      return (
        <TableEng
          english={id.english}
          finnish={id.finnish}
          placeholder="Type Finnish translation"
          correctInput={correctInput}
          incorrectInput={incorrectInput}
        />
      );
    });
    setState(table);
    setTitle(
      <TableHead>
        <TableRow>
          <TableCell style={{ background: "#ceede4", fontWeight: "bold" }}>
            Finnish
          </TableCell>
          <TableCell style={{ background: "#ceede4", fontWeight: "bold" }}>
            English
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  async function getEnglish() {
    const result = await fetch(`http://localhost:8080/vocabulary/`);
    const state = await result.json();
    const table = state.map((id) => {
      return (
        <TableFin
          english={id.english}
          finnish={id.finnish}
          placeholder="Type Finnish translation"
          correctInput={correctInput}
          incorrectInput={incorrectInput}
        />
      );
    });
    setState(table);
    setTitle(
      <TableHead>
        <TableRow>
          <TableCell style={{ background: "#ceede4", fontWeight: "bold" }}>
            English
          </TableCell>
          <TableCell style={{ background: "#ceede4", fontWeight: "bold" }}>
            Finnish
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }

  function correctInput(a) {
    point++;
    console.log(a);
    console.log("Your score is: " + point);
  }

  function incorrectInput() {
    console.log("Wrong answer");
  }

  function showScore() {
    if (point === state.length[1]) {
      setFinalScore(
        <Alert style={{ maxWidth: 450, margin: "auto" }} severity="success">
          You got all the words correct!
        </Alert>
      );
    } else if (point === 0 && state.length) {
      setFinalScore(
        <Alert style={{ maxWidth: 450, margin: "auto" }} severity="error">
          You didn't get one word correct!
        </Alert>
      );
    } else {
      setFinalScore("You scored " + point + "/" + state.length);
    }
  }

  return (
    <div>
      <h2>Learn Finnish!</h2>
      <Button
        onClick={getEnglish}
        variant="contained"
        size="small"
        style={{
          marginBottom: "20px",
          marginRight: "10px",
          background: "#a9d4c7",
        }}
      >
        Show words in English
      </Button>
      <Button
        onClick={getFinnish}
        variant="contained"
        size="small"
        style={{ marginBottom: "20px", background: "#a9d4c7" }}
      >
        Show words in Finnish
      </Button>
      <div className="list">
        <TableContainer>
          <Table sx={{ maxWidth: 450 }} size="small">
            {title}
            <TableBody>{state}</TableBody>
          </Table>
        </TableContainer>
        <Button
          onClick={showScore}
          variant="contained"
          size="small"
          style={{ marginTop: "20px", background: "#a9d4c7" }}
        >
          Check results
        </Button>
      </div>
      <br></br>
      {finalScore}
    </div>
  );
}

export default UserComponent;
