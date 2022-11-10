"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from "../../../public/static/images/map-marker.svg";

function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  return (
    <>
      <aside className="app-sidebar">
        <Image src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={() => router?.back()}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
      {children}
    </>
  );
}

export default Layout;
