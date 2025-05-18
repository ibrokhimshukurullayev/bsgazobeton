"use client";
import React from "react";
import "./advantages.scss";
import Image from "next/image";

import icon1 from "../../assets/images/yengillik.svg";
import icon2 from "../../assets/images/issiq.svg";
import icon3 from "../../assets/images/mustahkamlilk.svg";
import icon4 from "../../assets/images/olov.svg";
import icon5 from "../../assets/images/ekologik.svg";
import icon6 from "../../assets/images/ishlov.svg";
import { useTranslation } from "react-i18next";

const Advantages = () => {
  const [t, i18n] = useTranslation("global");

  const afzalliklar = [
    {
      id: 1,
      icon: icon1,
      title: t("advantages.title1"),
      desc: t("advantages.desc1"),
    },
    {
      id: 2,
      icon: icon2,
      title: t("advantages.title2"),
      desc: t("advantages.desc2"),
    },
    {
      id: 3,
      icon: icon3,
      title: t("advantages.title3"),
      desc: t("advantages.desc3"),
    },
    {
      id: 4,
      icon: icon4,
      title: t("advantages.title4"),
      desc: t("advantages.desc4"),
    },
    {
      id: 5,
      icon: icon5,
      title: t("advantages.title5"),
      desc: t("advantages.desc5"),
    },
    {
      id: 6,
      icon: icon6,
      title: t("advantages.title6"),
      desc: t("advantages.desc6"),
    },
  ];
  return (
    <div id="advantages">
      <div className="container advantages">
        <h2 className="advantages__title">{t("advantages.title")}</h2>
        <div className="advantages__list">
          {afzalliklar.map((item) => (
            <div className="advantage-card" key={item.id}>
              <div className="icon-box">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
