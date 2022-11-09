import Image from "next/image";
import { useRouter } from "next/router";
import { FiArrowLeft } from "react-icons/fi";
import mapMarkerImg from "../public/images/map-marker.svg";

function Sidebar() {
  const { back } = useRouter();

  return (
    <aside className="app-sidebar">
      <Image src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={() => back()}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}

export default Sidebar;
