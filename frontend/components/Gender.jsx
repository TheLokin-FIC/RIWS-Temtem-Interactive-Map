import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Grid, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const values = [
    { value: 0 },
    { value: 5 },
    { value: 10 },
    { value: 20 },
    { value: 25 },
    { value: 35 },
    { value: 40 },
    { value: 50 },
    { value: 60 },
    { value: 65 },
    { value: 70 },
    { value: 75 },
    { value: 85 },
    { value: 100 },
];

const Gender = ({ setGender, gender }) => {
    const handleChange = (event, newValue) => {
        setGender(newValue);
    };
    return (
        <Box className="gender">
            <Slider
                value={gender}
                onChange={handleChange}
                className="slider-gender"
                marks={values}
                step={null}
            />
            <Grid container>
                <Grid item xs={6}>
                    <Typography className="subtitle">
                        <MaleIcon /> {gender}
                        {'%'}
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign={'end'}>
                    <Typography className="subtitle" gutterBottom>
                        <FemaleIcon /> {100 - gender}
                        {'%'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Gender;
