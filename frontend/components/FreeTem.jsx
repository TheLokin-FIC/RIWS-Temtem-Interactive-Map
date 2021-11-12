import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { getMaxFreeTem } from '../backend/service';

const FreeTem = ({ setFreeTem, freeTem }) => {
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(500);

    useEffect(() => {
        getMaxFreeTem().then((resp) => setMax(resp));
    }, []);

    const handleChange = (event, newValue) => {
        setFreeTem(newValue);
    };

    return (
        <Box className="frequency">
            <Slider
                value={freeTem}
                onChange={handleChange}
                className="slider"
                max={max}
                min={min}
            />
            <Typography
                className="subtitle"
                sx={{ marginLeft: (freeTem / max) * 100 - 2 + '%' }}
                gutterBottom
            >
                {freeTem}
            </Typography>
        </Box>
    );
};

export default FreeTem;
