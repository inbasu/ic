import * as React from 'react';
// MUI
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid2';
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';

import { CollumnContext } from '../../data/context';


function CollumnList() {
    const [filters, setFilters] = React.useContext(CollumnContext);

    const handleSetFilters = (event: ChangeEvent<HTMLImageElement>) => {
        filters.set(event.target.value, !filters.get(event.target.value));
        setFilters(new Map(filters));
    }

    return (
        <Grid container spacing={0}>
            {[...filters.keys()].map((filter) => {
                return (
                    <Grid size={6} sx={{ textAlign: "left" }}>
                        <FormControlLabel
                            label={filter}
                            control={
                                <Checkbox
                                    checked={filters.get(filter)}
                                    value={filter}
                                    onChange={(event) => handleSetFilters(event)}
                                    size="small" />}
                        />
                    </Grid>)
            }
            )}
        </Grid >
    )
}



export default function CollumnFilter() {
    const [open, setOpen] = React.useState<boolean>(false);

    return (
        <>
            <Button
                id="filter-button"
                variant={open ? "contained" : "outlined"}
                size="small"
                onClick={() => { setOpen(!open) }}>
                Столбцы
            </Button>
            {open &&
                <Paper
                    sx={{ position: "absolute", width: "400px", padding: "5px", marginTop: "5px", left: 'calc(90% - 310px)', border: 2 }}>
                    <CollumnList />
                </Paper>
            }
        </>
    )
}
