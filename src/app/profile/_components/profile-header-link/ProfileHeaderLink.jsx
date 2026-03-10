import React from "react";
import "./Profile.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const AboutGazabetonHeaderLink = ({ title, link }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="aboutlink">
      <div className="container aboutlink">
        <div className="aboutlink__link">
          <Link href={"/profile"}>{t("profile.title")}</Link>
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

export default AboutGazabetonHeaderLink;
