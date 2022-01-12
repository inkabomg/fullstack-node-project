import React, { useState } from "react";
import TableEng from "./TableEng";
import TableFin from "./Table";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';

function UserComponent() {
  const [state, setState] = useState([]);
  const [title, setTitle] = useState("");
  var [point, setPoint] = useState(0);

  // useEffect(() => {
  //   (async () => {
  //     const result = await fetch("http://localhost:8080/vocabulary/");
  //     setState(result.data);
  //   })();
  // }, []);

  async function getFinnish() {
    const result = await fetch("http://localhost:8080/vocabulary/")
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
      )
    });
    setState(table);
    setTitle(
      <TableHead>
        <TableRow>
          <TableCell>Finnish</TableCell>
          <TableCell>English</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  async function getEnglish() {
    const result = await fetch("http://localhost:8080/vocabulary/")
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
      )
    });
    setState(table);
    setTitle(
      <TableHead>
        <TableRow>
          <TableCell>English</TableCell>
          <TableCell>Finnish</TableCell>
        </TableRow>
      </TableHead>
    )
  }

  function correctInput(a) {
    point++;
    console.log(a);
    console.log("Your score is: " + point)
  }

  function incorrectInput(a) {
    console.log("Wrong answer")
  }

  function checkResults() {

  }


  return (
    <div>
      <h2>Learn Finnish!</h2>
      <Button onClick={getEnglish} variant="contained" size="small" style={{marginBottom:"20px", marginRight:"10px", background:"#a9d4c7"}}>Show words in English</Button>
      <Button onClick={getFinnish} variant="contained" size="small" style={{marginBottom:"20px", background:"#a9d4c7"}}>Show words in Finnish</Button>
      <div className="list">
        <TableContainer>
          <Table sx={{ maxWidth: 450 }}>
            {title}
            <TableBody>{state}</TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" size="small" style={{marginTop:"20px", background:"#a9d4c7"}}>Check results</Button>
      </div>
    </div>
  );

}

export default UserComponent;
