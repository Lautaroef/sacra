import prisma from "lib/prisma";
import { use, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

import mapMarkerImg from "../../../public/static/images/map-marker.svg";
import { FiPlus } from "react-icons/fi";

async function getInstitutions() {
  const institutions = await prisma.institution.findMany({
    include: {
      images: true,
    },
  });
  return institutions;
}

function Page() {
  const institutions = use(getInstitutions());
  console.log(institutions);

  // const Map = useMemo(
  //   () =>
  //     dynamic(() => import("./Map"), {
  //       loading: () => <p>Cargando mapa...</p>,
  //       ssr: false,
  //     }),
  //   []
  // );

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
      {/* <Map
        zoom={15}
        markers={institutions}
        center={[-19.9292425, -43.9458236]}
        style={{ width: "100%", height: "100%" }}
      /> */}
      <div>
        <Link href="/institutions/create" className="create-institution">
          <FiPlus size={32} color="#FFF" />
        </Link>
      </div>
    </div>
  );
}

export default Page;
