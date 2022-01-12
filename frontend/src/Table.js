import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';

function TableFin(props) {

    return (
        <TableRow>
            <TableCell>{props.english}</TableCell>
            <TableCell>
                <Input placeholder="Type in Finnish" type="text"/></TableCell>
        </TableRow>
    )
}

export default TableFin;