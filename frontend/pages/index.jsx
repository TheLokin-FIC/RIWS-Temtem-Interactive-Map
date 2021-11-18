import dynamic from 'next/dynamic';
import { useRef, useState } from 'react';
import { getTemtems, mergeHits, mergeInnerHits } from '../api/service';
import DrawerComponent from '../components/DrawerComponent';

const Map = dynamic(() => import('../components/map/Map'), {
    ssr: false,
});

export default function Home({ initialTemtems }) {
    const [temtems, setTemtems] = useState(initialTemtems);
    const [map, setMap] = useState(null);
    const [open, setOpen] = useState(true);

    const markerRefs = useRef({});
    function handleMarkers(position, ref) {
        markerRefs.current[JSON.stringify(position)] = ref;
    }

    return (
        <>
            <DrawerComponent
                map={map}
                markerRefs={markerRefs}
                temtems={mergeHits(temtems)}
                setTemtems={setTemtems}
                open={open}
                setOpen={setOpen}
            />
            <Map
                setMap={setMap}
                temtems={mergeInnerHits(temtems)}
                handleMarkers={handleMarkers}
            />
        </>
    );
}

export async function getStaticProps() {
    const temtems = await getTemtems();
    return {
        props: {
            initialTemtems: temtems,
        },
    };
}
