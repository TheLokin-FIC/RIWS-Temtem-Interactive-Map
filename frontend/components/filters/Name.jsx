import SearchIcon from '@mui/icons-material/Search';
import LoadingButton from '@mui/lab/LoadingButton';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const CustomTextField = styled(TextField)({
    '& .MuiOutlinedInput-input': {
        color: '#fcc65f',
    },
    '& label ': {
        color: '#fcc65f',
        fontFamily: 'Rubik',
    },
    '& label.Mui-focused': {
        color: '#fcc65f',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: '#fcc65f',
        },
        '&:hover fieldset': {
            borderColor: '#fcc65f',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#fcc65f',
        },
    },
});

export default function Name({ name, setName, onClick, loading }) {
    return (
        <Box className="nameFilter">
            <Grid container spacing={2}>
                <Grid item xs={9}>
                    <CustomTextField
                        fullWidth
                        size="small"
                        label="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value.trim())}
                    />
                </Grid>
                <Grid item xs={3}>
                    <LoadingButton
                        fullWidth
                        className="subtitle button"
                        onClick={onClick}
                        loading={loading}
                    >
                        <SearchIcon color="inherit" />
                    </LoadingButton>
                </Grid>
            </Grid>
        </Box>
    );
}
