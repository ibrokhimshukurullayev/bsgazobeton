import React from "react";
import "./sotuv.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const SotuvGazabetonHeaderLink = ({ title, link }) => {
  return (
    <div id="sotuvlink">
      <div className="container sotuvlink">
        <div className="sotuvlink__link">
          <Link href={"/sotuvlar"}>Sotuvlar</Link>
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

export default SotuvGazabetonHeaderLink;
