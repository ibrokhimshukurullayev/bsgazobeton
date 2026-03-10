"use client";
import { usePathname } from "next/navigation";
import "./about-gazobeton.scss";
import AboutGazobetonHeaderLink from "./_components/about-gazobeton-header-link/AboutGazobetonHeaderLink";
import AboutGazobetonLink from "./_components/about-gazobeton-link/AboutGazobetonLink";
import { useTranslation } from "react-i18next";

export default function AboutLayout({ children }) {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  const titles = {
    "/about-gazobeton": t("menu.gazobeton.overview"),
    "/about-gazobeton/tests": t("menu.gazobeton.tests"),
    "/about-gazobeton/certificates": t("menu.gazobeton.certificates"),
    "/about-gazobeton/applications": t("menu.gazobeton.applications"),
    "/about-gazobeton/usage-guide": t("menu.gazobeton.usageGuide"),
    "/about-gazobeton/material-differences": t("menu.gazobeton.materialDifferences"),
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
