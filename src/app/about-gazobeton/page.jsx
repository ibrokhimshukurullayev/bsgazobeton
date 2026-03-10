"use client";

import React from "react";
import { GazobetonAdvantages } from "./_components/gazobeton-advantages/GazobetonAdvantages";
import Title from "../../components/title/Title";
import { useTranslation } from "react-i18next";

const AboutGazobeton = () => {
  const [t] = useTranslation("global");

  return (
    <div className="aboutGazobeton__page">
      <Title title={t("about.title1")} text={t("about.title2")} />
      <GazobetonAdvantages />
    </div>
  );
};

export default AboutGazobeton;
