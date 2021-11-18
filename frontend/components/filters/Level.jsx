import { Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';

const minDistance = 10;

export default function Levels({ levels, setLevels }) {
    return (
        <Box className="levels">
            <Box>
                <Slider
                    value={levels}
                    onChange={(_event, newValue, activeThumb) => {
                        if (newValue[1] - newValue[0] < minDistance) {
                            if (activeThumb === 0) {
                                const clamped = Math.min(
                                    newValue[0],
                                    100 - minDistance
                                );
                                setLevels([clamped, clamped + minDistance]);
                            } else {
                                const clamped = Math.max(
                                    newValue[1],
                                    minDistance
                                );
                                setLevels([clamped - minDistance, clamped]);
                            }
                        } else {
                            setLevels(newValue);
                        }
                    }}
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
}
