"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
            <h3 className="calculte__header__title">Kalkulyator</h3>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="order__form">
            <div className="order__form__info">
              <label className="form__group__label">Devor uzunligi (m)</label>
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
              <label className="form__group__label">Devor balandligi (m)</label>
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
                Eshik va deraza maydoni (m²)
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
              <label className="form__group__label">Devor qalinligi (mm)</label>
              <select
                className="form__group__input form__select"
                value={thickness}
                onChange={(e) => setThickness(Number(e.target.value))}
              >
                <option value="50">50mm</option>
                <option value="100">100mm</option>
                <option value="125">125mm</option>
                <option value="150">150mm</option>
                <option value="200">200mm</option>
                <option value="250">250mm</option>
                <option value="300">300mm</option>
                <option value="350">350mm</option>
                <option value="400">400mm</option>
              </select>
              <Image
                className="order__form__info__img"
                src={arrow}
                alt="arrow"
              />
            </div>

            <button type="submit" className="form__button">
              Hisoblash
            </button>
          </form>

          {/* Natija */}
          <div className="calculate__end">
            <h3 className="calculate__end__title">Natija</h3>
            <p className="calculate__end__text">
              Kerakli gazobloklar soni:{" "}
              <strong>{natija.dona ? `${natija.dona} dona` : "0 dona"}</strong>
            </p>
            <p className="calculate__end__text">
              Umumiy hajmi:{" "}
              <strong>{natija.hajm ? `${natija.hajm} m³` : "0 m³"}</strong>
            </p>
            <p className="calculate__end__text">
              Paddon soni:{" "}
              <strong>
                {natija.paddon ? `${natija.paddon} dona` : "0 dona"}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculate;
