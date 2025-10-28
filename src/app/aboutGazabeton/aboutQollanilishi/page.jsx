import React from "react";
import Image from "next/image";
import uy1 from "../../../assets/images/uy1.png";
import uy2 from "../../../assets/images/uy2.png";
import uy3 from "../../../assets/images/uy3.png";
import uy4 from "../../../assets/images/uy4.png";
import uy5 from "../../../assets/images/uy5.png";

import "./about.scss";

export const metadata = {
  title: "Gazobetonning qo‘llanilish joylari | BS Gazobeton",
  description: "O‘zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const steps = [
  {
    id: 1,
    title: "Turar-joy binolari",
    description:
      "Uy-joy qurilishida tashqi va ichki devor materiali sifatida ishlatiladi",
    image: uy1,
  },
  {
    id: 2,
    title: "Savdo va biznes markazlari",
    description:
      "Yirik tijorat obyektlarida issiqlik va ovoz izolyatsiyasi uchun qo‘llaniladi",
    image: uy2,
  },
  {
    id: 3,
    title: "Zavod va fabrikalar",
    description:
      "Sanoat binolarida mustahkam va yengil material sifatida ishlatiladi",
    image: uy3,
  },
  {
    id: 4,
    title: "Omborxona va sanoat markazlari",
    description:
      "Tez qurish va energiya tejash imkoniyatlari tufayli tanlanadi",
    image: uy4,
  },
  {
    id: 5,
    title: "Xususiy uy-joy qurilishi",
    description:
      "Gazobetonning ishlov berish qulayligi va yengilligi xususiy uy qurilishida afzal qiladi",
    image: uy5,
  },
];

const AboutQollanilishi = () => {
  return (
    <div className="timeline-wrapper">
      <h2 className="timeline-heading">
        Gazobeton turli xil qurilish obyektlarida qo‘llaniladi:
      </h2>
      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-step" key={step.id}>
            <div className="timeline-left">
              <div className="circle">{step.id}</div>
              {index !== steps.length - 1 && <div className="line" />}
            </div>
            <div className="timeline-content">
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <Image
                src={step.image}
                alt={step.title}
                width={494}
                height={265}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutQollanilishi;
