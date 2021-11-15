import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import DrawerComponent from '../components/DrawerComponent';

export default function Home() {
    const [temtems, setTemtems] = useState([]);
    const [map, setMap] = useState(null);
    const [markerRefs, setMarkerRefs] = useState([]);
    const [open, setOpen] = useState(true);

    const Map = useMemo(
        () =>
            dynamic(() => import('../components/Map'), {
                ssr: false,
            }),
        []
    );

    return (
        <>
            <DrawerComponent
                markerRefs={markerRefs}
                temtems={temtems}
                setTemtems={setTemtems}
                map={map}
                open={open}
                setOpen={setOpen}
            />
            <Box
                sx={
                    open
                        ? {
                              width: 'calc(100vw - 420px)',
                              marginLeft: '420px',
                              height: '100vh',
                          }
                        : { width: '100vw', height: '100vh' }
                }
            >
                <Map
                    setMarkerRefs={setMarkerRefs}
                    setMap={setMap}
                    temtems={temtems}
                />
            </Box>
        </>
    );
}
