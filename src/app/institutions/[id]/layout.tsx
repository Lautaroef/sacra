import type { ReactNode } from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

function Layout({ children }: { children: ReactNode }) {
  return (
    <main id="page-institution">
      <div className="go-back-div">
        <Link href="institutions">
          <FiArrowLeft size={42} color="#fff" />
        </Link>
      </div>
      {children}
    </main>
  );
}

export default Layout;
