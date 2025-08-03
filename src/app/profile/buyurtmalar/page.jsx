"use client";
import React from "react";
import { useGetUserOrdersQuery } from "../../../context/orderApi";
import "./order.scss";

export default function Buyurtmalar() {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { data, isLoading, error } = useGetUserOrdersQuery(undefined, {
    skip: !token,
  });

  if (!token) return <p>Avval login qiling</p>;
  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  const orders = data?.data || [];

  return (
    <div className="order-history">
      <h2>Buyurtmalar tarixi</h2>
      {orders.length === 0 ? (
        <p>Buyurtmalar topilmadi</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-item" key={order.orderId}>
              <div className="order-left">
                <p className="order-id">#{order.orderId}</p>
                <p className="order-total">{order.totalSum} UZS</p>
                <p className="order-date">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="order-right">
                <span className={`status ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
                <button className="details-btn">Batafsil</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
