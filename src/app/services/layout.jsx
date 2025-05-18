"use client";
import { usePathname } from "next/navigation";
import "./services.scss";
import ServicesGazabetonHeaderLink from "./components/servicesHeaderLink/servicesGazabetonHeaderLink";
import ServicesGazabetonLink from "./components/servicesGazabetonLink/servicesGazabetonLink";
import { useTranslation } from "react-i18next";

export default function SotuvLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const titles = {
    "/services": t("menu.xizmatlar.konsultatsiya"),
    "/services/gazablokmantaji": t("menu.xizmatlar.montaj"),
    "/services/calculator": t("menu.xizmatlar.hisoblash"),
  };

  const title = titles[pathname] || t("menu.xizmatlar.xizmatlar");
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
