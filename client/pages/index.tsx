import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import logoImg from "../public/images/logo.svg";
import { FiArrowRight } from "react-icons/fi";

function Landing() {
  return (
    <>
      <Head>
        <title>Sacra</title>
        <meta
          name="description"
          content="Institución educativa para niños con capacidades diferentes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="page-landing" className="App">
        <div className="content-wrapper">
          <Image src={logoImg} alt="SACRA" />
          <main>
            <h1>Lleve felicidad al mundo</h1>
            <p>Visite nuestras instituciones y cambia el día de muchos niños.</p>
          </main>
          <div className="location">
            <strong>Salta, Capital</strong>
            <span>Argentina</span>
          </div>
          <Link href="/orphanages" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
          </Link>
        </div>
      </div>
    </>
  );
}

export default Landing;
