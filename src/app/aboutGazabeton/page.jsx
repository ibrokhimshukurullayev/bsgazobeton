"use client";

import React from "react";
import "./aboutGazabeton.scss";
import { GazobetonAdvantages } from "./components/GazobetonAdvantages/GazobetonAdvantages";
import Title from "../../components/title/Title";
import { useTranslation } from "react-i18next";

export const metadata = {
  title: "Gazobeton haqida batafsil | BS Gazobeton",
  description: "O‘zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const AboutGazabeton = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="aboutGazabeton__page">
      <Title title={t("about.title1")} text={t("about.title2")} />
      <GazobetonAdvantages />
    </div>
  );
};

export default AboutGazabeton;
