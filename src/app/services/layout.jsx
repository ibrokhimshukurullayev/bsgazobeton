"use client";
import { usePathname } from "next/navigation";
import "./services.scss";
import ServicesGazabetonHeaderLink from "./components/servicesHeaderLink/servicesGazabetonHeaderLink";
import ServicesGazabetonLink from "./components/servicesGazabetonLink/servicesGazabetonLink";

const titles = {
  "/services": "Mahsulot bo’yicha konsultatsiya",
  "/services/gazablokmantaji": "Gazoblok montaji",
  "/services/calculator": "gazobloklar miqdorini va narxini hisobLash",
};

export default function SotuvLayout({ children }) {
  const pathname = usePathname();

  const title = titles[pathname] || "Xizmatlar";
  return (
    <div id="servicesGazabeton">
      <ServicesGazabetonHeaderLink title={title} link={pathname} />
      <div className="servicesGazabeton container">
        <div className="servicesGazabeton__left">{children}</div>
        <div className="servicesGazabeton__right">
          <ServicesGazabetonLink />
        </div>
      </div>
    </div>
  );
}
