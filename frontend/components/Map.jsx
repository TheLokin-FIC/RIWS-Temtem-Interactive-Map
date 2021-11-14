import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import TemtemMarkers from './Marker';

export default function Map({ temtems, setTemtems, setMap }) {
    const [x, setX] = useState(120);
    const [y, setY] = useState(-120);

    const markerRef = useRef(null);
    const eventHandlers = useMemo(() => ({
        dragend() {
            const marker = markerRef.current;
            const { lat, lng } = marker.getLatLng();
            setX(lng);
            setY(lat);
        },
    }));
    return (
        <MapContainer
            center={[-147, 184]}
            zoom={2}
            whenCreated={setMap}
            minZoom={0}
            maxZoom={6}
            zoomControl={false}
            attributionControl={false}
            crs={CRS.Simple}
            maxBounds={[
                [0, 256],
                [-256, 0],
            ]}
            style={{
                width: '100vw',
                height: '100vh',
                background: '#001c42',
            }}
        >
            <ZoomControl position="bottomright"></ZoomControl>
            <TileLayer
                url="airborne-archipelago/{z}/{x}/{y}.png"
                bounds={[
                    [0, 256],
                    [-256, 0],
                ]}
                noWrap={true}
            />
            <TemtemMarkers temtems={temtems} />
            {/*             <Marker
                key={200}
                position={[y, x]}
                draggable={true}
                icon={Icon(
                    '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'
                )}
                ref={markerRef}
                eventHandlers={eventHandlers}
            >
                <SetView coords={[y, x]} />
                <Popup key={201} closeButton={false}>
                    Marker: {JSON.stringify([y, x])}
                </Popup>
            </Marker> */}
        </MapContainer>
    );
}
