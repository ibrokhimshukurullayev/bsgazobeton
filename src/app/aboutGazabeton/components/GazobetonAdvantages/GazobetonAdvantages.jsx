"use client";

import React from "react";
import Image from "next/image";
import "./about.scss";

import icon2 from "../../../../assets/images/featuresicon/icon2.png";
import icon6 from "../../../../assets/images/featuresicon/icon6.png";
import icon7 from "../../../../assets/images/featuresicon/icon7.png";
import icon8 from "../../../../assets/images/featuresicon/icon8.png";
import icon9 from "../../../../assets/images/featuresicon/icon9.png";
import icon10 from "../../../../assets/images/featuresicon/icon10.png";
import icon11 from "../../../../assets/images/featuresicon/icon11.png";
import icon12 from "../../../../assets/images/featuresicon/icon12.png";
import gazabeton from "../../../../assets/images/Containergaza.png";

const advantages = [
  {
    title: "Yengillik",
    description:
      "Oddiy betonga qaraganda ancha yengil, bu esa transport va qurilish xarajatlarini kamaytiradi",
    icon: icon6,
  },
  {
    title: "Issiqlik izolyatsiyasi",
    description:
      "Gazobeton yuqori darajadagi issiqlikni saqlash xususiyatiga ega, bu esa qishda issiqlikni, yozda salqinlikni taʼminlaydi",
    icon: icon7,
  },
  {
    title: "Mustahkamlik",
    description:
      "Yengil bo‘lishiga qaramay, gazobeton yaxshi yuk ko‘tarish qobiliyatiga ega va uzoq muddatga chidamli",
    icon: icon8,
  },
  {
    title: "Olovga chidamlilik",
    description:
      "Gazobeton yong‘inga bardoshli bo‘lib, yuqori haroratga chidamli, xavfsizligini taʼminlaydi",
    icon: icon9,
  },
  {
    type: "image",
    src: gazabeton,
  },
  {
    title: "Oson ishlov berish",
    description:
      "Kesish, teshish va shakllantirish oson bo‘lib, qurilish jarayonini soddalashtiradi va vaqtni tejaydi",
    icon: icon10,
  },
  {
    title: "Ekologik tozaligi",
    description:
      "Tarkibida zararli moddalar yo‘q, inson salomatligiga xavfsiz va ekologik toza material",
    icon: icon2,
  },
  {
    title: "Mukammal tovush izolyatsiyasi",
    description:
      "Tovushlarni yaxshi yutib, binoda tovush izolyatsiyasini taʼminlaydi",
    icon: icon11,
  },
  {
    title: "Namlikka chidamliligi",
    description: "Gazobeton mog‘or paydo bo‘lishining oldini oladi",
    icon: icon12,
  },
];

export const GazobetonAdvantages = () => {
  return (
    <section className="advantages">
      <h2 className="advantages__title">Gazobeton afzalliklari</h2>
      <div className="advantages__grid">
        {advantages.map((item, idx) => {
          if (item.type === "image") {
            return (
              <div key={idx} className="advantages__imageWrapper">
                <Image
                  src={item.src}
                  alt="Gazobeton"
                  width={200}
                  height={140}
                />
              </div>
            );
          }

          return (
            <div key={idx} className="advantages__card">
              <div className="advantages__icon">
                <Image src={item.icon} alt="icon" width={48} height={48} />
              </div>
              <h3 className="advantages__cardTitle">{item.title}</h3>
              <p className="advantages__desc">{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
