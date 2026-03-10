import React from "react";
import "./catalog.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const CatalogGazobetonHeaderLink = ({ title, link }) => {
  const { t } = useTranslation("global");

  return (
    <div id="kataloglink">
      <div className="container kataloglink">
        <div className="kataloglink__link">
          <Link href={"/"}>{t("home.welcome")}</Link>
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

export default CatalogGazobetonHeaderLink;
