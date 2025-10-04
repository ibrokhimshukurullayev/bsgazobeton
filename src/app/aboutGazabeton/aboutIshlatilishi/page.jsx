"use client";
import React from "react";
import "./about.scss";
import pdf from "../../../assets/images/pdf.svg";
import Image from "next/image";
import img1 from "../../../assets/images/ishlatilishi/1.png";
import img2 from "../../../assets/images/ishlatilishi/2.png";
import img3 from "../../../assets/images/ishlatilishi/3.png";
import img4 from "../../../assets/images/ishlatilishi/4.png";
import img5 from "../../../assets/images/ishlatilishi/5.png";
import img6 from "../../../assets/images/ishlatilishi/8.png";
import img7 from "../../../assets/images/ishlatilishi/7.png";
import img8 from "../../../assets/images/ishlatilishi/6.png";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    img: img1,
    title: "1. Asosni tekis tayyorlang",
    desc: "Devorlar cho‘kmasligi uchun mustahkam va tekis asos bo‘lishi shart.",
  },
  {
    id: 2,
    img: img2,
    title: "2. Maxsus elimdan foydalaning",
    desc: "Oddiy sement emas, gazoblok uchun maxsus yupqa qatlamli yelim ishlating.",
  },
  {
    id: 3,
    img: img3,
    title: "3. Quruq holda o‘rnatin",
    desc: "Bloklarni namlamang – suv shimib, elim yopishmasligi mumkin.",
  },
  {
    id: 4,
    img: img4,
    title: "4. Armatura qatlamini qo‘shing",
    desc: "Har 3–4 qatordan keyin mustahkamlik uchun temir armatura qo‘shing.",
  },
  {
    id: 5,
    img: img5,
    title: "5. Maxsus arra bilan kesing",
    desc: "Silliq va aniq kesish uchun gazoblok arrasidan foydalaning.",
  },
  {
    id: 6,
    img: img6,
    title: "6. Choklar tekis bo‘lsin",
    desc: "Bloklar orasidagi elim qatlamı 2–3 mm dan oshmasligi kerak.",
  },
  {
    id: 7,
    img: img7,
    title: "7. Tashqi himoya qoplang",
    desc: "Suv o‘tkazmasligi uchun yuqori sifatli fasad qoplamasi bilan yoping.",
  },
  {
    id: 8,
    img: img8,
    title: "8. Qo‘shimcha izolyatsiya qiling",
    desc: "Sovuq hududlarda issiqlikni saqlash uchun izolyatsiya qilinishi tavsiya etiladi.",
  },
];

const AboutIshlatilishi = () => {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/joylashuv");
  };
  return (
    <div className="about-container">
      <div className="sidebar">
        <div className="download-section">
          <div className="pdf-info">
            <Image src={pdf} alt="PDF icon" />
            <div>
              <p>Gazoblok ishlatish bo‘yicha qo‘llanma</p>
              <span>1.2 MB, PDF</span>
            </div>
          </div>

          <a href="/files/instruksiya.pdf" download className="download-btn">
            YUKLAB OLISH
          </a>
        </div>

        <div className="consultation-box">
          <div className="consultation-box__card">
            <h2>Konsultatsiya</h2>
            <p>
              Ishni boshlashdan oldin qurilish mutaxassisi bilan maslahatlashish{" "}
              <br />
              foydali bo‘ladi.
            </p>
          </div>
          <button onClick={handleButtonClick} className="contact-btn">
            BIZ BILAN BOG‘LANISH
          </button>
        </div>
      </div>

      {/* Asosiy kontent qismi (hozircha bo‘sh) */}
      <div className="main-content">
        <h2>Gazobloklardan foydalanish bo‘yicha tavsiyalar</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step" key={step.id}>
              <Image src={step.img} alt={step.title} width={435} height={260} />
              <p>
                <strong>{step.title}</strong>
                <br />
                <span>{step.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutIshlatilishi;
