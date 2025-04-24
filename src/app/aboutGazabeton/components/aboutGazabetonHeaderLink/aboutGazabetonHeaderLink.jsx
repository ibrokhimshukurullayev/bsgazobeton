import React from "react";
import "./about.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const AboutGazabetonHeaderLink = ({ title, link }) => {
  return (
    <div id="aboutlink">
      <div className="container aboutlink">
        <div className="aboutlink__link">
          <Link href={"/aboutGazabeton"}>Gazobeton haqida</Link>
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
