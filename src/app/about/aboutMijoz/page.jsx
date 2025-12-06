"use client";
import React from "react";
import Image from "next/image";
import "./aboutMijoz.scss";
import versal from "../../../assets/images/versal.png";
import ClientCarousel from "../../../components/clientCarousel/ClientCarousel";
import caricon from "../../../assets/images/caricon.png";
import Title from "../../../components/title/Title";
import { useTranslation } from "react-i18next";

// export const metadata = {
//   title: "Mijozlar va hamkorlar | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const AboutMijoz = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="aboutMijoz">
      <Title title={"BS gazobeton"} text={t("mijoz.title1")} />
      <ClientCarousel />
      <div className="aboutMijoz__mijzolar">
        <div>
          <Image src={versal} alt="xonsaroy" />
        </div>
      </div>
      <div className="aboutMijoz__banner">
        <div className="aboutMijoz__hero">
          <h2>{t("mijoz.title2")}</h2>
          <button>{t("aboutkompany.title10")}</button>
        </div>
        <div className="aboutMijoz__banner__end">
          <Image src={caricon} alt="carison" />
          <p>{t("mijoz.title3")}</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMijoz;
