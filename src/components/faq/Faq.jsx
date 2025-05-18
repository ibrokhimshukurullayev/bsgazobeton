"use client";
import React, { useState } from "react";
import "./faq.scss";
import FaqAll from "../faqAll/FaqAll";
import { useTranslation } from "react-i18next";

const Faq = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="faq">
      <div className="container faq">
        <div className="faq__left">
          <h2 className="faq__title">{t("menu.gazobeton.faq")}</h2>
          <div className="faq__box">
            <p>{t("faq.title")}</p>
            <button className="faq__button">{t("faq.desc")}</button>
          </div>
        </div>

        <div className="faq__right">
          <FaqAll />
        </div>
      </div>
    </div>
  );
};

export default Faq;
