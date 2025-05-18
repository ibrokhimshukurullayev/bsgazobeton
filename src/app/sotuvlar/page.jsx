"use client";
import React from "react";
import "./sotuvlar.scss";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";
import { useTranslation } from "react-i18next";

const Sotuvlar = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="sotuv">
      <Title text={t("deliveryinfo.title")} />
      <h3 className="sotuv__title">{t("deliveryinfo.section1title")}</h3>
      <p className="sotuv__text">{t("deliveryinfo.section1text")}</p>
      <p className="sotuv__text">{t("deliveryinfo.section1text2")}</p>
      <h3 className="sotuv__title">{t("deliveryinfo.section2title")}</h3>
      <p className="sotuv__text">{t("deliveryinfo.section2text")}</p>
      <h3 className="sotuv__title">{t("deliveryinfo.section3title")}</h3>
      <p className="sotuv__text">{t("deliveryinfo.section3text")}</p>
      <h2>{t("deliveryinfo.bottomtext")}</h2>
      <div className="sotuv__end">
        <Button title={t("deliveryinfo.button1")} />
        <button className="sotuv__end__button">
          {t("deliveryinfo.button2")}
        </button>
      </div>
    </div>
  );
};

export default Sotuvlar;
