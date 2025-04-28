import React from "react";
import Image from "next/image";
import "./aboutMijoz.scss";
import xonsaroy from "../../../assets/images/xonsaroy.png";
import ClientCarousel from "../../../components/clientCarousel/ClientCarousel";
import caricon from "../../../assets/images/caricon.png";
import Title from "../../../components/title/Title";

const AboutMijoz = () => {
  return (
    <div id="aboutMijoz">
      <Title
        title={"BS gazobeton"}
        text={
          "kompaniyasi qurilish industriyasida keng miqyosda hamkorlik aloqalarini yo‘lga qo‘ygan va O‘zbekiston bozorida ko'plab mijozlariga ega. Biz o‘z mijozlarimiz va hamkorlarimiz bilan o‘zaro manfaatli aloqalarni mustahkamlash va ularning biznes muvaffaqiyatiga hissa qo‘shish uchun doimiy ravishda ishlaymiz."
        }
      />
      <ClientCarousel />
      <div className="aboutMijoz__mijzolar">
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
        <div>
          <Image src={xonsaroy} alt="xonsaroy" />
        </div>
      </div>
      <div className="aboutMijoz__banner">
        <div className="aboutMijoz__hero">
          <h2>
            Agar siz ham ishonchli hamkor izlayotgan bo'lsangiz, biz bilan
            bog‘laning!
          </h2>
          <button>Biz bilan bog’lanish</button>
        </div>
        <div className="aboutMijoz__banner__end">
          <Image src={caricon} alt="carison" />
          <p>Mahsulotlarni butun O’zbekiston bo’ylab yetkazib beramiz!</p>
        </div>
      </div>
    </div>
  );
};

export default AboutMijoz;
