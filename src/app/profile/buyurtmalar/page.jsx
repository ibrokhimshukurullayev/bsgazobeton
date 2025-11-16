"use client";
import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../../context/orderApi";
import { useTranslation } from "react-i18next";
import "./order.scss";
import OrderDetailes from "../../../components/orderDetailes/OrderDetailes";

// export const metadata = {
//   title: "Buyurtmalar | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const ENUM_BY_ID = {
  0: "Cart",
  1: "New",
  2: "Pending",
  3: "Confirmed",
  4: "InProgress",
  5: "Completed",
  6: "Cancelled",
};

const STATUS_CLASS = {
  Cart: "is-cart",
  New: "is-new",
  Pending: "is-pending",
  Confirmed: "is-confirmed",
  InProgress: "is-inprogress",
  Completed: "is-completed",
  Cancelled: "is-cancelled",
};

function normalizeStatus(s) {
  if (typeof s === "number") return ENUM_BY_ID[s] || "New";
  if (!s) return "New";
  const pure = String(s).replace(/\s|_/g, "").toLowerCase();
  const map = {
    inprogress: "InProgress",
    inprogresss: "InProgress",
    in_progress: "InProgress",
    completed: "Completed",
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
    canceled: "Cancelled",
    new: "New",
    cart: "Cart",
  };
  return map[pure] || s;
}

export default function Buyurtmalar() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { t, i18n } = useTranslation("global");
  const [take, setTake] = useState(5);
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "uz_Uz";
    return localStorage.getItem("language") || "uz_Uz";
  });

  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    skip: 0,
    take,
  });

  useEffect(() => {
    const code = toI18nCode(language);
    i18n.changeLanguage(code);
  }, [language, i18n]);

  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang =
        (e && e.detail) || localStorage.getItem("language") || "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  useEffect(() => {
    refetch();
  }, [language, refetch]);

  if (!token) return <p>{t("auth.loginFirst")}</p>;
  if (isLoading) return <p>{t("common.loading")}</p>;
  if (error) return <p>{t("common.error")}</p>;

  const orders =
    (data && (data.data?.list || data.list || data.data || [])) || [];

  function toI18nCode(lang) {
    const m = String(lang || "").toLowerCase();
    if (m.startsWith("ru")) return "ru-RU";
    if (m.startsWith("en")) return "en-US";
    return "uz-UZ";
  }

  if (selectedOrder) {
    return (
      <OrderDetailes
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="order-history">
      <h2>{t("orders.title")}</h2>

      {orders.length === 0 ? (
        <p>{t("orders.empty")}</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => {
            const statusKey = normalizeStatus(order && order.status);
            const cls = STATUS_CLASS[statusKey] || STATUS_CLASS.New;
            const label = t(`orders.status.${statusKey}`, statusKey);

            return (
              <div className="order-item" key={order.orderId || order.id}>
                <div className="order-left">
                  <p className="order-id">
                    #{order?.ordernumber || order?.orderNumber}
                  </p>
                  <p className="order-total">
                    {(Number(order?.totalprice) || 0).toLocaleString()}{" "}
                    {t("header.priceUnit")}
                  </p>
                </div>

                <p className="order-date">
                  {order?.orderdate
                    ? new Date(order.orderdate).toLocaleString("uz-UZ")
                    : "—"}
                </p>

                <div className="order-right">
                  <span className={`status-badge ${cls}`}>{label}</span>
                  <button
                    className="details-btn"
                    onClick={() => setSelectedOrder(order)} // ✅ shu yerda ochiladi
                  >
                    {t("orders.details")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {orders?.length >= take && (
        <button
          className="show-more"
          onClick={() => setTake((prev) => prev + 5)}
        >
          {t("orders.showMore")}
        </button>
      )}
    </div>
  );
}
