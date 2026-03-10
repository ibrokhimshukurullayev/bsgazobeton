"use client";

import React, { useEffect, useState } from "react";
import CatalogGazobetonHeaderLink from "./_components/catalog-header-link/CatalogGazobetonHeaderLink";
import Card from "../../components/card/Card";
import CompareBar from "../../components/compare/CompareBar";
import { useTranslation } from "react-i18next";

const CatalogClient = () => {
  const { t } = useTranslation("global");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <div>
      <CatalogGazobetonHeaderLink title={t("header.catalog")} />
      {!isMobile && <CompareBar />}
      <div className="container">
        <Card />
      </div>
    </div>
  );
};

export default CatalogClient;
