"use client";
import React from "react";
import Image from "next/image";
import flag from "../../assets/images/gollandiyaflag.svg";
import blok from "../../assets/images/blok.svg";
import "./hero.scss";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="hero">
      <div className="container hero">
        <h2 className="hero__text">{t("hero.title1")}</h2>
        <h1 className="hero__title">
          {t("hero.title2")} <br />
          <span>
            <Image src={blok} alt="blok" /> {t("hero.title3")}
          </span>
        </h1>
        <div className="hero__end">
          <div className="hero__left">
            <button className="hero__left__button1">
              {t("hero.titlebutton1")}
            </button>
            <button className="hero__left__button2">
              {t("menu.gazobeton.gazobeton")}
            </button>
          </div>
          <div className="hero__right">
            <button>
              <Image src={flag} alt="flag" />
              {t("hero.titlebutton2")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
