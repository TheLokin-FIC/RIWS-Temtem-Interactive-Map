import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Grid,
    Typography,
} from '@mui/material';
import React from 'react';

const AccordionComponent = ({ filterBy, setFilterBy, text, Component }) => {
    const handleChange = () => (event, isExpanded) => {
        setFilterBy(isExpanded);
    };
    return (
        <Accordion
            expanded={filterBy}
            onChange={handleChange()}
            className="accordion"
        >
            <AccordionSummary>
                <Grid container>
                    <Grid item xs={10}>
                        <Typography
                            className="title"
                            variant="h6"
                            sx={{ marginTop: '5px' }}
                        >
                            {text}
                        </Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Checkbox checked={filterBy} className="checkbox" />
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>{Component}</AccordionDetails>
        </Accordion>
    );
};

export default AccordionComponent;
