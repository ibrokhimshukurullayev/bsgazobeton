"use client";
import { usePathname } from "next/navigation";
import "./services.scss";
import ServicesGazobetonHeaderLink from "./_components/services-header-link/ServicesGazobetonHeaderLink";
import ServicesGazobetonLink from "./_components/services-gazobeton-link/ServicesGazobetonLink";
import { useTranslation } from "react-i18next";

export default function ServicesLayout({ children }) {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  const titles = {
    "/services": t("menu.services.consultation"),
    "/services/gas-block-installation": t("menu.services.installation"),
    "/services/calculator": t("menu.services.calculator"),
  };

  const title = titles[pathname] || t("menu.services.title");
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
