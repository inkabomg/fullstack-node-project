import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';

function TableFin(props) {

    function checkInput(e) {
        const input = e.target.value
        //
        const correctInput = input.toLowerCase();
        if (correctInput === props.finnish) {
            props.correctInput(correctInput)
        } else {
            props.incorrectInput(correctInput)
        }
    }
    return (
        <TableRow>
            <TableCell>{props.english}</TableCell>
            <TableCell>
                <Input placeholder="Type in Finnish" type="text" onBlur={checkInput}/></TableCell>
        </TableRow>
    )
}

export default TableFin;