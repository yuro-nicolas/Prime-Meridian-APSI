import { Outlet, useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { RouteProgressBar } from "./RouteProgressBar";
import { FloatingConnect } from "../connect/FloatingConnect";

/**
 * Page/layout level: the frame every route renders inside. Every
 * page gets the standalone Footer except Home — its closing
 * WorkWithUs section already carries the footer content merged into
 * one continuous banner, so rendering Footer there too would repeat it.
 */
export function Layout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <>
      <RouteProgressBar />
      <Header />
      <main>
        <Outlet />
      </main>
      {!isHome && <Footer />}
      <FloatingConnect />
    </>
  );
}
