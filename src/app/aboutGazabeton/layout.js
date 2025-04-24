"use client";
import { usePathname } from "next/navigation";
import "./aboutGazabeton.scss";
import AboutGazabetonHeaderLink from "./components/aboutGazabetonHeaderLink/aboutGazabetonHeaderLink";
import AboutGazabetonLink from "./components/aboutGazabetonLink/aboutGazabetonLink";

const titles = {
  "/aboutGazabeton": "Gazobeton haqida batafsil",
  "/aboutGazabeton/aboutSinovtest": "Sinov testlari",
  "/aboutGazabeton/aboutSertifikat": "Sertifikat va litsenziyalar",
  "/aboutGazabeton/aboutQollanilishi": "Gazobetonning qo‘llanilish joylari",
  "/aboutGazabeton/aboutIshlatilishi": "Gazoblok ishlatish bo’yicha qo’llanma",
  "/aboutGazabeton/aboutMaterialardanFarqi":
    "Gazobetonning boshqa materiallardan farqi",
  "/aboutGazabeton/aboutFaq": "Tez-tez beriladigan savollar",
};

export default function AboutLayout({ children }) {
  const pathname = usePathname();

  const title = titles[pathname] || "Gazobeton haqida";
  return (
    <div id="aboutGazabeton">
      <AboutGazabetonHeaderLink title={title} link={pathname} />
      <div className="aboutGazabeton container">
        <div className="aboutGazabeton__left">{children}</div>
        <div className="aboutGazabeton__right">
          <AboutGazabetonLink />
        </div>
      </div>
    </div>
  );
}
