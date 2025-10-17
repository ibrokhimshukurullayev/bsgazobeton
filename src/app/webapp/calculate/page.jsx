"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useTranslation } from "react-i18next";

import Image from "next/image";
import left from "../../../assets/images/webappImages/left.svg";
import arrow from "../../../assets/images/webappImages/arrov.svg";
import "./calculate.scss";
import "../page.scss"; // bu yerda sening calculate.css, input.css, button.css lar birlashtirilgan

const Calculate = () => {
  const [length, setLength] = useState(null);
  const [height, setHeight] = useState(null);
  const [holeArea, setHoleArea] = useState(null); // eshik va deraza joyi
  const [thickness, setThickness] = useState(50);
  const [natija, setNatija] = useState({ dona: 0, hajm: 0, paddon: 0 });
  const [t, i18n] = useTranslation("global");

  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();

    const thicknessInMeter = thickness / 1000;

    if (!length || !height || !thicknessInMeter) return;

    const hajm = (length * height - (holeArea || 0)) * thicknessInMeter;
    const hajmFixed = hajm.toFixed(2);

    const blokHajmi = 0.6 * 0.3 * 0.2;
    const dona = Math.ceil(hajm / blokHajmi);
    const paddon = Math.ceil(hajm / 2.16);

    setNatija({ hajm: hajmFixed, dona, paddon });
  };

  return (
    <div id="calculate">
      <div className="container">
        <div className="calculate">
          {/* Header */}
          <div className="calculte__header">
            <h3 className="calculte__header__title">{t("calculator.title")}</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="order__form">
            <div className="order__form__info">
              <label className="form__group__label">
                {t("calculator.lengthLabel")}
              </label>
              <input
                className="form__group__input"
                type="number"
                placeholder="0"
                value={length ?? ""}
                onChange={(e) =>
                  setLength(e.target.value ? Number(e.target.value) : null)
                }
              />
            </div>

            <div className="order__form__info">
              <label className="form__group__label">
                {t("calculator.heightLabel")}
              </label>
              <input
                className="form__group__input"
                type="number"
                placeholder="0"
                value={height ?? ""}
                onChange={(e) =>
                  setHeight(e.target.value ? Number(e.target.value) : null)
                }
              />
            </div>

            <div className="order__form__info">
              <label className="form__group__label">
                {t("calculator.thickness")} ({t("units.m2")})
              </label>
              <input
                className="form__group__input"
                type="number"
                placeholder="0"
                value={holeArea ?? ""}
                onChange={(e) =>
                  setHoleArea(e.target.value ? Number(e.target.value) : null)
                }
              />
            </div>

            <div className="order__form__info form__select__hudud">
              <label className="form__group__label">
                {t("calculator.thicknessLabel")}
              </label>
              <select
                className="form__group__input form__select"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
              >
                <option value="50">50 {t("units.mm")}</option>
                <option value="100">100 {t("units.mm")}</option>
                <option value="125">125 {t("units.mm")}</option>
                <option value="150">150 {t("units.mm")}</option>
                <option value="200">200 {t("units.mm")}</option>
                <option value="250">250 {t("units.mm")}</option>
                <option value="300">300 {t("units.mm")}</option>
                <option value="350">350 {t("units.mm")}</option>
                <option value="400">400 {t("units.mm")}</option>
              </select>
              <Image
                className="order__form__info__img"
                src={arrow}
                alt="arrow"
              />
            </div>

            <button type="submit" className="form__button">
              {t("calculator.calculateButton")}
            </button>
          </form>

          {/* Natija */}
          <div className="calculate__end">
            <h3 className="calculate__end__title">
              {t("calculator.resultTitle")}
            </h3>
            <p className="calculate__end__text">
              {t("calculator.blockCount")}{" "}
              <strong>
                {natija.dona} {t("units.piece")}
              </strong>
            </p>
            <p className="calculate__end__text">
              {t("calculator.volume")}{" "}
              <strong>
                {natija.hajm} {t("units.m3")}
              </strong>
            </p>
            <p className="calculate__end__text">
              {t("calculator.palletCount")}:{" "}
              <strong>
                {natija.paddon} {t("units.piece")}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
