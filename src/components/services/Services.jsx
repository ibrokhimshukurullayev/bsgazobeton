"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import "./services.scss";

import serviceConsulting from "../../assets/images/home/service-consulting.webp";
import serviceInstallation from "../../assets/images/home/service-installation.webp";
import serviceCalculator from "../../assets/images/home/service-calculator.webp";
import Link from "next/link";

const Services = () => {
  const [t, i18n] = useTranslation("global");

  const xizmatlar = [
    {
      id: 1,
      title: t("services.title1"),
      desc: t("services.desc1"),
      button: t("services.button1"),
      image: serviceConsulting,
      type: "konsultatsiya",
      link: "/joylashuv",
    },
    {
      id: 2,
      title: t("services.title2"),
      desc: t("services.desc2"),
      button: t("services.button2"),
      image: serviceInstallation,
      type: "montaj",
      link: "/aboutGazabeton/aboutIshlatilishi",
    },
    {
      id: 3,
      title: t("services.title3"),
      desc: t("services.desc3"),
      button: t("services.button3"),
      image: serviceCalculator,
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
