import { Button, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import { useMemo, useRef } from 'react';

export default function Result({ map, markerRefs, temtems }) {
    const oldPosition = useRef(undefined);
    return useMemo(
        () => (
            <Box className="results">
                <Typography
                    className="title"
                    variant="h6"
                    gutterBottom
                    align={'center'}
                >
                    Results
                </Typography>
                <Typography
                    className="subsubtitle before-list"
                    variant="h6"
                    gutterBottom
                    align={'center'}
                >
                    Number of results: {temtems.length}
                </Typography>
                {temtems.map((temtem, i) => {
                    return (
                        <Box key={i} className="result">
                            <Typography align={'center'} className="subtitle">
                                <span
                                    align={'center'}
                                    className="portrait background"
                                    style={{
                                        position: 'relative',
                                        display: 'inline-block',
                                        width: '30px',
                                        height: '30px',
                                    }}
                                >
                                    <Image
                                        alt={temtem.name}
                                        title={temtem.name}
                                        src={
                                            'data:image/png;base64,' +
                                            temtem.portrait
                                        }
                                        width={30}
                                        height={30}
                                    />
                                </span>
                                <span
                                    style={{
                                        position: 'relative',
                                        bottom: '9px',
                                    }}
                                >
                                    {' ' + temtem.name}
                                </span>
                            </Typography>
                            <Grid container>
                                {temtem.locations.map((location, i) => {
                                    return (
                                        <Grid
                                            key={i}
                                            item
                                            xs={12}
                                            md={12}
                                            component={Button}
                                            onClick={() => {
                                                if (
                                                    JSON.stringify(
                                                        oldPosition.current
                                                    ) !==
                                                    JSON.stringify(
                                                        location.position
                                                    )
                                                ) {
                                                    oldPosition.current =
                                                        location.position;
                                                    map.closePopup();
                                                    map.panTo(
                                                        location.position,
                                                        {
                                                            animate: true,
                                                            duration: 0.5,
                                                        }
                                                    );
                                                    setTimeout(() => {
                                                        markerRefs.current[
                                                            JSON.stringify(
                                                                location.position
                                                            )
                                                        ].openPopup();
                                                    }, 1000);
                                                }
                                            }}
                                            className="location"
                                        >
                                            <Grid item xs={8}>
                                                {location.route}
                                            </Grid>
                                            <Grid item xs={4}>
                                                {location.frequency + '%'}
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Box>
                    );
                })}
            </Box>
        ),
        [temtems]
    );
}
