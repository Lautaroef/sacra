import Image from "next/image";
import mapMarkerImg from "../../../public/static/images/map-marker.png";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="page-map">
      <aside>
        <header>
          <Image src={mapMarkerImg} alt="map" />
          <h2>Elija una institución del mapa</h2>
          <p>Muchos niños están esperando tu visita :)</p>
        </header>

        <footer>
          <strong>Salta, Capital</strong>
          <span>Argentina</span>
        </footer>
      </aside>
      {children}
    </div>
  );
}

export default Layout;
