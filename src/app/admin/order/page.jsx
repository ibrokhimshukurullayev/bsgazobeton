import React from "react";
import "./order.scss";

const Order = () => {
  return (
    <div className="order">
      <div className="order__box">
        <div className="order__card">
          <div className="order__card__header">
            <h3 className="order__card__header__id">#123312</h3>
            <p className="order__card__header__price">30 000 000 UZS</p>
          </div>
          <div className="order__card1">
            <p className="order__card__date">24 fevral 2025, 09:12</p>
            <h2 className="order__card__text">Yangi</h2>
          </div>
          <button>Batafsil</button>
        </div>
      </div>
    </div>
  );
};

export default Order;
