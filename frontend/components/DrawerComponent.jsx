import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { ButtonUnstyled } from '@mui/material';
import { Box } from '@mui/system';
import Image from 'next/image';
import Content from './Content';

export default function DrawerComponent({
    map,
    markerRefs,
    temtems,
    setTemtems,
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
                    <Image
                        alt="Temtem Interactive Map"
                        width={512}
                        height={80}
                        title="Temtem Interactive Map"
                        src={'/images/logo.png'}
                        loading="lazy"
                    />
                </Box>
                <Box className="container">
                    <Content
                        map={map}
                        markerRefs={markerRefs}
                        temtems={temtems}
                        setTemtems={setTemtems}
                    />
                </Box>
            </Box>
        </Box>
    );
}
