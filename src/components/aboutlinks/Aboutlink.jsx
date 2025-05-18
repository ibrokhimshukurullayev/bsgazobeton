import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./aboutlinks.scss";
import { useTranslation } from "react-i18next";

const Aboutlink = ({ title, link }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="aboutlink">
      <div className="container aboutlink">
        <div className="aboutlink__link">
          <Link href={"/about"}>{t("menu.about.about")}</Link>
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

export default Aboutlink;
