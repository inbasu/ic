import React from "react";

import { Item, Field } from "../../data/schemas";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, TableCell } from '@mui/material';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

import { ItemContent } from '../../data/context';


function SimpleItemRow({ attr }: { attr: Field }) {

    return (
        <TableRow>
            <TableCell>{attr.name}</TableCell>
            <TableCell>{attr.values[0]?.label ? attr.values[0]?.label : "null"}</TableCell>
        </TableRow >
    )
}


function EditItemRow({ attr }: { attr: Field }) {

    return (
        <TableRow>
            <TableCell>{attr.name}</TableCell>
            <TableCell>{attr.ref !== null ?
                'h ' :
                <TextField
                    variant="outlined"
                    size="small"
                    value={attr.values[0]?.label ? attr.values[0]?.label : "null"}
                    fullWidth />}
            </TableCell>
        </TableRow >
    )
}


export default function ItemTable() {
    const [item, setItem] = React.useContext(ItemContent);
    const [isEdit, setIsEdit] = React.useState(false);
    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <h3>{item.label}</h3>
                <Box>
                    <FormControlLabel control={<Switch onChange={() => { setIsEdit(!isEdit) }} checked={isEdit} />} label="Изменить" />
                    <Button size="small" disabled={!isEdit} onClick={() => { setIsEdit(false) }} >Сохранить</Button>
                </Box>
            </Box>
            <TableContainer component={Paper} sx={{ paddingTop: "5px", boxShadow: "none" }}>
                <Table size="small" sx={{ width: "100%" }}>
                    {item.attrs.map((attr) => { if (isEdit) { return (<EditItemRow attr={attr} />) } else { return (<SimpleItemRow attr={attr} />) } })}
                </Table>
            </TableContainer>
        </>
    )
}






