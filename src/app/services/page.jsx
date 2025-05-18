"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import "./services.scss";

import services from "../../assets/images/services.png";
import Button from "../../components/button/Button";

const Services = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="services">
      <div className="services__img">
        <Image src={services} alt="services" />
      </div>
      <h2>{t("consultationinfo.title")}</h2>
      <h2>{t("consultationinfo.subtitle")}</h2>
      <p>{t("consultationinfo.text")}</p>
      <h3>{t("consultationinfo.bottomtext")}</h3>
      <div className="services__end">
        <Button title={t("consultationinfo.button1")} />
        <button className="services__button">
          {t("consultationinfo.button2")}
        </button>
      </div>
    </div>
  );
};

export default Services;
