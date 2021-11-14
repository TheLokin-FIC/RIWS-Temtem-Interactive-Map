import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';
import Drawer from '../components/Drawer';

export default function Home() {
    const [temtems, setTemtems] = useState([]);
    const [map, setMap] = useState(null);

    const Map = useMemo(
        () =>
            dynamic(() => import('../components/Map'), {
                ssr: false,
            }),
        []
    );

    return (
        <>
            <Map setMap={setMap} temtems={temtems} setTemtems={setTemtems} />
            <Drawer temtems={temtems} setTemtems={setTemtems} map={map} />
        </>
    );
}
