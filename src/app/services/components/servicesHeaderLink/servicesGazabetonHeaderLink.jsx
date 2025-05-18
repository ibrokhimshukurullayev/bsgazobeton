import React from "react";
import "./services.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const ServicesGazabetonHeaderLink = ({ title, link }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="serviceslink">
      <div className="container serviceslink">
        <div className="serviceslink__link">
          <Link href={"/services"}>{t("menu.xizmatlar.xizmatlar")}</Link>
          <span>
            <ChevronRight className="icon" />
          </span>
          <p>{title}</p>
        </div>
        <h2>{title}</h2>
      </div>
    </div>
  );
};

export default ServicesGazabetonHeaderLink;
