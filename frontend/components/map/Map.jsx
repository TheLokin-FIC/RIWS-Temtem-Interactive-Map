import { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, ZoomControl } from 'react-leaflet';
import TemtemMarkers from './Marker';

export default function Map({ setMap, temtems, handleMarkers }) {
    return (
        <MapContainer
            whenCreated={setMap}
            center={[-147, 184]}
            zoom={4}
            minZoom={4}
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
            <TemtemMarkers temtems={temtems} handleMarkers={handleMarkers} />
        </MapContainer>
    );
}
