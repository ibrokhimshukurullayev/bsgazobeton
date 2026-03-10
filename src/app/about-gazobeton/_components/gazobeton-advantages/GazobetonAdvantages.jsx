"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import "./about.scss";

import icon2 from "../../../../assets/images/featuresicon/icon2.png";
import icon6 from "../../../../assets/images/featuresicon/icon6.png";
import icon7 from "../../../../assets/images/featuresicon/icon7.png";
import icon8 from "../../../../assets/images/featuresicon/icon8.png";
import icon9 from "../../../../assets/images/featuresicon/icon9.png";
import icon10 from "../../../../assets/images/featuresicon/icon10.png";
import icon11 from "../../../../assets/images/featuresicon/icon11.png";
import icon12 from "../../../../assets/images/featuresicon/icon12.png";
import gazobeton from "../../../../assets/images/aboutGazobeton/gazobeton.webp";

export const GazobetonAdvantages = () => {
  const [t, i18n] = useTranslation("global");

  const advantages = [
    {
      title: t("about.cardtitle1"),
      description: t("about.cardlist1"),
      icon: icon6,
    },
    {
      title: t("about.cardtitle2"),
      description: t("about.cardlist2"),
      icon: icon7,
    },
    {
      title: t("about.cardtitle3"),
      description: t("about.cardlist3"),
      icon: icon8,
    },
    {
      title: t("about.cardtitle3"),
      description: t("about.cardlist4"),
      icon: icon9,
    },
    {
      type: "image",
      src: gazobeton,
    },
    {
      title: t("about.cardtitle5"),
      description: t("about.cardlist5"),
      icon: icon10,
    },
    {
      title: t("about.cardtitle6"),
      description: t("about.cardlist6"),
      icon: icon2,
    },
    {
      title: t("about.cardtitle7"),
      description: t("about.cardlist7"),
      icon: icon11,
    },
    {
      title: t("about.cardtitle8"),
      description: t("about.cardlist8"),
      icon: icon12,
    },
  ];

  return (
    <section className="advantages">
      <h2 className="advantages__title">{t("about.title3")}</h2>
      <div className="advantages__grid">
        {advantages.map((item, idx) => {
          if (item.type === "image") {
            return (
              <div key={idx} className="advantages__imageWrapper">
                <Image
                  src={item.src}
                  alt="Gazobeton"
                  width={200}
                  height={140}
                />
              </div>
            );
          }

          return (
            <div key={idx} className="advantages__card">
              <div className="advantages__icon">
                <Image src={item.icon} alt="icon" width={48} height={48} />
              </div>
              <h3 className="advantages__cardTitle">{item.title}</h3>
              <p className="advantages__desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
