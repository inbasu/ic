import Grid from "@mui/material/Grid2";
import { Item, Field } from "../../data/schemas";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from '@mui/material';


function ItemRow({ attr }: { attr: Field }) {

    return (
        <TableRow>
            <TableCell>{attr.name}</TableCell>
            <TableCell>{attr.values[0]?.label ? attr.values[0]?.label : "null"}</TableCell>
        </TableRow >
    )
}


export default function ItemTable({ item }: { item: Item }) {

    return (

        <TableContainer component={Paper} sx={{ paddingTop: "5px", boxShadow: "none" }}>
            <Table size="small" sx={{ width: "100%" }}>
                {item.attrs.map((attr) => { return (<ItemRow attr={attr} />) })}
            </Table>
        </TableContainer>
    )
}






