import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { FiArrowRight } from "react-icons/fi";
import mapIcon from "../utils/mapIcon";
import "leaflet/dist/leaflet.css"; // en caso de que no se vea el mapa

type Props = {
  markers: Orphanage[];
  center: [number, number];
  zoom: number;
  interactive?: boolean;
  style: React.CSSProperties;
  onClick?: () => void;
};

const Map = ({ markers, center, zoom, interactive = true, style, onClick }: Props) => {
  return (
    <MapContainer center={center} zoom={zoom} style={style}>
      <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map(
        (marker) =>
          marker.latitude !== 0 && (
            <Marker
              icon={mapIcon}
              key={marker.id}
              interactive={interactive}
              position={[marker.latitude, marker.longitude]}
            >
              <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                {marker.name}
                <Link href={`/orphanages/${marker.id}`}>
                  <FiArrowRight size={20} color="#FFF" />
                </Link>
              </Popup>
            </Marker>
          )
      )}
    </MapContainer>
  );
};

export default Map;
