import React from "react";
import Image from "next/image";
import about1 from "../../assets/images/about1.png";
import "./about.scss";

const About = () => {
  return (
    <div id="about">
      <div className="about__start container">
        <div className="about__start__left">
          <h3>Biz haqimizda</h3>
        </div>
        <div className="about__start__right">
          <h2>
            <span>"BS gazobeton"</span> – O‘zbekiston bozorida yuqori sifatli
            gazobeton mahsulotlarini ishlab chiqaruvchi yetakchi kompaniyalardan
            biridir.
          </h2>
          <p>
            Kompaniya zamonaviy ishlab chiqarish zavodiga ega bo‘lib, eng ilg‘or
            texnologiyalar va yuqori sifat standartlariga javob beruvchi
            uskunalar bilan jihozlangan. Ishlab chiqarish liniyasi Yevropaning
            "Aircrete" kompaniyasi tomonidan yo'lga qo'yilgan. Ishlab chiqarish
            quvvati yiliga 450 000 kubometrni tashkil qiladi.
          </p>
          <button>Biz haqimizda</button>
        </div>
      </div>
      <div className="about__end container">
        <div className="about__end__left">
          <Image src={about1} />
          <h3>Sifat nazorati va laboratoriya</h3>
          <p>
            Har bir ishlab chiqarilgan mahsulot qat'iy tekshiruvlardan
            o‘tkaziladi va standartlarga mos kelishini kafolatlaydi.
          </p>
        </div>
        <div className="about__end__right">
          <iframe
            width="827"
            height="476"
            src="https://www.youtube.com/embed/G8KEoAb876A?si=NMGmUAex_Aq-3wnD"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;
