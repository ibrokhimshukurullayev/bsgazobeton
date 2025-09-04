"use client";
import React from "react";
import "./aboutSinovtest.scss";
import { TestList } from "../components/testlist/Testlist";
import Title from "../../../components/title/Title";
import { useTranslation } from "react-i18next";

const AboutSinovtest = () => {
  const [t, i18n] = useTranslation("global");
  return (
    <div className="aboutSinovtest">
      <Title text={t("sinovtestlar.title")} title={"“BS gazobeton”"} />
      <TestList />
      <div>
        <iframe
          className="iframe"
          width="927"
          height="465"
          src="https://www.youtube.com/embed/g5kA7gkIiuA?si=eayNvx9dZ0FjknWh"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AboutSinovtest;
