"use client";
import { usePathname } from "next/navigation";
import "./services.scss";
import ServicesGazobetonHeaderLink from "./_components/services-header-link/ServicesGazobetonHeaderLink";
import ServicesGazobetonLink from "./_components/services-gazobeton-link/ServicesGazobetonLink";
import { useTranslation } from "react-i18next";

export default function ServicesLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const titles = {
    "/services": t("menu.xizmatlar.konsultatsiya"),
    "/services/gas-block-installation": t("menu.xizmatlar.montaj"),
    "/services/calculator": t("menu.xizmatlar.hisoblash"),
  };

  const title = titles[pathname] || t("menu.xizmatlar.xizmatlar");
  return (
    <div id="servicesGazobeton">
      <ServicesGazobetonHeaderLink title={title} link={pathname} />
      <div className="servicesGazobeton container">
        <div className="servicesGazobeton__left">{children}</div>
        <div className="servicesGazobeton__right">
          <ServicesGazobetonLink />
        </div>
      </div>
    </div>
  );
}
