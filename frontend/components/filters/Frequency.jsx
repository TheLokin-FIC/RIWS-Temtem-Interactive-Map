import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Frequency = ({ setFrequency, frequency }) => {
    return (
        <Box className="frequency">
            <Slider
                className="slider"
                value={frequency}
                min={0}
                max={100}
                onChange={(_event, value) => {
                    setFrequency(value);
                }}
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
