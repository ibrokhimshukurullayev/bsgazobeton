"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import about1 from "../../assets/images/about1.svg";
import "./about.scss";

const About = () => {
  const router = useRouter(); // 📍 Router hook
  const [t, i18n] = useTranslation("global");

  const handleButtonClick = () => {
    router.push("/about"); // 📍 Sahifaga o‘tish
  };

  return (
    <div id="about">
      <div className="about__start container">
        <div className="about__start__left">
          <h3>{t("header.about")}</h3>
        </div>
        <div className="about__start__right">
          <h2>
            <span>"BS gazobeton"</span> {t("aboutsection.title")}
          </h2>
          <p>{t("aboutsection.desc1")}</p>
          <button onClick={handleButtonClick}>{t("header.about")}</button>
        </div>
      </div>
      <div className="about__end container">
        <div className="about__end__left">
          <div>
            <Image src={about1} alt="about" />
          </div>
          <div>
            <h3>{t("menu.about.sifat")}</h3>
            <p>{t("aboutsection.desc2")}</p>
          </div>
        </div>
        <div className="about__end__right">
          <iframe
            src="https://www.youtube.com/embed/G8KEoAb876A?si=NMGmUAex_Aq-3wnD"
            title="YouTube video player"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            // referrerpolicy="strict-origin-when-cross-origin"
            // allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
