"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "./about.scss";
import Title from "../../../components/title/Title";
import sertifikat1 from "../../../assets/images/sertikifat1.png";
import sertifikat2 from "../../../assets/images/sertifikat2.png";

const AboutSertifikat = () => {
  const [t] = useTranslation("global");

  return (
    <div className="aboutSertifikat">
      <Title
        title={t("aboutGazobetonCertificates.title")}
        text={t("aboutGazobetonCertificates.text")}
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
          <h3 className="aboutSertifikat__card__title">
            {t("aboutGazobetonCertificates.certificate1")}
          </h3>
        </div>
        <div className="aboutSertifikat__card">
          <a href="/files/LABARATORIYA XULOSASI.pdf" download>
            <Image
              src={sertifikat2}
              alt="sertifikat"
              width={260}
              height={300}
            />
          </a>
          <h3 className="aboutSertifikat__card__title">
            {t("aboutGazobetonCertificates.certificate2")}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default AboutSertifikat;
