"use client";
import { usePathname } from "next/navigation";
import "./about-gazobeton.scss";
import AboutGazobetonHeaderLink from "./_components/about-gazobeton-header-link/AboutGazobetonHeaderLink";
import AboutGazobetonLink from "./_components/about-gazobeton-link/AboutGazobetonLink";
import { useTranslation } from "react-i18next";

export default function AboutLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const titles = {
    "/about-gazobeton": t("menu.gazobeton.haqida"),
    "/about-gazobeton/tests": t("menu.gazobeton.testlar"),
    "/about-gazobeton/certificates": t("menu.gazobeton.sertifikat"),
    "/about-gazobeton/applications": t("menu.gazobeton.qollanilishi"),
    "/about-gazobeton/usage-guide": t("menu.gazobeton.qollanma"),
    "/about-gazobeton/material-differences": t("menu.gazobeton.farqi"),
    "/about-gazobeton/faq": t("menu.gazobeton.faq"),
  };

  const title = titles[pathname] || "Gazobeton haqida";
  return (
    <div id="aboutGazobeton">
      <AboutGazobetonHeaderLink title={title} link={pathname} />
      <div className="aboutGazobeton container">
        <div className="aboutGazobeton__left">{children}</div>
        <div className="aboutGazobeton__right">
          <AboutGazobetonLink />
        </div>
      </div>
    </div>
  );
}
