import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import React from 'react';
import Content from './Content';

export default function DrawerComponent({
    temtems,
    setTemtems,
    map,
    markerRefs,
    open,
    setOpen,
}) {
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
            <Box
                className="all"
                style={{ maxHeight: '100%', overflow: 'auto' }}
            >
                <Box className="image">
                    <Image src={'/images/logo.png'} width={512} height={80} />
                </Box>
                <Box className="container">
                    <Content
                        temtems={temtems}
                        setTemtems={setTemtems}
                        map={map}
                        markerRefs={markerRefs}
                    />
                </Box>
            </Box>
        </Box>
    );
}
