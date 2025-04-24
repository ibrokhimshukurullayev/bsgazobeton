import React from "react";
import Image from "next/image";
import "./about.scss";
import sertifikat from "../../../assets/images/sertifikat.png";
import Title from "../../../components/title/Title";

const AboutSertifikat = () => {
  return (
    <div className="aboutSertifikat">
      <Title
        title={"“BS gazobeton”"}
        text={
          " mahsulotlari barcha zaruriy sertifikatlarga ega bo‘lib, standartlarga javob beradi. Quyidagi sertikat va litsenziyalarga ega:"
        }
      />
      <div className="aboutSertifikat__box">
        <div className="aboutSertifikat__card">
          <Image src={sertifikat} alt="setifikat" />
          <h3 className="aboutSertifikat__card__title">
            Muvofiqlik sertifikati
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutSertifikat;
