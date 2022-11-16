import { getInstitution, getInstitutions } from "server/controllers/institutions";

import ImagesComponent from "./ImagesComponent";
import { FaWhatsapp as FaWhatsApp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
// import Map from "components/leaflet-map/map";
import dynamic from "next/dynamic";
import { use } from "react";

/* 
  This function below is causing the error 'window is not defined'.
*/
// export async function generateStaticParams() {
//   const institutions = await getInstitutions();
//   return institutions.map((institution) => ({ id: institution.id.toString() }));
// }

function SingleInstitutionComponent({ params }: { params: { id: string } }) {
  const institution = use(getInstitution(parseInt(params.id)));

  const Map = dynamic(() => import("components/leaflet-map/map"), { ssr: false });

  return (
    <main id="page-institution">
      <div className="institution-details">
        <ImagesComponent institution={institution} />

        <div className="institution-details-content">
          <h1>{institution.name}</h1>
          <p>{institution.about}</p>

          <div className="map-container">
            {" "}
            {typeof window !== "undefined" && (
              <Map
                zoom={16}
                markers={institution}
                style={{ width: "100%", height: 280 }}
                center={[institution.latitude, institution.longitude]}
              />
            )}
            <footer>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`https://www.google.com/maps/dir/?api=1&destination=${institution.latitude},${institution.longitude}`}
              >
                Ver rutas en Google Maps
              </a>
            </footer>
          </div>

          <hr />

          <h2>Horarios comerciales</h2>
          <p>{institution.instructions}</p>

          <div className="open-details">
            <div className="hour">
              <FiClock size={32} color="#15B6D6" />
              Lunes a Viernes <br />
              {institution.opening_hours}
            </div>
            {institution.open_on_weekends ? (
              <div className="open-on-weekends">
                <FiInfo size={32} color="#39CC83" />
                Atendemos durante el <br />
                fin de semana
              </div>
            ) : (
              <div className="open-on-weekends close-on-weekends">
                <FiInfo size={32} color="#FF669D" />
                No atendemos durante el fin de semana
              </div>
            )}
          </div>

          <button type="button" className="contact-button">
            <FaWhatsApp size={20} color="#FFF" />
            Contáctenos
          </button>
        </div>
      </div>
    </main>
  );
}

export default SingleInstitutionComponent;
