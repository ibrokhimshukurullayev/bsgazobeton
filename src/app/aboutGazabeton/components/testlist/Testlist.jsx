"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import "./testlist.scss";

export const TestList = () => {
  const [t, i18n] = useTranslation("global");
  const tests = [
    {
      number: 1,
      title: t("sinovtestlar.cardtitle1"),
      description: t("sinovtestlar.cardlist1"),
    },
    {
      number: 2,
      title: t("sinovtestlar.cardtitle2"),
      description: t("sinovtestlar.cardlist2"),
    },
    {
      number: 3,
      title: t("sinovtestlar.cardtitle3"),
      description: t("sinovtestlar.cardlist3"),
    },
    {
      number: 4,
      title: t("sinovtestlar.cardtitle4"),
      description: t("sinovtestlar.cardlist3"),
    },
    {
      number: 5,
      title: t("sinovtestlar.cardtitle5"),
      description: t("sinovtestlar.cardlist4"),
    },
  ];
  return (
    <div className="testlist">
      {tests.map((test) => (
        <div className="testlist__item" key={test.number}>
          <div className="testlist__number">{test.number}</div>
          <div className="testlist__content">
            <h4 className="testlist__title">{test.title}</h4>
            <p className="testlist__desc">{test.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
