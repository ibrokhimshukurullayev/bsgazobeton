import React from "react";
import "./orderDetailes.scss";
import left from "../../assets/images/left.svg";
import panel from "../../assets/images/panel.png";
import Image from "next/image";

const OrderDetailes = ({ order, onBack }) => {
  return (
    <div className="order__content">
      <button className="oreder__back__btn" onClick={onBack}>
        <Image src={left} alt="back" />
        Ortga qaytish
      </button>

      <h2 className="order__content__title">
        Buyurtma ID: #{order?.ordernumber || order?.orderNumber}
      </h2>

      <div className="order__content__info">
        <div className="order__content__left">
          <p>
            <span>Buyurtma sanasi:</span>{" "}
            {order?.orderdate
              ? new Date(order.orderdate).toLocaleString("uz-UZ")
              : "—"}
          </p>
          <p>
            <span>Umumiy summa:</span>{" "}
            {(Number(order?.totalprice) || 0).toLocaleString()} UZS
          </p>
          <p>
            <span>Hudud:</span> {order?.region || "—"}
          </p>
        </div>

        <div className="order__content__right">
          <div className="order__content__right__status">
            <span className="order__content__right__status__label">Holat:</span>
            <span className="order__content__right__status__new">
              {order?.status}
            </span>
          </div>
          <p>
            <span>Qo‘shimcha:</span> {order?.extra || "—"}
          </p>
          <p>
            <span>Manzil:</span> {order?.address || "—"}
          </p>
        </div>
      </div>

      {/* Mahsulotlar */}
      <div className="order__content__products">
        {(order?.items || []).map((item, idx) => (
          <div className="order__content__product" key={idx}>
            <Image src={panel} alt="panel" />
            <div className="product-info">
              <div className="product-info__title">
                <h4>{item?.name}</h4>
                <p>{item?.desc}</p>
              </div>
              <p className="product__text">{item?.price} UZS/m³</p>
              <p className="product__text">{item?.quantity} m³</p>
            </div>
            <div className="product-price">{item?.total} UZS</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailes;
