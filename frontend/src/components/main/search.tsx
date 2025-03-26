import * as React from 'react';
// MUI
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import axios from "axios";
import { ItemListContext, LoadingContext } from "../../data/context";


function validIql(iql: string): boolean {
    return false
}


function BaseSearch() {
    return (
        <TextField
            id="advanced-search-bar"
            size="small"
            variant="outlined"
        />)
}

function AdvancedSearch({ querry, set }: { querry: string, set: Dispatch, enterHandler: Function }) {
    return (
        <TextField
            id="advanced-search-bar"
            sx={{ width: "80%" }}
            size="small"
            variant="standard"
            value={querry}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { set(event.target.value) }}
            inputProps={{
                onKeyPress: (event) => {
                    if (event.key === "Enter") {
                        enterHandler();
                        event.preventDefault();
                    }
                }
            }}
        />
    )
}


export default function Search() {
    const [_items, setItems] = React.useContext(ItemListContext);
    const [_loading, setLoading] = React.useContext(LoadingContext);
    const [isAdvanced, setIsAdvanced] = React.useState<boolean>(false)
    const [valid, setValid] = React.useState<boolean>(false)
    const [querry, setQuerry] = React.useState<string>('')


    React.useEffect(() => {
        setValid(true)
    }, [isAdvanced, querry])

    const handleSearchRequest = () => {
        setLoading(true);
        axios.post("http://127.0.0.1:8000/", { querry: querry })
            .then((respons) => {
                setItems(respons.data.items ? respons.data.items : []);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <Box sx={{ flexGrow: 1, flexWrap: "nowrap" }}>
            {isAdvanced ?
                <AdvancedSearch querry={querry} set={setQuerry} enterHandler={handleSearchRequest} /> :
                <BaseSearch />}

            <IconButton disabled={!valid} onClick={handleSearchRequest}><SearchIcon /></IconButton>
            <Button onClick={() => setIsAdvanced(!isAdvanced)} variant="text" size="small">
                {isAdvanced ? "Базовый" : "Расширенный"}
            </Button>
        </Box>
    )

}
