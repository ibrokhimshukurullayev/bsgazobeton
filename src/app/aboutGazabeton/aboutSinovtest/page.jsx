"use client";
import React from "react";
import "./aboutSinovtest.scss";
import { TestList } from "../components/testlist/Testlist";
import Title from "../../../components/title/Title";

const AboutSinovtest = () => {
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
      <Title
        text={
          "“mahsulotlari sifat va mustahkamlik bo‘yicha standartlarga mos kelishini ta’minlash uchun turli laboratoriya sinovlaridan o‘tkaziladi. Asosan, quyidagi sinov testlari bajariladi:”"
        }
        title={" “BS gazobeton”"}
      />
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
