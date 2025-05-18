"use client";
import React from "react";
import "./aboutSinovtest.scss";
import { TestList } from "../components/testlist/Testlist";
import Title from "../../../components/title/Title";
import { useTranslation } from "react-i18next";

const AboutSinovtest = () => {
  const [t, i18n] = useTranslation("global");

  const videos = ["/videos/lolazor.mp4"];

  const handleVideoClick = (event) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <div className="aboutSinovtest">
      <Title text={t("sinovtestlar.title")} title={"“BS gazobeton”"} />
      <TestList />
      <div>
        {videos.map((src, index) => (
          <div key={index} className="carousel-slide">
            <video
              src={src}
              onClick={handleVideoClick}
              className="carousel-video"
              controls={false}
              muted
              loop
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSinovtest;
