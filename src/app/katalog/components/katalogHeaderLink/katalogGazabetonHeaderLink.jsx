import React from "react";
import "./katalog.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const KatalogGazabetonHeaderLink = ({ title, link }) => {
  const { t, i18n } = useTranslation("global");

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

export default KatalogGazabetonHeaderLink;
