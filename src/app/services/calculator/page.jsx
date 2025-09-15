"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import arrow from "../../../assets/images/arrow.svg";
import "./services.scss";
import Image from "next/image";

const Calculator = () => {
  const [uzunlik, setUzunlik] = useState("");
  const [balandlik, setBalandlik] = useState("");
  const [qalinlik, setQalinlik] = useState("50");
  const [natija, setNatija] = useState({ dona: 0, hajm: 0, paddon: 0 });
  const [t, i18n] = useTranslation("global");

  const handleSubmit = () => {
    const u = parseFloat(uzunlik);
    const b = parseFloat(balandlik);
    const q = parseFloat(qalinlik) / 1000;

    if (!u || !b || !q) return;

    const hajm = u * b * q; // umumiy hajm (float)
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
              value={uzunlik}
              onChange={(e) => setUzunlik(e.target.value)}
            />
            <span>m</span>
          </div>
        </div>

        <div className="input-group">
          <label>{t("calculator.heightLabel")}</label>
          <div>
            <input
              type="number"
              value={balandlik}
              onChange={(e) => setBalandlik(e.target.value)}
            />
            <span>m</span>
          </div>
        </div>

        <div className="input-group select-group">
          <label>{t("calculator.thicknessLabel")}</label>
          <div className="select-wrapper">
            <select
              value={qalinlik}
              onChange={(e) => setQalinlik(e.target.value)}
            >
              <option value="50">50 mm</option>
              <option value="100">100 mm</option>
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
          Paddonlar soni: <strong>{natija.paddon} dona</strong>
        </p>
      </div>
    </div>
  );
};

export default Calculator;
