import React from "react";
import "./sotuv.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const SalesGazobetonHeaderLink = ({ title, link }) => {
  const [t] = useTranslation("global");

  return (
    <div id="sotuvlink">
      <div className="container sotuvlink">
        <div className="sotuvlink__link">
          <Link href={"/sales"}>{t("menu.sotuvlar.sotuvlar")}</Link>
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

export default SalesGazobetonHeaderLink;
