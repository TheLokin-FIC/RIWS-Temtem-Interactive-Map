import { Button, Grid, Slider, Tooltip, Typography } from '@mui/material';
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

const getTvs = (tvs) => {
    let anchor = 12;
    let keys = Object.keys(tvs);
    if (keys.filter((key) => tvs[key] > 0).length > 1) anchor = 6;
    return keys.map((tv) => {
        if (tvs[tv]) {
            let tvReturn = tvsIcons.filter((icon) => icon.name === tv);
            return (
                <Tooltip key={tvReturn[0].name + tvs} title={tvReturn[0].name}>
                    <Grid xs={anchor} item>
                        <Image
                            alt="tv-image"
                            className="tv-image"
                            src={tvReturn[0].url}
                            width={30}
                            height={30}
                            loading="lazy"
                        />

                        <Typography className="subsubtitle overTv">
                            {tvs[tv]}
                        </Typography>
                    </Grid>
                </Tooltip>
            );
        }
    });
};

export default function Result(props) {
    const { temtems } = props;

    return (
        <Box className="results">
            <Typography
                className="title"
                variant="h6"
                gutterBottom
                align={'center'}
            >
                Resultados
            </Typography>
            <Typography
                className="subsubtitle before-list"
                variant="h6"
                gutterBottom
                align={'center'}
            >
                Número de resultados: {temtems ? temtems.length : 0}
            </Typography>
            {temtems &&
                temtems.map(function (item) {
                    return (
                        <Box className="result">
                            <Typography align={'center'} className="subtitle">
                                {item._source.name}
                            </Typography>
                            <Grid container spacing={3}>
                                <Grid
                                    item
                                    xs={4}
                                    md={4}
                                    alignSelf="center"
                                    align="center"
                                >
                                    <Typography align={'center'} gutterBottom>
                                        {item._source.types.map(function (
                                            type
                                        ) {
                                            return (
                                                <Tooltip
                                                    key={type.name}
                                                    title={type.name.slice(
                                                        0,
                                                        -5
                                                    )}
                                                >
                                                    <span>
                                                        <Image
                                                            alt="type-image"
                                                            src={type.icon}
                                                            width={30}
                                                            height={30}
                                                        />
                                                    </span>
                                                </Tooltip>
                                            );
                                        })}
                                    </Typography>
                                    <Box className="temtemImageContainer">
                                        <Image
                                            className="temtemImage"
                                            alt="temtem-image"
                                            src={
                                                item._source.portrait +
                                                '/scale-to-width-down/52'
                                            }
                                            width={52}
                                            height={52}
                                        />
                                    </Box>
                                    <Tooltip
                                        key={item._source}
                                        title={
                                            item._source.genderRatio +
                                            '% ♂ - ' +
                                            (100 - item._source.genderRatio) +
                                            '% ♀'
                                        }
                                    >
                                        <Box container className="gender">
                                            <Slider
                                                className="slider-gender"
                                                value={item._source.genderRatio}
                                                disabled
                                            />
                                        </Box>
                                    </Tooltip>
                                    <Box className="attributes">
                                        <Grid container>
                                            {getTvs(item._source.TVs)}
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid
                                    item
                                    xs={8}
                                    md={8}
                                    alignSelf="center"
                                    align="center"
                                >
                                    <Grid container>
                                        <Grid
                                            item
                                            xs={12}
                                            md={12}
                                            className="locations"
                                        >
                                            <Grid container>
                                                {item.inner_hits.locations.hits.hits.map(
                                                    function (location) {
                                                        return (
                                                            <Grid
                                                                item
                                                                xs={12}
                                                                md={12}
                                                                component={
                                                                    Button
                                                                }
                                                                onClick={() =>
                                                                    console.log(
                                                                        location
                                                                    )
                                                                }
                                                                className="location"
                                                            >
                                                                <Grid
                                                                    item
                                                                    xs={8}
                                                                >
                                                                    {' '}
                                                                    {
                                                                        location
                                                                            ._source
                                                                            .route
                                                                    }
                                                                </Grid>
                                                                <Grid
                                                                    item
                                                                    xs={4}
                                                                >
                                                                    {' '}
                                                                    {
                                                                        location
                                                                            ._source
                                                                            .frequency
                                                                    }
                                                                    {'%'}
                                                                </Grid>
                                                            </Grid>
                                                        );
                                                    }
                                                )}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    );
                })}
        </Box>
    );
}
