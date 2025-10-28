"use client";

import React from "react";
import Image from "next/image";
import "./about.scss";
import hero from "../../assets/images/hero.png";
import Carusel from "../../components/carusel/Carusel";
import Features from "../../components/features/Features";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";
import { useTranslation } from "react-i18next";

export const metadata = {
  title: "Kompaniya haqida | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const About = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div>
      <Title title={"BS gazobeton"} text={t("aboutkompany.title1")} />
      <div className="abouts__images">
        <Image className="abouts__img" src={hero} alt="hero" />
      </div>
      <h3 className="abouts__title__text">{t("aboutkompany.title2")}</h3>
      <p className="abouts__list">{t("aboutkompany.title3")}</p>
      <div className="abouts__card">
        <h3 className="abouts__card__title">{t("aboutkompany.title4")}</h3>
        <p className="abouts__card__text">{t("aboutkompany.title5")}</p>
      </div>
      <h3 className="abouts__title__text">{t("aboutkompany.title6")}</h3>
      <p className="abouts__list">{t("aboutkompany.title7")}</p>
      <Carusel />
      <Features />
      <div className="abouts__cantact">
        <h3>{t("aboutkompany.title9")}</h3>
        <Button title={t("aboutkompany.title10")} />
      </div>
    </div>
  );
};

export default About;
