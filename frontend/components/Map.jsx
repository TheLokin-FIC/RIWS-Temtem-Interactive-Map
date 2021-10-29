import { CRS } from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet/dist/leaflet.css';
import React, { Component } from 'react';
import { MapContainer, Marker, TileLayer, ZoomControl } from 'react-leaflet';

export default class Map extends Component {
    render() {
        return (
            <MapContainer
                center={[-128, 128]}
                zoom={5}
                minZoom={0}
                maxZoom={5}
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
                    noWrap={true}
                />
                <Marker position={[-128, 128]} draggable={true}></Marker>
            </MapContainer>
        );
    }
}
