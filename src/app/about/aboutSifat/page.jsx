import React from "react";
import "./aboutSifat.scss";
import Carusel from "../../../components/carusel/Carusel";
import Image from "next/image";
import labaratoriya from "../../../assets/images/labaratoriya.png";
import Title from "../../../components/title/Title";

const steps = [
  {
    id: 1,
    title: "Xomashyo tekshiruvi",
    description:
      "Har bir komponent kimyoviy va fizik xususiyatlari bo‘yicha sinovdan o‘tkaziladi.",
    image: labaratoriya,
  },
  {
    id: 2,
    title: "Ishlab chiqarish jarayonidagi nazorat",
    description:
      "Har bir bosqich zamonaviy texnologiyalar asosida nazorat qilinadi. Mutaxassislar ishlab chiqarish jarayonini doimiy ravishda kuzatib boradilar.",
    image: labaratoriya,
  },
  {
    id: 3,
    title: "Mahsulot tayyor bo‘lgandagi tekshiruv",
    description:
      "Gazobetonning muhim ko‘rsatkichlari maxsus laboratoriyada sinovdan o‘tkaziladi.",
    image: labaratoriya,
  },
  {
    id: 4,
    title: "Sertifikatlashtirish",
    description:
      "Har bir mahsulot belgilangan standartlarga muvofiqligini tasdiqlovchi sertifikatlarga ega bo‘ladi.",
    image: labaratoriya,
  },
];

const AboutSifat = () => {
  return (
    <div id="aboutSifat">
      <Title
        title={"BS gazobeton"}
        text={
          "kompaniyasi o‘z mahsulotlarining sifatini ta'minlash uchun sifat nazorati tizimiga ega. Har bir ishlab chiqarilgan mahsulot qat'iy tekshiruvlardan o‘tkaziladi va standartlarga mos kelishini kafolatlaydi."
        }
      />
      <div className="timeline-wrapper">
        <h2 className="timeline-heading">Sifat nazorati jarayonlari</h2>
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
      <div className="aboutSifat__carusel">
        <h3>Bizning laboratoriyamiz</h3>
        <Carusel />
        <p>
          Bizning laboratoriya mutaxassislarimiz har bir mahsulotning sifatini
          kafolatlash uchun muntazam ravishda tekshiruv jarayonlarini olib
          borishadi.
        </p>
        <p>
          “BS gazobeton” kompaniyasi sifat nazorati tizimiga doimiy ravishda
          e'tibor qaratib, qurilish industriyasida yuqori standartlarga javob
          beruvchi mahsulotlarni ishlab chiqarishda davom etmoqda.
        </p>
      </div>
    </div>
  );
};

export default AboutSifat;
