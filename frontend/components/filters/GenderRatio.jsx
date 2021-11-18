import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Grid, Slider, Typography } from '@mui/material';
import { Box } from '@mui/system';

const marks = [
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

export default function GenderRatio({ setGenderRatio, genderRatio }) {
    return (
        <Box className="gender">
            <Slider
                className="slider-gender"
                value={genderRatio}
                marks={marks}
                step={null}
                min={0}
                max={100}
                onChange={(_event, value) => {
                    setGenderRatio(value);
                }}
            />
            <Grid container>
                <Grid item xs={6}>
                    <Typography className="subtitle">
                        <MaleIcon /> {genderRatio + ' %'}
                    </Typography>
                </Grid>
                <Grid item xs={6} textAlign={'end'}>
                    <Typography className="subtitle" gutterBottom>
                        <FemaleIcon /> {100 - genderRatio + ' %'}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
