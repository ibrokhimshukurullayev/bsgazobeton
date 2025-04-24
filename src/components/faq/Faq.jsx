"use client";
import React, { useState } from "react";
import "./faq.scss";
import FaqAll from "../faqAll/FaqAll";

const faqData = [
  {
    id: 1,
    question: "Gazobeton nima?",
    answer:
      "Gazobeton — bu yengil, g‘ovak tuzimli qurilish materiali bo‘lib, sement, qum, ohak va suv aralashmasidan tayyorlanadi. Ichidagi mayda pufakchalar uni issiqlikni saqlovchi va yengil qiladi.",
  },
  {
    id: 2,
    question: "Gazobeton devor issiq bo‘ladimi?",
    answer: "Ha, gazobeton yaxshi issiqlik izolyatsiyasiga ega.",
  },
  {
    id: 3,
    question: "Gazobeton devor yong‘inga chidamlimi?",
    answer: "Ha, u yong‘inga chidamli va xavfsiz material hisoblanadi.",
  },
  {
    id: 4,
    question: "Namlikdan shikastlanadimi?",
    answer: "To‘g‘ri o‘rnatilgan holatda u namlikdan himoyalangan bo‘ladi.",
  },
  {
    id: 5,
    question: "Uni qanday elim bilan birlashtirish kerak?",
    answer:
      "Maxsus gazobeton elimlari mavjud bo‘lib, ular bilan mustahkam tutashadi.",
  },
  {
    id: 6,
    question: "Uni oddiy arra bilan kesish mumkinmi?",
    answer: "Ha, uni maxsus yoki oddiy arra bilan osongina kesish mumkin.",
  },
  {
    id: 7,
    question: "Gazobeton ekologik tozami?",
    answer: "To‘liq tabiiy xom ashyolardan tayyorlangan va ekologik toza.",
  },
  {
    id: 8,
    question: "Uzoq muddat xizmat qiladimi?",
    answer: "To‘g‘ri parvarish qilinsa, gazobeton uzoq xizmat qiladi.",
  },
  {
    id: 9,
    question: "Ichki devorlar uchun ham mosmi?",
    answer: "Albatta, u ichki va tashqi devorlar uchun mos keladi.",
  },
];

const Faq = () => {
  const [openId, setOpenId] = useState(1);

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div id="faq">
      <div className="container faq">
        <div className="faq__left">
          <h2 className="faq__title">Ko‘p beriladigan savollar</h2>
          <div className="faq__box">
            <p>Savollaringiz qoldimi?</p>
            <button className="faq__button">Bepul konsultatsiya olish</button>
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
