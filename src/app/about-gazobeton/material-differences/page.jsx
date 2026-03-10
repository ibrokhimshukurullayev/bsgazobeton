"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "./about.scss";
import gazabetom from "../../../assets/images/gazabtonimg.png";
import gisht from "../../../assets/images/gisht.png";
import peneblok from "../../../assets/images/peneblok.png";
import beton from "../../../assets/images/beton.png";
import Title from "../../../components/title/Title";

const ROW_KEYS = [
  "weight",
  "thermalInsulation",
  "soundInsulation",
  "workability",
  "constructionSpeed",
  "fireResistance",
  "breathability",
  "environmentalSafety",
  "price",
];

const AboutMaterillardanFarqi = () => {
  const [t] = useTranslation("global");

  const data = ROW_KEYS.map((rowKey) => ({
    name: t(`aboutGazobetonMaterialDifferences.rows.${rowKey}.name`),
    gazobeton: t(
      `aboutGazobetonMaterialDifferences.rows.${rowKey}.gazobeton`
    ),
    gisht: t(`aboutGazobetonMaterialDifferences.rows.${rowKey}.brick`),
    penobeton: t(
      `aboutGazobetonMaterialDifferences.rows.${rowKey}.foamConcrete`
    ),
    betonBlok: t(
      `aboutGazobetonMaterialDifferences.rows.${rowKey}.concreteBlock`
    ),
  }));

  return (
    <div>
      <Title
        title={t("aboutGazobetonMaterialDifferences.title")}
        text={t("aboutGazobetonMaterialDifferences.text")}
      />
      <div className="table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>{t("aboutGazobetonMaterialDifferences.tableHeaders.features")}</th>
              <th>
                <Image src={gazabetom} alt="gazobeton" />
                <br />
                {t("aboutGazobetonMaterialDifferences.tableHeaders.gazobeton")}
              </th>
              <th>
                <Image src={gisht} alt="brick" />
                <br />
                {t("aboutGazobetonMaterialDifferences.tableHeaders.brick")}
              </th>
              <th>
                <Image src={peneblok} alt="foam concrete" />
                <br />
                {t("aboutGazobetonMaterialDifferences.tableHeaders.foamConcrete")}
              </th>
              <th>
                <Image src={beton} alt="concrete block" />
                <br />
                {t("aboutGazobetonMaterialDifferences.tableHeaders.concreteBlock")}
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                <td>{row.name}</td>
                <td>{row.gazobeton}</td>
                <td>{row.gisht}</td>
                <td>{row.penobeton}</td>
                <td>{row.betonBlok}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AboutMaterillardanFarqi;
