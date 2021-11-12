import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Frequency = ({ setFrequency, frequency }) => {
    const handleChange = (event, newValue) => {
        setFrequency(newValue);
    };
    return (
        <Box className="frequency">
            <Slider
                value={frequency}
                onChange={handleChange}
                className="slider"
            />
            <Typography
                className="subtitle"
                sx={{ marginLeft: frequency - 2 + '%' }}
                gutterBottom
            >
                {frequency}
            </Typography>
        </Box>
    );
};

export default Frequency;
