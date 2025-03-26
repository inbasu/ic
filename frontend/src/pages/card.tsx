import * as React from 'react';
import axios from "axios";


import { useParams } from "react-router-dom";
import { Item } from '../data/schemas';

import { API_URL } from "../App";
import ItemTable from '../components/card/itemTable';
import { Box } from '@mui/material';

export default function ItemCard() {
    const { key } = useParams();
    const [item, setItem] = React.useState<Item | null>(null)

    React.useEffect(() => {
        axios.post(`${API_URL}/getItem/`, { key: key })
        .then((response) => {
            if (response.data) {
                setItem(response.data);
            }
        })
    }, [])

    return (
        <>
            {item &&
                <Box>
                    <h3>{item.label}</h3>
                    <ItemTable item={item} />
                </Box>
            }
        </>
    )
}
