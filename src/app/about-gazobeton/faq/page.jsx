"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import "./about.scss";

// export const metadata = {
//   title: "Kop beriladigan savollar | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const AboutFaq = () => {
  const [openId, setOpenId] = useState(1);
  const [t, i18n] = useTranslation("global");

  const faqData = [
    {
      id: 1,
      question: t("1.question"),
      answer: t("1.answer"),
    },
    {
      id: 2,
      question: t("2.question"),
      answer: t("2.answer"),
    },
    {
      id: 3,
      question: t("3.question"),
      answer: t("3.answer"),
    },
    {
      id: 4,
      question: t("4.question"),
      answer: t("4.answer"),
    },
    {
      id: 5,
      question: t("5.question"),
      answer: t("5.answer"),
    },
    {
      id: 6,
      question: t("6.question"),
      answer: t("6.answer"),
    },
    {
      id: 7,
      question: t("7.question"),
      answer: t("7.answer"),
    },
    {
      id: 8,
      question: t("8.question"),
      answer: t("8.answer"),
    },
    {
      id: 9,
      question: t("9.question"),
      answer: t("9.answer"),
    },
  ];

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };
  return (
    <div className="faqallsss">
      <div className="faqalls">
        {faqData.map((item) => (
          <div
            key={item.id}
            className={`faq__item ${openId === item.id ? "active" : ""}`}
          >
            <div className="faq__question" onClick={() => toggleFaq(item.id)}>
              <span>
                {item.id}. {item.question}
              </span>
              <span className="faq__icon">
                {openId === item.id ? "×" : "+"}
              </span>
            </div>
            {openId === item.id && (
              <div className="faq__answer">{item.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutFaq;
