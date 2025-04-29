import React from "react";
import "./services.scss";
import Image from "next/image";
import mantaj from "../../../assets/images/mantaj.png";
import Button from "../../../components/button/Button";

const takliflar = [
  {
    number: 1,
    title: "To‘liq montaj xizmati",
    text: "Gazobloklarni asosdan tomgacha o‘rnatish",
  },
  {
    number: 2,
    title: "Professional ustalar",
    text: "Tajribali va o‘qitilgan quruvchilar jamoasi",
  },
  {
    number: 3,
    title: "Yupqa tikuvli texnologiya",
    text: "Maxsus elim yordamida issiqlik yo‘qotilishini kamaytiruvchi montaj",
  },
  {
    number: 4,
    title: "Aniq va tekis devorlar",
    text: "Keyinchalik suvoqni minimallashtiradi",
  },
];

const Gazablokmantaji = () => {
  return (
    <div className="mantaj">
      <div className="mantaj__img">
        <Image src={mantaj} alt="mantak" />
      </div>
      <p className="mantaj__text">
        Gazobloklar bilan qurilish qilayotgan bo‘lsangiz, sifatli montaj – bu
        mustahkam va issiqlikni ushlab turuvchi devorning asosi. Biz sizga faqat
        mahsulotni emas, balki tayyor yechimni taklif qilamiz — ya’ni tajribali
        mutaxassislar tomonidan bajariladigan gazoblok o‘rnatish xizmatini.
      </p>
      <div className="taklif">
        <h3>Nimalarni taklif qilamiz:</h3>
        <ul>
          {takliflar.map((item) => (
            <li key={item.number} className="taklif__item">
              <div className="taklif__circle">{item.number}</div>
              <div className="taklif__content">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="foydali">
        <h3>Kimlar uchun foydali:</h3>
        <ul>
          <li>Uy qurayotganlar;</li>
          <li>Qurilish firmalari uchun subpudrat xizmat.</li>
        </ul>
        <p>
          Qurilish sifati siz tanlagan ustalarga bog‘liq. Biz bilan ishlang —
          ishonchli natijani kafolatlaymiz.
        </p>
        <strong>
          Hoziroq bog‘laning va professional montaj xizmatimizga buyurtma
          bering!
        </strong>
        <Button title={"Biz bilan bog’lanish"} />
      </div>
    </div>
  );
};

export default Gazablokmantaji;
