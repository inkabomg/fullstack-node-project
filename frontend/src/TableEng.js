import React from "react";
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Input from '@mui/material/Input';

function TableEng(props) {

    return (
        <TableRow>
            <TableCell>{props.finnish}</TableCell>
            <TableCell><Input placeholder="Type in Finnish" type="text"/></TableCell>
        </TableRow>
    )
}

export default TableEng;