import * as React from 'react';

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableCell } from '@mui/material';
import { Item } from '../../data/schemas';
import axios from 'axios';
import { CollumnContext } from '../../data/context';

function ItemRow({ item }: { item: Item }) {
    const [cols, _setCols] = React.useContext(CollumnContext);

    return (
        <TableRow>
            {item.attrs.map((attr) => {
                if (cols.get(attr.name)) {
                    return (<TableCell>{attr.values[0]?.label}</TableCell>)
                }
            })}
        </TableRow>
    )
}





export default function SearchResultTable() {
    const [items, setItems] = React.useState<Array<Item>>([]);


    React.useEffect(() => {
        axios.get("http://127.0.0.1:8000/")
            .then((resonse) => {
                console.log(resonse.data.items)
                setItems(resonse.data.items)
            })

    }, [])

    return (
        <TableContainer component={Paper} >
            <Table size="small" sx={{ width: "100%" }}>
                {items.map((item) => { return (<ItemRow item={item} />) })}
            </Table>
        </TableContainer>
    )
}

