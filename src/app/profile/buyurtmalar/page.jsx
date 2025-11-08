"use client";
import React, { useEffect, useState } from "react";
import { useGetAllOrdersQuery } from "../../../context/orderApi";
import { useTranslation } from "react-i18next";
import "./order.scss";
import OrderDetailes from "../../../components/orderDetailes/OrderDetailes";

const STATUS_CLASS = {
  Cart: "is-cart",
  New: "is-new",
  Pending: "is-pending",
  Confirmed: "is-confirmed",
  InProgress: "is-inprogress",
  Completed: "is-completed",
  Cancelled: "is-cancelled",
};

// 🔹 Status normalize
function normalizeStatus(s) {
  if (!s) return "New";
  const pure = String(s).replace(/\s|_/g, "").toLowerCase();
  const map = {
    inprogress: "InProgress",
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
  const [tab, setTab] = useState("Active");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "uz_Uz";
    return localStorage.getItem("language") || "uz_Uz";
  });

  // 🔹 Query
  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    skip: 0,
    take,
    status: tab, // Backendga Active yoki Archived yuboriladi
  });

  // 🔹 Til o‘zgarsa
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

  // 🔹 Tab o‘zgarganda yoki til o‘zgarganda refetch
  useEffect(() => {
    refetch();
  }, [language, tab, refetch]);

  if (!token) return <p>{t("auth.loginFirst")}</p>;
  if (isLoading) return <p>{t("common.loading")}</p>;
  if (error) return <p>{t("common.error")}</p>;

  const orders =
    (data && (data.data?.list || data.list || data.data || [])) || [];

  // 🔹 Faqat Active / Archived mantiqni aniqlash (agar backend bu statusni bermasa)
  const filteredOrders = orders.filter((o) => {
    const s = normalizeStatus(o.status);
    if (tab === "Active") {
      return ["Cart", "New", "Pending", "Confirmed", "InProgress"].includes(s);
    }
    return ["Completed", "Cancelled"].includes(s);
  });

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

      {/* 🔹 Tabs */}
      <div className="orders__tabs">
        <button
          className={`orders__tab ${tab === "Active" ? "active" : ""}`}
          onClick={() => setTab("Active")}
        >
          {t("orders.active")}
        </button>
        <button
          className={`orders__tab ${tab === "Archived" ? "active" : ""}`}
          onClick={() => setTab("Archived")}
        >
          {t("orders.archive")}
        </button>
      </div>

      {/* 🔹 Orders list */}
      {filteredOrders.length === 0 ? (
        <p>
          {tab === "Archived" ? t("orders.noArchive") : t("orders.noActive")}
        </p>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => {
            const statusKey = normalizeStatus(order.status);
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
                    onClick={() => setSelectedOrder(order)}
                  >
                    {t("orders.details")}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 🔹 Show more */}
      {filteredOrders.length >= take && (
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
