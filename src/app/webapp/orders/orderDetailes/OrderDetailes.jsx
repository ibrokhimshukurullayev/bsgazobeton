"use client";
import React from "react";
import Image from "next/image";
import "./orderDetailes.scss";
import { useTranslation } from "react-i18next";

export default function OrderDetailes({ order, onBack }) {
  const { t, i18n } = useTranslation("global");

  const products = order?.orderitems || [];
  const currentLang = i18n.language;

  const currency =
    currentLang === "ru" ? "сум" : currentLang === "en" ? "sum" : "so‘m";

  const getStatusLabel = (status) => {
    if (!status) return "—";
    const s = status.toLowerCase();
    if (currentLang === "ru") {
      if (s === "new") return "Новый";
      if (s === "processing") return "В обработке";
      if (s === "completed") return "Завершён";
      if (s === "canceled") return "Отменён";
    } else if (currentLang === "en") {
      if (s === "new") return "New";
      if (s === "processing") return "Processing";
      if (s === "completed") return "Completed";
      if (s === "canceled") return "Canceled";
    } else {
      if (s === "new") return "Yangi";
      if (s === "processing") return "Jarayonda";
      if (s === "completed") return "Tugallangan";
      if (s === "canceled") return "Bekor qilingan";
    }
    return status;
  };

  return (
    <div className="orderdetailes">
      <div className="container">
        <h3 className="orderdetailes__title">
          {t("ordersss.id")}:{" "}
          <strong>#{order?.ordernumber || order?.orderNumber}</strong>
        </h3>

        <div className="orderdetailes__info">
          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("ordersss.date")}:</p>
            <p className="orderdetailes__row__text">
              {order?.orderdate
                ? new Date(order.orderdate).toLocaleString(
                    currentLang === "ru"
                      ? "ru-RU"
                      : currentLang === "en"
                      ? "en-US"
                      : "uz-UZ"
                  )
                : "—"}
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("ordersss.status")}:</p>
            <p
              className={`orderdetailes__row__text orderdetailes__row__${order.status?.toLowerCase()}`}
            >
              {getStatusLabel(order.status)}
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("ordersss.total")}:</p>
            <p className="orderdetailes__row__text">
              {Number(order?.totalprice || 0).toLocaleString()} {currency}
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">
              {t("ordersss.address")}:
            </p>
            <p className="orderdetailes__row__text">{order?.address || "—"}</p>
          </div>
        </div>

        <h4 className="orderdetailes__list">{t("ordersss.products")}</h4>

        <div className="cart__box">
          {products.map((item, idx) => (
            <div className="cart__item" key={idx}>
              <Image
                className="cart__item__img"
                src={
                  item.imageurl
                    ? `https://api.bsgazobeton.uz${item.imageurl}`
                    : "/images/default-product.svg"
                }
                alt={item.productname}
                width={80}
                height={80}
              />
              <div className="cart__details">
                <h3 className="cart__details__title">
                  {item.productname || "—"}
                </h3>
                <p className="cart__details__text">
                  {item.description || ""} <br />
                  {Number(item.price || 0).toLocaleString()} {currency}/
                  {item.unit || ""}
                </p>
                <span className="cart__price">
                  {(Number(item.totalprice) || 0).toLocaleString()} {currency}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
