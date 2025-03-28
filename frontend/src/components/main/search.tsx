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
import { CollumnContext, ItemListContext, LoadingContext, ObjectTypeIdContext, QuerryContext, SchemeContext } from "../../data/context";
import { Item } from '../../data/schemas';


function validIql(iql: string): boolean {
    return false
}


function BaseSearch({ enterHandler }: { enterHandler: Function }) {
    return (
        <TextField
            id="advanced-search-bar"
            size="small"
            variant="outlined"
        />)
}

function AdvancedSearch({ enterHandler }: { enterHandler: () => void }) {
    const [querry, setQuerry] = React.useContext(QuerryContext);
    const [loading, _setLoading] = React.useContext(LoadingContext);

    return (
        <TextField
            disabled={loading}
            id="advanced-search-bar"
            sx={{ width: "80%" }}
            size="small"
            variant="standard"
            value={querry}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => { setQuerry(event.target.value) }}
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



function search(searchType: string, enterHandler: () => void) {
    switch (searchType) {
        case "iql": return (<AdvancedSearch enterHandler={enterHandler} />);
        case "fzf": return (<BaseSearch enterHandler={enterHandler} />)
    }



}


export default function Search() {
    const [_items, setItems] = React.useContext(ItemListContext);
    const [loading, setLoading] = React.useContext(LoadingContext);
    const [querry, _setQuerry] = React.useContext(QuerryContext);
    const [_filters, setFilters] = React.useContext(CollumnContext);
    const [objectTypeId, _setObjectTypeId] = React.useContext(ObjectTypeIdContext);
    const [schema, _setSchema] = React.useContext(SchemeContext);

    const [valid, setValid] = React.useState<boolean>(false);
    const [searchType, setsSearchType] = React.useState<string>('iql')


    React.useEffect(() => {
        setValid(true);
    }, [searchType, querry])

    React.useEffect(() => {
        if (querry) {
            handleSearchRequest();
        }
    }, [])

    const handleSearchRequest = () => {
        if (schema && objectTypeId && querry) {
            setLoading(true);
            axios.post(`${API_URL}/getList/`,
                { querry: querry, objectTypeId: objectTypeId, schema: schema?.id })
                .then((respons) => {
                    const items: Array<Item> = respons.data.items ? respons.data.items : []
                    setItems(items);
                    setFilters(new Map(items[0]?.attrs.map((attr) => [attr.name, (attr.name === "Key" || attr.name, attr.name === "Key") ? true : false])))
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }

    const handleSwitchSearch = () => {

    }

    return (
        <Box sx={{ flexGrow: 1, flexWrap: "nowrap" }}>
            {search(searchType, handleSearchRequest)}


            <IconButton disabled={loading || !valid} onClick={handleSearchRequest} ><SearchIcon /></IconButton>
            <Button disabled={loading} onClick={handleSwitchSearch} variant="text" size="small">
                {true ? "Базовый" : "Расширенный"}
            </Button>
        </Box>
    )

}
