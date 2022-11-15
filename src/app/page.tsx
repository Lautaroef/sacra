import Link from "next/link";
import Image from "next/image";

import logoImg from "../../public/static/images/logo.png";
import { FiArrowRight } from "react-icons/fi";

/*
TODOS:

!TO FIX:
- Fix the error in the /institutions/[id]/page.tsx that runs when I include the 
generateStaticParams function. The error is: "ReferenceError: window is not defined"
*/

function Page() {
  return (
    <div id="page-landing" className="App">
      <div className="content-wrapper">
        <Image priority src={logoImg} alt="SACRA" width={88} height={132} />
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
