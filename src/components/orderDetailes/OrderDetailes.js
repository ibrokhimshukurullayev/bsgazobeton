import React from "react";
import "./orderDetailes.scss";
import left from "../../assets/images/left.svg";
import panel from "../../assets/images/panel.png";
import Image from "next/image";

const OrderDetailes = () => {
  return (
    <div className="order__content">
      <button className="oreder__back__btn">
        <Image src={left} />
        Ortga qaytish
      </button>
      <h2 className="order__content__title">Buyurtma ID: #123312</h2>
      <div className="order__content__info">
        <div className="order__content__left">
          <p>
            <span>Buyurtma sanasi:</span> 24 fevral 2025, 09:12
          </p>
          <p>
            <span>Umumiy summa:</span> 30 000 000 UZS
          </p>
          <p>
            <span>Hudud:</span> Toshkent sh.
          </p>
        </div>
        <div className="order__content__right">
          <div className="order__content__right__status">
            <span className="order__content__right__status__label">Holat:</span>
            <span className="order__content__right__status__new">YANGI</span>
          </div>
          <p>
            <span>Qo‘shimcha:</span> Yetkazib berish
          </p>
          <p>
            <span>Manzil:</span> Uchtepa 26-26-35, Olmos Building
          </p>
        </div>
      </div>
      {/* Mahsulotlar */}
      <div className="order__content__products">
        {[1, 2, 3].map((item) => (
          <div className="order__content__product" key={item}>
            <Image src={panel} alt="panel" />
            <div className="product-info">
              <div className="product-info__title">
                <h4>Gazobeton</h4>
                <p>D300, 600×200×200</p>
              </div>
              <p className="product__text">72 000 UZS/m³</p>
              <p className="product__text">3 m³</p>
            </div>
            <div className="product-price">216 000 UZS</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailes;
