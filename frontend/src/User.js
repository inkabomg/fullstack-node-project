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

  return (
    <div>
      <h2>Learn Finnish!</h2>
      <Button onClick={getEnglish} variant="contained" style={{margin:"20px"}}>Show words in English</Button>
      <Button onClick={getFinnish} variant="contained" style={{margin:"20px"}}>Show words in Finnish</Button>
      <div className="list">
        <TableContainer>
          <Table sx={{ maxWidth: 450 }}>
            {title}
            <TableBody>{state}</TableBody>
          </Table>
        </TableContainer>
        <Button variant="contained" style={{margin:"20px"}}>Check results</Button>
      </div>
    </div>
  );

}

export default UserComponent;
