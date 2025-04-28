import React from "react";
import Image from "next/image";
import "./empty.scss";

import karzinka from "../../../../assets/images/karzinka.png";

const Empty = () => {
  return (
    <div className="empty container">
      <h2 className="empty__title">Savatcha</h2>
      <div className="empty__card">
        <Image src={karzinka} alt="karzinka" />
        <h3>Savatchangiz hozircha bo‘sh</h3>
        <p>
          Mahsulotlarni tanlab savatchaga qo‘shing va bu yerda ularni
          ko‘rishingiz mumkin.
        </p>
        <button>Mahsulotlar katalogi</button>
      </div>
    </div>
  );
};

export default Empty;
