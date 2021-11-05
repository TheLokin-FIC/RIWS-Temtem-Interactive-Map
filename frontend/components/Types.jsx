import {
    Avatar,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import getTypes from '../backend/service';

const types = [
    { name: 'Wind type', url: '/images/types/wind.png' },
    { name: 'Water type', url: '/images/types/water.png' },
    { name: 'Toxic type', url: '/images/types/toxic.png' },
    { name: 'Neutral type', url: '/images/types/neutral.png' },
    { name: 'Nature type', url: '/images/types/nature.png' },
    { name: 'Mental type', url: '/images/types/mental.png' },
    { name: 'Melee type', url: '/images/types/melee.png' },
    { name: 'Fire type', url: '/images/types/fire.png' },
    { name: 'Electric type', url: '/images/types/electric.png' },
    { name: 'Crystal type', url: '/images/types/crystal.png' },
    { name: 'Digital type', url: '/images/types/digital.png' },
    { name: 'Earth type', url: '/images/types/earth.png' },
];

export default function Types() {
    const [selected, setSelected] = useState([]);
    const [typesReturn, setTypesReturn] = useState([]);

    const handleSelect = (name) => {
        let filter = selected.filter((item) => item !== name);
        if (filter.length === selected.length) {
            setSelected([...filter, name]);
            getTypes([...filter, name]).then((response) =>
                setTypesReturn(response)
            );
        } else {
            setSelected(filter);
            getTypes(filter).then((response) => setTypesReturn(response));
        }
    };

    const isSelected = (name) => {
        return selected.some((item) => item === name) > 0;
    };

    return (
        <Box>
            <Typography
                className="title"
                variant="h6"
                gutterBottom
                align={'center'}
            >
                Tipos
            </Typography>
            <Box className="types">
                <Grid container spacing={2}>
                    {types.map((type) => (
                        <Grid item key={type.name}>
                            <Paper
                                className={
                                    'container-type ' +
                                    (isSelected(type.name) ? 'selected' : '')
                                }
                                onClick={() => handleSelect(type.name)}
                            >
                                <Image src={type.url} width={62} height={62} />
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
            <List
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    marginTop: '20px',
                }}
            >
                {typesReturn.map((item) => {
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                src="/static/images/avatar/1.jpg"
                            />
                        </ListItemAvatar>
                        <ListItemText
                            primary={item._id}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        Ali Connors
                                    </Typography>
                                    {
                                        " — I'll be in your neighborhood doing errands this…"
                                    }
                                </React.Fragment>
                            }
                        />
                    </ListItem>;
                })}
            </List>
        </Box>
    );
}
