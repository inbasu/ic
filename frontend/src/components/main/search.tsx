import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent, useEffect, useState } from "react"
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";


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

function AdvancedSearch({ querry, set }: { querry: string, set: Dispatch }) {
    return (
        <TextField
            id="advanced-search-bar"
            size="small"
            variant="outlined"
            value={querry}
            onChange={(event: ChangeEvent<HTMLInputElement>) => { set(event.target.value) }}
        />
    )
}


export default function Search() {
    const [isAdvanced, setIsAdvanced] = useState<boolean>(false)
    const [valid, setValid] = useState<boolean>(false)
    const [querry, setQuerry] = useState<string>('')


    useEffect(() => {
        setValid((!isAdvanced || validIql(querry)))
    }, [isAdvanced, querry])




    return (
        <Box sx={{ flexGrow: 1 }}>
            {isAdvanced ?
                <AdvancedSearch querry={querry} set={setQuerry} /> :
                <BaseSearch />}

            <IconButton disabled={!valid} ><SearchIcon /></IconButton>
            <Button onClick={() => setIsAdvanced(!isAdvanced)} variant="text" size="small">
                {isAdvanced ? "Базовый" : "Расширенный"}
            </Button>
        </Box>
    )

}
