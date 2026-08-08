'use client';

import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';

// fix icon default Leaflet yang suka rusak/hilang
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface Props {
  originCoord: [number, number];
  destCoord: [number, number];
  routeCoords: [number, number][];
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length > 0) map.fitBounds(points, { padding: [40, 40] });
  }, [points, map]);
  return null;
}

export default function LeafletMap({ originCoord, destCoord, routeCoords }: Props) {
  const points = routeCoords.length > 0 ? routeCoords : [originCoord, destCoord];

  return (
    <MapContainer
      center={originCoord}
      zoom={14}
      style={{ height: '500px', width: '100%', borderRadius: '0.75rem' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />
      <Marker position={originCoord} />
      <Marker position={destCoord} />
      {routeCoords.length > 0 && <Polyline positions={routeCoords} color="#17274d" weight={5} />}
      <FitBounds points={points} />
    </MapContainer>
  );
}