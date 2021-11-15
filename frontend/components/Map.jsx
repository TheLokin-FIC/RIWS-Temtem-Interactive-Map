import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import React from 'react';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import TemtemMarkers from './Marker';

const Map = ({ temtems, setMap, handleMarkers }) => {
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
            trackResize
            maxBounds={[
                [0, 256],
                [-256, 0],
            ]}
            style={{
                width: '100%',
                height: '100%',
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
            <TemtemMarkers temtems={temtems} handleMarkers={handleMarkers} />
        </MapContainer>
    );
};

export default Map;
