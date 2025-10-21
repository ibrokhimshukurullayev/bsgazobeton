"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import "./services.scss";

import xizmat1 from "../../assets/images/xizmat1.png";
import xizmat2 from "../../assets/images/xizmat2.png";
import xizmat3 from "../../assets/images/xizmat3.png";
import Link from "next/link";

const Services = () => {
  const [t, i18n] = useTranslation("global");

  const xizmatlar = [
    {
      id: 1,
      title: t("services.title1"),
      desc: t("services.desc1"),
      button: t("services.button1"),
      image: xizmat1,
      type: "konsultatsiya",
      link: "/joylashuv",
    },
    {
      id: 2,
      title: t("services.title2"),
      desc: t("services.desc2"),
      button: t("services.button2"),
      image: xizmat2,
      type: "montaj",
      link: "/aboutGazabeton/aboutIshlatilishi",
    },
    {
      id: 3,
      title: t("services.title3"),
      desc: t("services.desc3"),
      button: t("services.button3"),
      image: xizmat3,
      type: "hisoblash",
      link: "/services/calculator",
    },
  ];

  return (
    <div id="services">
      <div className="container services">
        <h2 className="services__title">{t("header.services")}</h2>
        <div className="services__list">
          {xizmatlar.map((item) => (
            <div className={`services__card ${item.type}`} key={item.id}>
              <div className="services__content">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              <Link href={item.link}>{item.button}</Link>
              <Image
                src={item.image}
                alt={item.title}
                width={"auto"}
                height={"auto"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
