import React from "react";
import "./services.scss";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const ServicesGazabetonHeaderLink = ({ title, link }) => {
  return (
    <div id="serviceslink">
      <div className="container serviceslink">
        <div className="serviceslink__link">
          <Link href={"/services"}>Xizmatlar</Link>
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
