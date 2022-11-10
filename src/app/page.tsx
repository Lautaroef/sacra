import Link from "next/link";
import Image from "next/image";
import logoImg from "../../public/static/images/logo.png";
import { FiArrowRight } from "react-icons/fi";

function Page() {
  return (
    <div id="page-landing" className="App">
      <div className="content-wrapper">
        <Image src={logoImg} alt="SACRA" width={108} height={160} />
        <main>
          <h1>Lleve felicidad al mundo</h1>
          <p>Visite nuestras instituciones y cambia el día de muchos niños.</p>
        </main>
        <div className="location">
          <strong>Salta, Capital</strong>
          <span>Argentina</span>
        </div>
        <Link href="/institutions" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>
      </div>
    </div>
  );
}

export default Page;
