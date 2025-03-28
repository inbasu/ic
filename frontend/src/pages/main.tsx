import * as React from 'react';
// MUI
import Grid from "@mui/material/Grid2";

import Search from "../components/main/search";
import SearchResultTable from "../components/main/table";
import CollumnFilter from "../components/main/filter";

import { CollumnContext, ItemListContext, LoadingContext, ObjectTypeIdContext, SchemeContext, QuerryContext } from '../data/context';
import { Item, Schema } from '../data/schemas';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import MenuDrawer from '../components/drawer';

export default function Main() {
    const [filters, setFilters] = React.useState<Map<string, boolean>>(new Map());
    const [items, setItems] = React.useState<Array<Item>>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [querry, setQuerry] = React.useState<string>('');


    const [schrmeId, setSchemeId] = React.useState<Schema | null>(null);
    const [objectTypeId, setObhectTypeId] = React.useState<number | null>(null);


    return (
        <Box sx={{ width: "100%", height: '100vh', top: "0" }}>
            <MenuDrawer />
            <SchemeContext.Provider value={[schrmeId, setSchemeId]}>
                <ObjectTypeIdContext.Provider value={[objectTypeId, setObhectTypeId]}>
                    <Grid container sx={{ width: "100%", top: "0" }}>
                        <CollumnContext.Provider value={[filters, setFilters]}>
                            <Grid size="grow" sx={{ textAlign: "left" }}>
                                <LoadingContext.Provider value={[loading, setLoading]}>
                                    <ItemListContext.Provider value={[items, setItems]}>
                                        <QuerryContext.Provider value={[querry, setQuerry]}>
                                            <Search />
                                        </QuerryContext.Provider>
                                    </ItemListContext.Provider>
                                </LoadingContext.Provider>
                            </Grid>
                            <Grid size={2} sx={{ textAlign: "right" }}>
                                <CollumnFilter />
                            </Grid>
                        </CollumnContext.Provider>
                        <Grid size={12}>
                            <CollumnContext.Provider value={[filters, setFilters]}>
                                <ItemListContext.Provider value={[items, setItems]}>
                                    <SearchResultTable />
                                </ItemListContext.Provider>
                            </CollumnContext.Provider>
                        </Grid>
                    </Grid >
                </ObjectTypeIdContext.Provider>
            </SchemeContext.Provider>
            {loading && <CircularProgress size={'12vh'} sx={{ position: "absolute", top: "42vh", left: "-5vh", marginLeft: "50%" }} />}
        </Box>
    )
}
