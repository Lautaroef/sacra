"use client";

import type { InstitutionOptionalId } from "types";
import type { LeafletMouseEvent } from "leaflet";
import Link from "next/link";
import dynamic from "next/dynamic";
// import { MapContainer, TileLayer, Popup } from "react-leaflet";
import { FiArrowRight } from "react-icons/fi";
import leafletMapIcon from "../../utils/leafletMapIcon";
// import LocationMarker from "components/leaflet-map/LocationMarker";
import "leaflet/dist/leaflet.css"; // in case the map is not visible

type MapComponentOptions = {
  markers: InstitutionOptionalId | InstitutionOptionalId[];
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
  className?: string;
  onClick?: (e: LeafletMouseEvent) => void;
};

const LocationMarker = dynamic(() => import("components/leaflet-map/LocationMarker"), {
  ssr: false,
});
// dynamically import MapContainer, TileLayer, Popup from react-leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
});
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

const Map = ({ markers, center, zoom, style, onClick, className }: MapComponentOptions) => {
  return (
    <MapContainer id="map" zoom={zoom} style={style} center={center} className={className}>
      <TileLayer
        url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />

      {Array.isArray(markers) ? (
        markers.map((marker) => (
          <LocationMarker key={marker.id} icon={leafletMapIcon} marker={marker}>
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {marker.name}
              <Link href={`/institutions/${marker.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </LocationMarker>
        ))
      ) : (
        <LocationMarker marker={markers} icon={leafletMapIcon} onClick={onClick} />
      )}
    </MapContainer>
  );
};

export default Map;
