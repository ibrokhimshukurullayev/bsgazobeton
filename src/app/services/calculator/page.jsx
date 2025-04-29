"use client";

import { useState } from "react";
import "./services.scss";

const Calculator = () => {
  const [uzunlik, setUzunlik] = useState("");
  const [balandlik, setBalandlik] = useState("");
  const [qalinlik, setQalinlik] = useState("100");
  const [natija, setNatija] = useState({ dona: 0, hajm: 0 });

  const handleSubmit = () => {
    const u = parseFloat(uzunlik);
    const b = parseFloat(balandlik);
    const q = parseFloat(qalinlik) / 1000;

    if (!u || !b || !q) return;

    const hajm = (u * b * q).toFixed(2);
    const blokHajmi = 0.6 * 0.3 * 0.2; // gazoblok hajmi
    const dona = Math.ceil((u * b * q) / blokHajmi);

    setNatija({ hajm, dona });
  };

  return (
    <div className="kalkulyator-container">
      <h2>KALKULYATOR</h2>
      <div className="form">
        <div className="input-group">
          <label htmlFor="">Devor uzunligi (m)</label>
          <div>
            <input
              type="number"
              placeholder="Devor uzunligi"
              value={uzunlik}
              onChange={(e) => setUzunlik(e.target.value)}
            />
            <span>m</span>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="">Devor balandligi (m)</label>
          <div>
            <input
              type="number"
              placeholder="Devor balandligi"
              value={balandlik}
              onChange={(e) => setBalandlik(e.target.value)}
            />
            <span>m</span>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="">Devor qalinligi (mm)</label>

          <select
            value={qalinlik}
            onChange={(e) => setQalinlik(e.target.value)}
          >
            <option value="100">100 mm</option>
            <option value="150">150 mm</option>
            <option value="200">200 mm</option>
            <option value="250">250 mm</option>
            <option value="300">300 mm</option>
          </select>
        </div>
      </div>
      <div className="form__button">
        <button onClick={handleSubmit}>HISOBLASH</button>
      </div>

      <div className="result">
        <h4>Natija</h4>
        <p>
          Kerakli gazobloklar soni: <strong>{natija.dona}</strong> dona
        </p>
        <p>
          Umumiy hajmi: <strong>{natija.hajm}</strong> m³
        </p>
      </div>
    </div>
  );
};

export default Calculator;
