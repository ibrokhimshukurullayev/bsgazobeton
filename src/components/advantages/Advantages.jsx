import React from "react";
import "./advantages.scss";
import Image from "next/image";

import icon1 from "../../assets/images/yengillik.svg";
import icon2 from "../../assets/images/issiq.svg";
import icon3 from "../../assets/images/mustahkamlilk.svg";
import icon4 from "../../assets/images/olov.svg";
import icon5 from "../../assets/images/ekologik.svg";
import icon6 from "../../assets/images/ishlov.svg";

const afzalliklar = [
  {
    id: 1,
    icon: icon1,
    title: "Yengillik",
    desc: "Oddiy betonga qaraganda ancha yengil, bu esa transport va qurilish xarajatlarini kamaytiradi.",
  },
  {
    id: 2,
    icon: icon2,
    title: "Issiqlik izolyatsiyasi",
    desc: "Gazobeton yuqori darajadagi issiqlikni saqlash xususiyatiga ega, bu esa qishda issiqlikni, yozda salqinlikni ta’minlaydi.",
  },
  {
    id: 3,
    icon: icon3,
    title: "Mustahkamlik",
    desc: "Yengil bo‘lishiga qaramay, gazobeton yaxshi yuk ko‘tarish qobiliyatiga ega va uzoq muddatga chidamli.",
  },
  {
    id: 4,
    icon: icon4,
    title: "Olovga chidamlilik",
    desc: "Gazobeton yong‘inga bardoshli bo‘lib, yuqori haroratga chidamli, xavfsizlikni ta’minlaydi.",
  },
  {
    id: 5,
    icon: icon5,
    title: "Ekologik tozaligi",
    desc: "Tarkibida zararli moddalar yo‘q, inson salomatligiga xavfsiz va ekologik toza material.",
  },
  {
    id: 6,
    icon: icon6,
    title: "Oson ishlov berish",
    desc: "Kesish, teshish va shakllantirish oson bo‘lib, qurilish jarayonini soddalashtiradi va vaqtni tejaydi.",
  },
];

const Advantages = () => {
  return (
    <div id="advantages">
      <div className="container advantages">
        <h2 className="advantages__title">Gazobeton afzalliklari</h2>
        <div className="advantages__list">
          {afzalliklar.map((item) => (
            <div className="advantage-card" key={item.id}>
              <div className="icon-box">
                <Image
                  src={item.icon}
                  alt={item.title}
                  width={40}
                  height={40}
                />
              </div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Advantages;
