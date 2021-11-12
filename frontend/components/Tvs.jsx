import { Grid, Paper, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';

const tvsIcons = [
    { name: 'ATK', url: '/images/stats/ATK.png' },
    { name: 'DEF', url: '/images/stats/DEF.png' },
    { name: 'HP', url: '/images/stats/HP.png' },
    { name: 'SPATK', url: '/images/stats/SPATK.png' },
    { name: 'SPD', url: '/images/stats/SPD.png' },
    { name: 'SPDEF', url: '/images/stats/SPDEF.png' },
    { name: 'STA', url: '/images/stats/STA.png' },
];

const Tvs = ({ setTvs, tvs }) => {
    const handleSelect = (name) => {
        let filter = tvs.filter((item) => item !== name);

        if (filter.length === tvs.length) {
            setTvs([...filter, name]);
        } else {
            setTvs(filter);
        }
    };

    const isSelected = (name) => {
        return tvs.some((item) => item === name) > 0;
    };

    return (
        <Box>
            <Box className="tvs">
                <Grid container spacing={3}>
                    {tvsIcons.map(function (type) {
                        return (
                            <Grid item key={type.name}>
                                <Tooltip key={tvsIcons.name} title={type.name}>
                                    <Paper
                                        className={
                                            'container-tv ' +
                                            (isSelected(type.name)
                                                ? 'selected'
                                                : '')
                                        }
                                        onClick={() => handleSelect(type.name)}
                                    >
                                        <Image
                                            src={type.url}
                                            width={50}
                                            height={50}
                                            loading={'lazy'}
                                        />
                                    </Paper>
                                </Tooltip>
                            </Grid>
                        );
                    })}
                </Grid>
            </Box>
        </Box>
    );
};

export default Tvs;
