import L from 'leaflet';
import { renderToString } from 'react-dom/server';

export default function Icon(url) {
    return new L.divIcon({
        className: 'portrait background',
        html: renderToString(<img src={'data:image/png;base64,' + url} />),
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [1, -30],
    });
}
