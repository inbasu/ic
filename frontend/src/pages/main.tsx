import * as React from 'react';
// MUI
import Grid from "@mui/material/Grid2";

import Search from "../components/main/search";
import SearchResultTable from "../components/main/table";
import CollumnFilter from "../components/main/filter";

import { CollumnContext, ItemListContext } from '../data/context';
import { Item } from '../data/schemas';


export default function Main() {
    const [filters, setFilters] = React.useState<Map<string, boolean>>(new Map([["Key", true], ["Name", true], ["Store", false], ["Location", false], ["Serial No", false]]));
    const [items, setItems] = React.useState<Array<Item>>([]);




    return (
        <Grid container sx={{ width: "100%", top: "0" }}>
            <Grid size="grow" sx={{ textAlign: "left" }}>

                <ItemListContext.Provider value={[items, setItems]}>
                    <Search />
                </ItemListContext.Provider>
            </Grid>
            <Grid size={2} sx={{ textAlign: "right" }}>
                <CollumnContext.Provider value={[filters, setFilters]}>
                    <CollumnFilter />
                </CollumnContext.Provider>
            </Grid>
            <Grid size={12}>
                <CollumnContext.Provider value={[filters, setFilters]}>
                    <ItemListContext.Provider value={[items, setItems]}>
                        <SearchResultTable />
                    </ItemListContext.Provider>
                </CollumnContext.Provider>
            </Grid>
        </Grid >
    )
}
