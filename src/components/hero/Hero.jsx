import React from "react";
import Image from "next/image";
import flag from "../../assets/images/gollandiyaflag.svg";
import blok from "../../assets/images/blok.svg";
import "./hero.scss";

const Hero = () => {
  return (
    <div id="hero">
      <div className="container hero">
        <h2 className="hero__text">Kelajak uchun yaratilgan</h2>
        <h1 className="hero__title">
          Gazobeton – Ishonchli <br />
          <span>
            <Image src={blok} alt="blok" /> Qurilish materiali!
          </span>
        </h1>
        <div className="hero__end">
          <div className="hero__left">
            <button className="hero__left__button1">
              Mahsulotlarni ko’rish
            </button>
            <button className="hero__left__button2">Gazobeton haqida</button>
          </div>
          <div className="hero__right">
            <button>
              <Image src={flag} alt="flag" /> Gollandiya texnologiyalari
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
