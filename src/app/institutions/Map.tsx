"use client";

import "leaflet/dist/leaflet.css"; // en caso de que no se vea el mapa
import type { Prisma, institution as Institution } from "@prisma/client";
import type { LeafletMouseEvent, Map as MapType } from "leaflet";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FiArrowRight } from "react-icons/fi";
import leafletMapIcon from "../../utils/leafletMapIcon";

type MarkerOptions = Institution[] | Prisma.institutionCreateInput;

type Props = {
  markers: MarkerOptions;
  center: [number, number];
  zoom: number;
  style: React.CSSProperties;
  interactive?: boolean;
  className?: string;
  onClick?: (e: LeafletMouseEvent) => void;
};

const Map = ({
  markers,
  center,
  zoom,
  style,
  onClick,
  className,
  interactive = true,
}: Props) => {
  const mapRef = useRef<MapType>(null);
  const mapElement = mapRef.current;

  useEffect(() => {
    mapElement?.on("click", onClick!);
    return () => {
      mapElement?.off("click", onClick);
    };
  }, [mapElement, onClick]);

  return (
    <MapContainer
      id="map"
      zoom={zoom}
      ref={mapRef}
      style={style}
      center={center}
      className={className}
      dragging={interactive}
      touchZoom={interactive}
      zoomControl={interactive}
      scrollWheelZoom={interactive}
      doubleClickZoom={interactive}
    >
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {Array.isArray(markers)
        ? markers.map((marker) => (
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
        : Number(markers.latitude) !== 0 && (
            <Marker
              icon={leafletMapIcon}
              key={markers.name}
              position={[Number(markers.latitude), Number(markers.longitude)]}
            />
          )}
    </MapContainer>
  );
};

export default Map;
