"use client";
import React from "react";
import Image from "next/image";
import leftIcon from "../../../../assets/images/webappImages/left.svg";
import "./orderDetailes.scss";
import { useTranslation } from "react-i18next";

export default function OrderDetailes({ order, onBack }) {
  const { t } = useTranslation("global");

  const products = order?.orderitems || [];

  return (
    <div className="orderdetailes">
      <div className="container">
        {/* Ortga tugmasi */}
        <div className="orderdetailes__box" onClick={onBack}>
          <Image
            className="orderdetailes__img"
            src={leftIcon}
            alt="back"
            width={24}
            height={24}
          />
          <p className="orderdetailes__text">{t("orderss.back")}</p>
        </div>

        {/* Buyurtma ID */}
        <h3 className="orderdetailes__title">
          {t("orderss.id")}:{" "}
          <strong>#{order?.ordernumber || order?.orderNumber}</strong>
        </h3>

        {/* Buyurtma ma'lumotlari */}
        <div className="orderdetailes__info">
          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("orderss.date")}:</p>
            <p className="orderdetailes__row__text">
              {order?.orderdate
                ? new Date(order.orderdate).toLocaleString("uz-UZ")
                : "—"}
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("orderss.status")}:</p>
            <p
              className={`orderdetailes__row__text orderdetailes__row__${order.status?.toLowerCase()}`}
            >
              {order.status || "—"}
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("orderss.total")}:</p>
            <p className="orderdetailes__row__text">
              {Number(order?.totalprice || 0).toLocaleString()} UZS
            </p>
          </div>

          <div className="orderdetailes__row">
            <p className="orderdetailes__row__title">{t("orderss.address")}:</p>
            <p className="orderdetailes__row__text">{order?.address || "—"}</p>
          </div>
        </div>

        {/* Mahsulotlar ro‘yxati */}
        <h4 className="orderdetailes__list">{t("orderss.products")}</h4>

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
                  {Number(item.price || 0).toLocaleString()} UZS/{item.unit}
                </p>
                <span className="cart__price">
                  {(Number(item.totalprice) || 0).toLocaleString()} UZS
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
