"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import "./services.scss";

import servicesnIstalation from "../../assets/images/services/services-instalation.webp";
import Button from "../../components/button/Button";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Mahsulot bo’yicha konsultatsiya | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const Services = () => {
  const router = useRouter();

  const [t, i18n] = useTranslation("global");
  const handleButtonClick = () => {
    router.push("/joylashuv");
  };

  return (
    <div className="services">
      <div className="services__img">
        <Image src={servicesnIstalation} alt="services" />
      </div>
      <h2>{t("consultationinfo.title")}</h2>
      <h2>{t("consultationinfo.subtitle")}</h2>
      <p>{t("consultationinfo.text")}</p>
      <h3>{t("consultationinfo.bottomtext")}</h3>
      <div className="services__end">
        <Button
          onClick={handleButtonClick}
          title={t("consultationinfo.button1")}
        />
        <button onClick={handleButtonClick} className="services__button">
          {t("consultationinfo.button2")}
        </button>
      </div>
    </div>
  );
};

export default Services;
