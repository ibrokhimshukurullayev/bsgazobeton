"use client";

import React from "react";
import "./aboutSifat.scss";
import Carusel from "../../../components/carusel/Carusel";
import Image from "next/image";
import labaratoriya from "../../../assets/images/labaratoriya.png";
import Title from "../../../components/title/Title";
import { useTranslation } from "react-i18next";
import nazorat1 from "../../../assets/images/nazorat/nazorat1.jpg";
import nazorat2 from "../../../assets/images/nazorat/nazorat2.jpg";
import nazorat3 from "../../../assets/images/nazorat/nazorat3.jpg";

export const metadata = {
  title: "Sifat nazorati va laboratoriya | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const AboutSifat = () => {
  const [t, i18n] = useTranslation("global");

  const steps = [
    {
      id: 1,
      title: t("sifat.cardtitle1"),
      description: t("sifat.cardlist1"),
      image: labaratoriya,
    },
    {
      id: 2,
      title: t("sifat.cardtitle2"),
      description: t("sifat.cardlist2"),
      image: nazorat1,
    },
    {
      id: 3,
      title: t("sifat.cardtitle3"),
      description: t("sifat.cardlist3"),
      image: nazorat2,
    },
    {
      id: 4,
      title: t("sifat.cardtitle4"),
      description: t("sifat.cardlist24"),
      image: nazorat3,
    },
  ];

  return (
    <div id="aboutSifat">
      <Title title={"BS gazobeton"} text={t("sifat.title1")} />
      <div className="timeline-wrapper">
        <h2 className="timeline-heading">{t("sifat.title2")}</h2>
        <div className="timeline">
          {steps.map((step, index) => (
            <div className="timeline-step" key={step.id}>
              <div className="timeline-left">
                <div className="circle">{step.id}</div>
                {index !== steps.length - 1 && <div className="line" />}
              </div>
              <div className="timeline-content">
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={494}
                  height={265}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="aboutSifat__carusel">
        <h3>{t("sifat.title3")}</h3>
        <Carusel />
        <p>{t("sifat.list1")}</p>
        <p>{t("sifat.list2")}</p>
      </div>
    </div>
  );
};

export default AboutSifat;
