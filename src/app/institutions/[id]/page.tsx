import { use } from "react";
import prisma from "lib/prisma";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import mapIcon from "utils/mapIcon";
import { FaWhatsapp as FaWhatsApp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import InstitutionImages from "./InstitutionImages";

async function getInstitution(id: string) {
  const institution = await prisma.institution.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      images: true,
    },
  });
  return institution;
}

export async function generateStaticParams() {
  let institutions = await prisma.institution.findMany({});

  return institutions.map((institution) => ({ id: institution.id }));
}

function Page({ params }: { params: { id: string } }) {
  const institution = use(getInstitution(params.id));

  return (
    institution && (
      <main id="page-orphanage">
        <div className="orphanage-details">
          <InstitutionImages institution={institution} />

          <div className="orphanage-details-content">
            <h1>{institution.name}</h1>
            <p>{institution.about}</p>

            <div className="map-container">
              <MapContainer
                center={[institution.latitude.toNumber(), institution.longitude.toNumber()]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[
                    institution.latitude.toNumber(),
                    institution.longitude.toNumber(),
                  ]}
                />
              </MapContainer>

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
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  No atendemos durante el <br />
                  fin de semana
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
    )
  );
}

export default Page;
