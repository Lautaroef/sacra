"use client";

import "leaflet/dist/leaflet.css"; // en caso de que no se vea el mapa
import type { Prisma, institution as Institution, institution } from "@prisma/client";
import type { LeafletMouseEvent } from "leaflet";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { FiArrowRight } from "react-icons/fi";
import leafletMapIcon from "../../utils/leafletMapIcon";

type MapComponentOptions = {
  zoom: number;
  center: [number, number];
  style: React.CSSProperties;
  markers: Institution[] | Prisma.institutionCreateInput;
  className?: string;
  interactive?: boolean;
  onClick?: (e: LeafletMouseEvent) => void;
};

type MarkerOptions = { marker: institution; onClick: (e: LeafletMouseEvent) => void };

const LocationMarker = ({ marker, onClick }: MarkerOptions) => {
  // set the marker position on the position clicked
  useMapEvents({
    click: onClick,
  });

  return (
    <Marker
      icon={leafletMapIcon}
      key={marker.name}
      position={[Number(marker.latitude), Number(marker.longitude)]}
    />
  );
};

const Map = ({ markers, center, zoom, style, onClick, className }: MapComponentOptions) => {
  return (
    <MapContainer id="map" zoom={zoom} style={style} center={center} className={className}>
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Array.isArray(markers) ? (
        markers.map((marker) => (
          <Marker
            icon={leafletMapIcon}
            key={marker.id}
            position={[Number(marker.latitude), Number(marker.longitude)]}
          >
            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
              {marker.name}
              <Link href={`/institutions/${marker.id}`}>
                <FiArrowRight size={20} color="#FFF" />
              </Link>
            </Popup>
          </Marker>
        ))
      ) : (
        <LocationMarker marker={markers as institution} onClick={onClick!} />
      )}
    </MapContainer>
  );
};

export default Map;
