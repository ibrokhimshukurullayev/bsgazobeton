"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import arrow from "../../../assets/images/arrow.svg";
import "./services.scss";
import Image from "next/image";

const Calculator = () => {
  const [length, setLength] = useState();
  const [holeOfDoorAndWindowArea, setHoleOfDoorAndWindowArea] = useState(null);
  const [height, setHeight] = useState("");
  const [thickness, setThickness] = useState(50);
  const [natija, setNatija] = useState({ dona: 0, hajm: 0, paddon: 0 });
  const [t, i18n] = useTranslation("global");

  const handleSubmit = () => {
    const thicknessInMeter = thickness / 1000;

    if (!length || !height || !thicknessInMeter) return;

    const hajm = (length * height - holeOfDoorAndWindowArea) * thicknessInMeter; // umumiy hajm (float)
    const hajmFixed = hajm.toFixed(2);

    const blokHajmi = 0.6 * 0.3 * 0.2;
    const dona = Math.ceil(hajm / blokHajmi);

    // Paddon hisoblash (1 paddon = 2.16 m³)
    const paddon = Math.ceil(hajm / 2.16);

    setNatija({ hajm: hajmFixed, dona, paddon });
  };

  return (
    <div className="kalkulyator-container">
      <h2>{t("calculator.title")}</h2>
      <div className="form">
        <div className="input-group">
          <label>{t("calculator.lengthLabel")}</label>
          <div>
            <input
              type="number"
              placeholder="0"
              value={length ?? ""} // if null → show empty string
              onChange={(e) => {
                const value = e.target.value;
                setLength(value ? Number(value) : null);
              }}
            />
            <span className="span">m</span>
          </div>
        </div>

        <div className="input-group">
          <label>{t("calculator.heightLabel")}</label>
          <div>
            <input
              type="number"
              placeholder="0"
              value={height ?? ""} // if null → show empty string
              onChange={(e) => {
                const value = e.target.value;
                setHeight(value ? Number(value) : null);
              }}
            />
            <span className="span">m</span>
          </div>
        </div>

        <div className="input-group select-group">
          <label>{t("calculator.thicknessLabel")}</label>
          <div className="select-wrapper">
            <select
              value={thickness ?? 50} // if null → show 50
              onChange={(e) => {
                const value = e.target.value;
                setThickness(value ? Number(value) : null);
              }}
            >
              <option value="50">50 mm</option>
              <option value="100">100 mm</option>
              <option value="125">125 mm</option>
              <option value="150">150 mm</option>
              <option value="200">200 mm</option>
              <option value="250">250 mm</option>
              <option value="300">300 mm</option>
              <option value="350">350 mm</option>
              <option value="400">400 mm</option>
            </select>
            <Image src={arrow} alt="arrow" className="custom-arrow" />
          </div>
        </div>

        <div className="input-group ">
          <label>{t("calculator.thickness")} (m²)</label>
          <div className="selects">
            <input
              type="number"
              placeholder="0"
              value={holeOfDoorAndWindowArea ?? ""} // if null → show empty string
              onChange={(e) => {
                const value = e.target.value;
                setHoleOfDoorAndWindowArea(value ? Number(value) : null);
              }}
            />
            <span className="spans">m²</span>
          </div>
        </div>
      </div>

      <div className="form__button">
        <button onClick={handleSubmit}>
          {t("calculator.calculateButton")}
        </button>
      </div>

      <div className="result">
        <h4>{t("calculator.resultTitle")}</h4>
        <p>
          {t("calculator.blockCount")} <strong>{natija.dona} dona</strong>
        </p>
        <p>
          {t("calculator.volume")} <strong>{natija.hajm} m³</strong>
        </p>
        <p>
          {t("calculator.palletCount")}: <strong>{natija.paddon} dona</strong>
        </p>
      </div>
    </div>
  );
};

export default Calculator;
