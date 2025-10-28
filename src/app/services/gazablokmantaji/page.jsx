"use client";

import React from "react";
import "./services.scss";
import Image from "next/image";
import mantaj from "../../../assets/images/mantaj.png";
import Button from "../../../components/button/Button";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

// export const metadata = {
//   title: "Gazoblok montaji | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const Gazablokmantaji = () => {
  const router = useRouter();

  const [t, i18n] = useTranslation("global");
  const handleButtonClick = () => {
    router.push("/joylashuv");
  };

  const takliflar = [
    {
      number: 1,
      title: t("gazoblockinfo.section1item1title"),
      text: t("gazoblockinfo.section1item1text"),
    },
    {
      number: 2,
      title: t("gazoblockinfo.section1item2title"),
      text: t("gazoblockinfo.section1item2text"),
    },
    {
      number: 3,
      title: t("gazoblockinfo.section1item3title"),
      text: t("gazoblockinfo.section1item3text"),
    },
    {
      number: 4,
      title: t("gazoblockinfo.section1item4title"),
      text: t("gazoblockinfo.section1item3text"),
    },
  ];
  return (
    <div className="mantaj">
      <div className="mantaj__img">
        <Image src={mantaj} alt="mantak" />
      </div>
      <p className="mantaj__text">{t("gazoblockinfo.title")}</p>
      <div className="taklif">
        <h3>{t("gazoblockinfo.section1title")}</h3>
        <ul>
          {takliflar.map((item) => (
            <li key={item.number} className="taklif__item">
              <div className="taklif__circle">{item.number}</div>
              <div className="taklif__content">
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="foydali">
        <h3>{t("gazoblockinfo.title2")}</h3>
        <ul>
          <li>{t("gazoblockinfo.text1")}</li>
          <li>{t("gazoblockinfo.text2")}</li>
        </ul>
        <p>{t("gazoblockinfo.bottomtext")}</p>
        <strong>{t("gazoblockinfo.bottomtext2")}</strong>
        <Button onClick={handleButtonClick} title={t("gazoblockinfo.button")} />
      </div>
    </div>
  );
};

export default Gazablokmantaji;
