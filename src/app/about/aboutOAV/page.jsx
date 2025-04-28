import React from "react";
import "./about.scss";
import about from "../../../assets/images/about1.png";
import Image from "next/image";
import oav from "../../../assets/images/aboutoav.png";
import Title from "../../../components/title/Title";

const aboutOAV = [
  {
    id: 1,
    img: about,
    question:
      "“BS gazobeton” korxonasi mahsulotlari xorijiy brendlar bilan tenglasha oladi",
    answer: "Sirdaryo viloyat hokimligi",
  },
  {
    id: 2,
    img: about,
    question:
      "New AAC plant adds premium product to BS Group in Uzbekistan (Hover)",
    answer: "Aircrete news",
  },
  {
    id: 3,
    img: about,
    question: "“Ўзстандарт” агентлиги: Газобетон қурилиш",
    answer: "Sirdaryo viloyat hokimligi",
  },
  {
    id: 4,
    img: about,
    question: "Mahsulot tayyor bo'lgandagi tekshiruv",
    answer: "Sirdaryo viloyat hokimligi",
  },
  {
    id: 5,
    img: about,
    question: "“Ўзстандарт” агентлиги: Газобетон қурилиш",
    answer: "Sirdaryo viloyat hokimligi",
  },
];

const AboutOAV = () => {
  return (
    <div id="aboutOAV">
      <Title
        text={
          "Bizning faoliyatimiz OAV, yangiliklar, qurilish sohasidagi gazeta-jurnallar va mahalliy telekanallar tomonidan yoritib boriladi. Biz haqimizda chop etilgan maqolalar:"
        }
      />
      <div className="aboutOAV__card">
        {aboutOAV.map((item) => (
          <div key={item.id} className="aboutOAV__box">
            <Image className="img" src={item.img} alt="img" />
            <h3>{item.question}</h3>
            <div>
              <Image src={oav} alt="qayd" />
              <p>{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutOAV;
