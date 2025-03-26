import * as React from 'react';
import { Link } from "react-router";

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from '@mui/material';
import { Item } from '../../data/schemas';
import { CollumnContext, ItemListContext } from '../../data/context';
function ItemRow({ item }: { item: Item }) {
    const [cols, _setCols] = React.useContext(CollumnContext);

    return (
        <TableRow>
            {item.attrs.map((attr) => {
                if (cols.get(attr.name)) {
                    if (attr.name == "Key") {
                        return (<TableCell>
                            <Link to={{
                                pathname: `/${attr.values[0]?.label}`,
                            }}>
                                {attr.values[0]?.label ? attr.values[0]?.label : "null"}
                            </Link>
                        </TableCell>)
                    } else {
                        return (<TableCell>{attr.values[0]?.label ? attr.values[0]?.label : "null"}</TableCell>)
                    }
                }
            })}
        </TableRow>
    )
}





export default function SearchResultTable() {
    const [items, _setItems] = React.useContext(ItemListContext);




    return (
        <TableContainer component={Paper} sx={{ paddingTop: "5px", boxShadow: "none" }}>
            <Table size="small" sx={{ width: "100%" }}>
                {items.map((item: Item) => { return (<ItemRow item={item} />) })}
            </Table>
        </TableContainer>
    )
}

