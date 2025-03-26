import * as React from 'react';
import axios from "axios";

import { useParams } from "react-router-dom";
import { Link } from "react-router";

import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ItemTable from '../components/card/itemTable';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

import { API_URL } from "../App";
import { Item } from '../data/schemas';

export default function ItemCard() {
    const { key } = useParams();
    const [loading, setLoading] = React.useState<boolean>(false);
    const [item, setItem] = React.useState<Item | null>(null)

    React.useEffect(() => {
        setLoading(true)
        axios.post(`${API_URL}/getItem/`, { key: key })
            .then((response) => {
                if (response.data) {
                    setItem(response.data);
                }
            }).finally(() => { setLoading(false); })
    }, [])

    return (
        <>
            {item &&
                <Box>

                    <IconButton component={Link} to="/" ><ArrowBackIcon /></IconButton>
                    <h3>{item.label}</h3>
                    <ItemTable item={item} />
                </Box>
            }

            {loading && <CircularProgress size={'12vh'} sx={{ position: "absolute", top: "42vh", left: "-5vh", marginLeft: "50%" }} />}
        </>
    )
}
