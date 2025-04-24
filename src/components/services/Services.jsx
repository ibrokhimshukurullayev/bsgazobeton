import React from "react";
import Image from "next/image";
import "./services.scss";

import xizmat1 from "../../assets/images/xizmat1.png";
import xizmat2 from "../../assets/images/xizmat2.png";
import xizmat3 from "../../assets/images/xizmat3.png";

const xizmatlar = [
  {
    id: 1,
    title: "Konsultatsiya",
    desc: "BS gazbetonlari va qo‘llash texnologiyasi bo‘yicha texnik maslahat oling.",
    button: "KONSULTATSIYA OLISH",
    image: xizmat1,
    type: "konsultatsiya",
  },
  {
    id: 2,
    title: "Gazoblok montaji",
    desc: "Gazobloklarni to‘g‘ri o‘rnatish qurilishni mustahkamligini va uzoq xizmat qilishini ta’minlaydi.",
    button: "XIZMAT HAQIDA BATAFSIL",
    image: xizmat2,
    type: "montaj",
  },
  {
    id: 3,
    title: "Gazobloklar sonini bilasizmi?",
    desc: "Loyihangiz uchun kerakli gazoblok miqdori va narxini onlayn hisoblang!",
    button: "HISOBLASH",
    image: xizmat3,
    type: "hisoblash",
  },
];

const Services = () => {
  return (
    <div id="services">
      <div className="container services">
        <h2 className="services__title">Xizmatlar</h2>
        <div className="services__list">
          {xizmatlar.map((item) => (
            <div className={`services__card ${item.type}`} key={item.id}>
              <div className="services__content">
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </div>
              <button>{item.button}</button>
              <Image
                src={item.image}
                alt={item.title}
                width={410}
                height={560}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
