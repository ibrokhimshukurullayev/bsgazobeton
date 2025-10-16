"use client";
import React, { useState, useEffect } from "react";
import { useGetAllOrdersQuery } from "../../../context/orderApi";
import OrderDetailes from "./orderDetailes/OrderDetailes";
import left from "../../../assets/images/webappImages/left.svg";
import phone from "../../../assets/images/webappImages/phone.svg";
import Image from "next/image";
import "./orders.scss";
import { useTranslation } from "react-i18next";

const STATUS_CLASS = {
  Cart: "is-cart",
  New: "is-new",
  Pending: "is-pending",
  Confirmed: "is-confirmed",
  InProgress: "is-inprogress",
  Completed: "is-completed",
  Cancelled: "is-cancelled",
};

function normalizeStatus(status) {
  if (!status) return "New";
  const s = String(status).replace(/\s|_/g, "").toLowerCase();
  const map = {
    cart: "Cart",
    new: "New",
    pending: "Pending",
    confirmed: "Confirmed",
    inprogress: "InProgress",
    completed: "Completed",
    cancelled: "Cancelled",
    canceled: "Cancelled",
  };
  return map[s] || "New";
}

export default function Orders() {
  const { t } = useTranslation("global");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [take, setTake] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [tab, setTab] = useState("active"); // active | archive

  const { data, isLoading, error, refetch } = useGetAllOrdersQuery({
    skip: 0,
    take,
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  if (!token) return <p>{t("auth.loginFirst")}</p>;
  if (isLoading) return <p>{t("common.loading")}</p>;
  if (error) return <p>{t("common.error")}</p>;

  const allOrders = data?.data?.list || [];

  // faqat active (New, Pending, Confirmed, InProgress, Cancelled)
  const activeOrders = allOrders.filter((o) => {
    const s = normalizeStatus(o.status);
    return ["New", "Pending", "Confirmed", "InProgress", "Cancelled"].includes(
      s
    );
  });

  // faqat archive (Completed)
  const archiveOrders = allOrders.filter(
    (o) => normalizeStatus(o.status) === "Completed"
  );

  const currentOrders = tab === "active" ? activeOrders : archiveOrders;

  if (selectedOrder) {
    return (
      <OrderDetailes
        order={selectedOrder}
        onBack={() => setSelectedOrder(null)}
      />
    );
  }

  return (
    <div className="container">
      <div className="ooredr__tab__header">
        <div className="orders">
          <h3 className="orders__title">Orders</h3>
        </div>

        <div className="orders__tabs">
          <button
            className={`orders__tab ${tab === "active" ? "active" : ""}`}
            onClick={() => setTab("active")}
          >
            Active
          </button>
          <button
            className={`orders__tab ${tab === "archive" ? "active" : ""}`}
            onClick={() => setTab("archive")}
          >
            Archive
          </button>
        </div>
      </div>

      <div className="orders__list">
        {currentOrders.length === 0 ? (
          <p>
            {tab === "archive"
              ? "Arxivda buyurtmalar yo‘q."
              : "Faol buyurtmalar topilmadi."}
          </p>
        ) : (
          currentOrders.map((order) => {
            const statusKey = normalizeStatus(order.status);
            const cls = STATUS_CLASS[statusKey] || STATUS_CLASS.New;

            return (
              <button
                key={order.orderId || order.id}
                className="orders__card"
                onClick={() => setSelectedOrder(order)}
              >
                <div className="orders__header">
                  <strong>#{order.ordernumber || order.orderNumber}</strong>
                  <span className={`status-badge ${cls}`}>
                    {order.status || "Yangi"}
                  </span>
                </div>
                <p className="orders__date">
                  {order.orderdate
                    ? new Date(order.orderdate).toLocaleString("uz-UZ")
                    : "—"}
                </p>
                <p className="orders__price">
                  {Number(order.totalprice).toLocaleString()} UZS
                </p>
              </button>
            );
          })
        )}
      </div>

      {currentOrders.length >= take && (
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
