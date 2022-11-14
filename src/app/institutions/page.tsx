import { use } from "react";
import Link from "next/link";
import Map from "./Map";
import { getInstitutions } from "server/controllers/institutions";

import SideBar from "./SideBar";
import { FiPlus } from "react-icons/fi";

function InstitutionsComponent() {
  const institutions = use(getInstitutions());

  return (
    <div id="page-map">
      <SideBar />
      <Map
        zoom={12.5}
        markers={institutions}
        center={[-24.8421731, -65.5109202]}
        style={{ width: "100%", height: "100%" }}
        className="leaflet-container"
      />
      <button aria-label="Agregar institución" title="Agregar institución">
        <Link href="/institutions/create" className="create-institution">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </button>
    </div>
  );
}

export default InstitutionsComponent;
