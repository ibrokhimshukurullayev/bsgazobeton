"use client";
import { usePathname } from "next/navigation";
import "./aboutGazabeton.scss";
import AboutGazabetonHeaderLink from "./components/aboutGazabetonHeaderLink/aboutGazabetonHeaderLink";
import AboutGazabetonLink from "./components/aboutGazabetonLink/aboutGazabetonLink";
import { useTranslation } from "react-i18next";

export default function AboutLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const titles = {
    "/aboutGazabeton": t("menu.gazobeton.haqida"),
    "/aboutGazabeton/aboutSinovtest": t("menu.gazobeton.testlar"),
    "/aboutGazabeton/aboutSertifikat": t("menu.gazobeton.sertifikat"),
    "/aboutGazabeton/aboutQollanilishi": t("menu.gazobeton.qollanilishi"),
    "/aboutGazabeton/aboutIshlatilishi": t("menu.gazobeton.qollanma"),
    "/aboutGazabeton/aboutMaterialardanFarqi": t("menu.gazobeton.farqi"),
    "/aboutGazabeton/aboutFaq": t("menu.gazobeton.faq"),
  };

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
