import { useMemo, useRef, useState } from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import Icon from './Icon';
import TemtemPopup from './Popup';

export default function TemtemMarkers({ temtems, handleMarkers }) {
    const icons = useRef({});
    function cacheIcon(url) {
        if (icons.current[url] === undefined) {
            icons.current[url] = Icon(url);
        }

        return icons.current[url];
    }

    const map = useMapEvents({
        moveend() {
            setVisibleTemtems(
                temtems.filter((temtem) =>
                    map.getBounds().contains(temtem.position)
                )
            );
        },
    });
    const [visibleTemtems, setVisibleTemtems] = useState(
        temtems.filter((temtem) => map.getBounds().contains(temtem.position))
    );
    useMemo(() => {
        setVisibleTemtems(
            temtems.filter((temtem) =>
                map.getBounds().contains(temtem.position)
            )
        );
    }, [temtems]);

    return useMemo(() => {
        return (
            <>
                {visibleTemtems.map((temtem) => (
                    <Marker
                        key={JSON.stringify(temtem.position)}
                        ref={(ref) => handleMarkers(temtem.position, ref)}
                        position={temtem.position}
                        icon={cacheIcon(temtem.portrait)}
                    >
                        <TemtemPopup temtem={temtem} />
                    </Marker>
                ))}
            </>
        );
    }, [visibleTemtems]);
}
