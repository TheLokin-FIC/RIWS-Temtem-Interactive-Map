import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { getMaxFreeTem } from '../../api/service';

export default function FreeTem({ setFreeTem, freeTem }) {
    const [maxFreeTem, setMaxFreeTem] = useState(0);
    useEffect(() => {
        getMaxFreeTem().then((maxFreeTem) => setMaxFreeTem(maxFreeTem));
    }, []);

    return (
        <Box className="frequency">
            <Slider
                className="slider"
                value={freeTem}
                min={0}
                max={maxFreeTem}
                onChange={(event, value) => {
                    setFreeTem(value);
                }}
            />
            <Typography
                className="subtitle"
                sx={{ marginLeft: (freeTem / maxFreeTem) * 100 - 2 + '%' }}
                gutterBottom
            >
                {freeTem}
            </Typography>
        </Box>
    );
}
