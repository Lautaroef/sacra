import { InstitutionOptionalId } from "types";
import type { LeafletMouseEvent } from "leaflet";
import { Marker, useMapEvents } from "react-leaflet";

type LocationMarkerProps = {
  marker: InstitutionOptionalId;
  onClick?: (e: LeafletMouseEvent) => void;
  icon: any;
  children?: React.ReactNode;
};

const LocationMarker = ({ marker, onClick, icon, children }: LocationMarkerProps) => {
  // set a marker on the position clicked
  useMapEvents({
    click: onClick,
  });

  return (
    <Marker
      icon={icon}
      key={marker.name}
      position={[Number(marker.latitude), Number(marker.longitude)]}
    >
      {children}
    </Marker>
  );
};

export default LocationMarker;
