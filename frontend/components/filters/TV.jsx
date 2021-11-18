import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

const TVsIcons = [
    { name: 'ATK', url: '/images/stats/ATK.png' },
    { name: 'DEF', url: '/images/stats/DEF.png' },
    { name: 'HP', url: '/images/stats/HP.png' },
    { name: 'SPATK', url: '/images/stats/SPATK.png' },
    { name: 'SPD', url: '/images/stats/SPD.png' },
    { name: 'SPDEF', url: '/images/stats/SPDEF.png' },
    { name: 'STA', url: '/images/stats/STA.png' },
];

export default function TVs({ setTVs, TVs }) {
    function isSelected(name) {
        return TVs.some((item) => item === name) > 0;
    }

    return (
        <Box>
            <Box className="tvs">
                <Grid container spacing={3}>
                    {TVsIcons.map((TV, i) => {
                        return (
                            <Grid key={i} item>
                                <Paper
                                    className={
                                        'container-tv ' +
                                        (isSelected(TV.name) ? 'selected' : '')
                                    }
                                    onClick={() => {
                                        let filter = TVs.filter(
                                            (item) => item !== TV.name
                                        );
                                        let flag = false;
                                        if (filter.length === 2) {
                                            filter = filter.slice(1);
                                            flag = true;
                                        }

                                        if (
                                            (filter.length === TVs.length &&
                                                !flag) ||
                                            (filter.length === TVs.length - 1 &&
                                                flag)
                                        ) {
                                            setTVs([...filter, TV.name]);
                                        } else {
                                            setTVs(filter);
                                        }
                                    }}
                                >
                                    <Image
                                        alt={TV.name}
                                        width={50}
                                        height={50}
                                        title={TV.name}
                                        src={TV.url}
                                        loading="lazy"
                                    />
                                </Paper>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
}
