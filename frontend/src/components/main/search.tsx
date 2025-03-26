import * as React from 'react';
import axios from "axios";
// MUI
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
// 
import { API_URL } from "../../App";
import { ItemListContext, LoadingContext, QuerryContext } from "../../data/context";


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

function AdvancedSearch({ querry, set, enterHandler }: { querry: string, set: Dispatch, enterHandler: Function }) {
    const [loading, _setLoading] = React.useContext(LoadingContext);
    return (
        <TextField
            disabled={loading}
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
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [isAdvanced, setIsAdvanced] = React.useState<boolean>(false)
    const [valid, setValid] = React.useState<boolean>(false)
    const [querry, setQuerry] = React.useContext(QuerryContext)


    React.useEffect(() => {
        setValid(true);
    }, [isAdvanced, querry])

    React.useEffect(() => {
        if (querry) {
            console.log(querry)
            handleSearchRequest();
        }
    }, [])

    const handleSearchRequest = () => {
        setLoading(true);
        axios.post(`${API_URL}/getList/`, { querry: querry })
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

            <IconButton disabled={loading || !valid} onClick={handleSearchRequest} ><SearchIcon /></IconButton>
            <Button disabled={loading} onClick={() => setIsAdvanced(!isAdvanced)} variant="text" size="small">
                {isAdvanced ? "Базовый" : "Расширенный"}
            </Button>
        </Box>
    )

}
