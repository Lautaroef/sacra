import { use } from "react";
import Link from "next/link";
import Map from "./Map";

import { FiPlus } from "react-icons/fi";
import { getInstitutions } from "server/controllers/institutions";
import SideBar from "./SideBar";

function InstitutionsComponent() {
  const institutions = use(getInstitutions());
  // console.log(institutions);
  console.log(
    "Institution's length: ",
    institutions?.length,
    institutions?.length > 0 ? "✅" : "❌"
  );

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
      <div>
        <Link href="/institutions/create" className="create-institution">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </div>
  );
}

export default InstitutionsComponent;
