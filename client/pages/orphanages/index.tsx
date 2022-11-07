import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import api from "../../services/api";

import mapMarkerImg from "../../public/images/map-marker.svg";
import { FiPlus } from "react-icons/fi";

function OrphanagesMap() {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
  const Map = useMemo(
    () =>
      dynamic(() => import("../../components/Map"), {
        loading: () => <p>Cargando mapa...</p>,
        ssr: false,
      }),
    []
  );

  useEffect(() => {
    api.get("orphanages").then((response) => {
      console.log(response);
      setOrphanages(response.data);
    });
  }, []);

  return (
    <div id="page-map">
      <aside>
        <header>
          <Image src={mapMarkerImg} alt="map" />
          <h2>Elija una institución del mapa</h2>
          <p>Muchos niños están esperando tu visita :)</p>
        </header>
        <footer>
          <strong>Salta, Argentina</strong>
          <span>Argentina</span>
        </footer>
      </aside>
      <Map
        zoom={15}
        markers={orphanages}
        center={[-19.9292425, -43.9458236]}
        style={{ width: "100%", height: "100%" }}
      />
      <div>
        <Link href="/orphanages/create" className="create-orphanage">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </div>
  );
}

export default OrphanagesMap;
