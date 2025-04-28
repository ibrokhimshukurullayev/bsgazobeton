import React from "react";
import "./katalog.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const KatalogGazabetonHeaderLink = ({ title, link }) => {
  return (
    <div id="kataloglink">
      <div className="container kataloglink">
        <div className="kataloglink__link">
          <Link href={"/"}>Bosh sahifa</Link>
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
