"use client";

import React from "react";
import "./sotuv.scss";

import Image from "next/image";
import payme from "../../../assets/images/payme.png";
import click from "../../../assets/images/click.png";
import uzumbank from "../../../assets/images/uzumbank.png";
import uzumnasiya from "../../../assets/images/uzumnasiya.png";
import karta from "../../../assets/images/kartadan.png";
import bank from "../../../assets/images/bank.png";
import bolib from "../../../assets/images/bolib.png";
import naqd from "../../../assets/images/naqd.png";
import Title from "../../../components/title/Title";
import { useTranslation } from "react-i18next";

const TolovUsullari = () => {
  const [t, i18n] = useTranslation("global");

  const payments = [
    {
      title: t("paymentinfo.method1title"),
      description: t("paymentinfo.method1text"),
      icon: bank,
    },
    {
      title: t("paymentinfo.method2title"),
      description: t("paymentinfo.method2text"),
      icon: naqd,
    },
    {
      title: t("paymentinfo.method3title"),
      description: t("paymentinfo.method3text"),
      icon: karta,
      logos: [payme, click, uzumbank],
    },
    {
      title: t("paymentinfo.method4title"),
      description: t("paymentinfo.method4text"),
      icon: bolib,
      logos: [uzumnasiya],
    },
  ];

  return (
    <div>
      <Title text={t("paymentinfo.title")} />
      <div className="payment">
        {payments.map((method, index) => (
          <div key={index} className="payment-method">
            <Image src={method.icon} alt="icon" width={48} height={48} />
            <div className="payment-details">
              <h3>{method.title}</h3>
              <p>{method.description}</p>
              {method.logos && (
                <div className="payment-logos">
                  {method.logos.map((logo, i) => (
                    <Image
                      key={i}
                      src={logo}
                      alt="logo"
                      width={110}
                      height={41}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TolovUsullari;
