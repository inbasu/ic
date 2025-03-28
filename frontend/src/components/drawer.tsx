
import * as React from "react";

// MUI 
import MuiDrawer from '@mui/material/Drawer';
import { IconButton, List, ListItem, ListItemButton, ListItemText, styled } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
// Inner
import { insightSchemas, Schema } from '../data/schemas'


const CustomDrawer = styled(MuiDrawer, {})(() => ({
    width: 220,
    maxWidth: 220,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSize: "border-box",
    overflowX: "hidden",
}));


export default function MenuDrawer() {
    const [scheme, setScheme] = React.useState<Schema | null>(null); // будет контекстом
    const [objectTypeId, setObjectTypeId] = React.useState<number | null>(null);
    const [isOpen, setOpen] = React.useState<boolean>(false);

    const handleSelectScheme = (event: SelectChangeEvent) => {
        for (const s of insightSchemas) {
            if (s.id === Number(event.target.value)) {
                setScheme(s);
                break;
            }
        }
    }

    return (
        <CustomDrawer variant="permanent" open={isOpen}>
            <IconButton onClick={() => setOpen(!isOpen)}
                sx={{ borderRadius: 0 }}>
                {isOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
            </IconButton>

            {isOpen && <List>
                <ListItem>
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <InputLabel id="scheme-select-small-label">Схема</InputLabel>
                        <Select
                            labelId="scheme-select-small-label"
                            value={scheme ? String(scheme.id) : ""}
                            label="Схема"
                            size="small"
                            onChange={handleSelectScheme}
                            fullWidth>
                            {insightSchemas.map((scheme) => { return (<MenuItem value={scheme.id}>{scheme.name}</MenuItem>) })}
                        </Select>
                    </FormControl>

                </ListItem>
                {scheme && scheme.objectTypes.map((objectType) => {
                    return (
                        <ListItem sx={{ p: 0 }}>
                            <ListItemButton
                                sx={{ backgroundColor: objectTypeId === objectType.id ? "#bbdefb" : "" }}
                                onClick={() => setObjectTypeId(objectType.id)}
                            >
                                <ListItemText primary={objectType.name} />
                            </ListItemButton>
                        </ListItem>
                    )
                })}
            </List>}

        </ CustomDrawer >
    )
}
