import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Grid,
    Typography,
} from '@mui/material';

export default function AccordionComponent({
    text,
    details,
    expanded,
    setExpanded,
}) {
    return (
        <Accordion
            expanded={expanded}
            onChange={(_event, isExpanded) => {
                setExpanded(isExpanded);
            }}
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
                        <Checkbox checked={expanded} className="checkbox" />
                    </Grid>
                </Grid>
            </AccordionSummary>
            <AccordionDetails>{details}</AccordionDetails>
        </Accordion>
    );
}
