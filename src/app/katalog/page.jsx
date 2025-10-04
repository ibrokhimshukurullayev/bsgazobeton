"use client";
import React, { useEffect, useState } from "react";
import KatalogGazabetonHeaderLink from "./components/katalogHeaderLink/katalogGazabetonHeaderLink";
import Card from "../../components/card/Card";
import CompareBar from "../../components/compare/CompareBar";
import { useTranslation } from "react-i18next";

const Katalog = () => {
  const { t, i18n } = useTranslation("global");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768); // <768px bo‘lsa telefon
    };

    checkScreen(); // ilk renderda tekshir
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div>
      <KatalogGazabetonHeaderLink title={t("header.catalog")} />
      {/* faqat desktopda chiqadi */}
      {!isMobile && <CompareBar />}
      <div className="container">
        <Card />
      </div>
    </div>
  );
};

export default Katalog;
