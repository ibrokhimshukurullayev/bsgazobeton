import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import "./aboutlinks.scss";

const Aboutlink = ({ title, link }) => {
  return (
    <div id="aboutlink">
      <div className="container aboutlink">
        <div className="aboutlink__link">
          <Link href={"/about"}>Biz haqimizda</Link>
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
