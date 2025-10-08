import React from "react";
import "./orderDetailes.scss";
import left from "../../assets/images/left.svg";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const OrderDetailes = ({ order, onBack }) => {
  const { t, i18n } = useTranslation("global");

  return (
    <div className="order__content">
      <button className="oreder__back__btn" onClick={onBack}>
        <Image src={left} alt="back" />
        {t("orderss.back")}
      </button>

      <h2 className="order__content__title">
        {t("orderss.id")}: #{order?.ordernumber || order?.orderNumber}
      </h2>

      {/* Yuqori qism */}
      <div className="order__content__info">
        <div className="order__content__left">
          <p>
            <span>{t("orderss.date")}:</span>
            {order?.orderdate
              ? new Date(order.orderdate).toLocaleString("uz-UZ")
              : "—"}
          </p>
          <p>
            <span>{t("orderss.total")}:</span>{" "}
            {(Number(order?.totalprice) || 0).toLocaleString()} UZS
          </p>
        </div>

        <div className="order__content__right">
          <div className="order__content__right__status">
            <span className="order__content__right__status__label">
              {t("orderss.status")}:
            </span>
            <span className="order__content__right__status__new">
              {order?.status}
            </span>
          </div>
          <p>
            <span>{t("orderss.address")}:</span> {order?.address || "—"}
          </p>
        </div>
      </div>

      <div className="order__content__products">
        {(order?.orderitems || []).map((item, idx) => (
          <div className="order__content__product" key={idx}>
            <Image
              src={`https://api.bsgazobeton.uz${item?.imageurl}`}
              alt={item?.productname}
              width={80}
              height={80}
            />
            <div className="product-info">
              <div className="product-info__title">
                <h4>{item?.productname}</h4>
              </div>
              <p className="product__text">
                {(Number(item?.price) || 0).toLocaleString()}{" "}
                {t("header.priceUnit")}/{item?.unit}
              </p>
              <p className="product__text">
                {item?.quantity} {item?.unit}
              </p>
            </div>
            <div className="product-price">
              {(Number(item?.totalprice) || 0).toLocaleString()}{" "}
              {t("header.priceUnit")}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetailes;
