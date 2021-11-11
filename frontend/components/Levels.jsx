import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const Levels = ({ setLevels, levels }) => {
    const handleChange = (event, newValue) => {
        setLevels(newValue);
    };
    return (
        <Box className="levels">
            <Box>
                <Slider
                    value={levels}
                    onChange={handleChange}
                    className="slider"
                />
                <Typography
                    className="subtitle"
                    sx={{ marginLeft: levels[0] - 2 + '%' }}
                    gutterBottom
                >
                    {levels[0]}
                </Typography>
                <Typography
                    className="subtitle"
                    sx={{ marginLeft: levels[1] - 2 + '%', marginTop: '-29px' }}
                    gutterBottom
                >
                    {levels[1]}
                </Typography>
            </Box>
        </Box>
    );
};

export default Levels;
