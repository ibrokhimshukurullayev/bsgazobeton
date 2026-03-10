"use client";
import React from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import "./compareBar.scss";
import { useTranslation } from "react-i18next";

const CompareBar = () => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="compare__bar">
      <div className="container bar">
        <p>{t("taqqoslash.title1")}</p>
        <Link href="/compare" className="compare__btn">
          {t("taqqoslash.title2")} →
        </Link>
      </div>
    </div>
  );
};

export default CompareBar;
