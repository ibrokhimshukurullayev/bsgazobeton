import React from "react";
import Image from "next/image";
import "./about.scss";
import Title from "../../../components/title/Title";
import sertifikat1 from "../../../assets/images/sertikifat1.png";
import sertifikat2 from "../../../assets/images/sertifikat2.png";

export const metadata = {
  title: "Sertifikat va litsenziyalar | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

const AboutSertifikat = () => {
  return (
    <div className="aboutSertifikat">
      <Title
        title={"“BS gazobeton”"}
        text={
          " mahsulotlari barcha zaruriy sertifikatlarga ega bo‘lib, standartlarga javob beradi. Quyidagi sertifikat va litsenziyalarga ega:"
        }
      />
      <div className="aboutSertifikat__box">
        <div className="aboutSertifikat__card">
          <a href="/files/SERTIFIKAT GAZABLOK.pdf" download>
            <Image
              src={sertifikat1}
              alt="sertifikat"
              width={260}
              height={300}
            />
          </a>
          <h3 className="aboutSertifikat__card__title">SERTIFIKAT GAZABLOK</h3>
        </div>
        <div className="aboutSertifikat__card">
          <a href="LABARATORIYA XULOSASI.pdf" download>
            <Image
              src={sertifikat2}
              alt="sertifikat"
              width={260}
              height={300}
            />
          </a>
          <h3 className="aboutSertifikat__card__title">
            LABARATORIYA XULOSASI
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutSertifikat;
