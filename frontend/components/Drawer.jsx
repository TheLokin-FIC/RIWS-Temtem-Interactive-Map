import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React, { useState } from 'react';
import Types from './Types';

export default function Drawer() {
    const [open, setOpen] = useState(false);

    return (
        <Box className={'drawer ' + (!open ? 'close' : '')}>
            <ButtonUnstyled
                className="drawer-button"
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <ArrowBackIosNewIcon className="icon" fontSize="small" />
                ) : (
                    <ArrowForwardIosIcon className="icon" fontSize="small" />
                )}
            </ButtonUnstyled>
            <Box className="image">
                <Image src={'/images/logo.png'} width={512} height={80} />
            </Box>
            <Box className="container">
                <Types />
            </Box>
        </Box>
    );
}
