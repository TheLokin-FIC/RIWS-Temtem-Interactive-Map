import { Grid, Paper } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';

const typesIcons = [
    { name: 'Neutral type', url: '/images/types/neutral.png' },
    { name: 'Wind type', url: '/images/types/wind.png' },
    { name: 'Earth type', url: '/images/types/earth.png' },
    { name: 'Water type', url: '/images/types/water.png' },
    { name: 'Fire type', url: '/images/types/fire.png' },
    { name: 'Nature type', url: '/images/types/nature.png' },
    { name: 'Electric type', url: '/images/types/electric.png' },
    { name: 'Mental type', url: '/images/types/mental.png' },
    { name: 'Digital type', url: '/images/types/digital.png' },
    { name: 'Melee type', url: '/images/types/melee.png' },
    { name: 'Crystal type', url: '/images/types/crystal.png' },
    { name: 'Toxic type', url: '/images/types/toxic.png' },
];

export default function Type({ types, setTypes }) {
    function isSelected(name) {
        return types.some((item) => item === name) > 0;
    }

    return (
        <Box>
            <Box className="types">
                <Grid container spacing={3}>
                    {typesIcons.map((type, i) => {
                        return (
                            <Grid key={i} item>
                                <Paper
                                    className={
                                        'container-type ' +
                                        (isSelected(type.name)
                                            ? 'selected'
                                            : '')
                                    }
                                    onClick={() => {
                                        let filter = types.filter(
                                            (item) => item !== type.name
                                        );
                                        let flag = false;
                                        if (filter.length === 2) {
                                            filter = filter.slice(1);
                                            flag = true;
                                        }

                                        if (
                                            (filter.length === types.length &&
                                                !flag) ||
                                            (filter.length ===
                                                types.length - 1 &&
                                                flag)
                                        ) {
                                            setTypes([...filter, type.name]);
                                        } else {
                                            setTypes(filter);
                                        }
                                    }}
                                >
                                    <Image
                                        alt={type.name}
                                        width={55}
                                        height={55}
                                        title={type.name}
                                        src={type.url}
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
