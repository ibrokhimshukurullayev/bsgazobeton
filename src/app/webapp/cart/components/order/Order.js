"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateOrderMutation,
  useSaveOrderItemsMutation,
} from "../../../../../context/orderApi";
import { clearCart } from "../../../../../context/cartSlice";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from "react-i18next";
import "./order.scss";

const OrderContent = ({ onBack }) => {
  const { t } = useTranslation("global");
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [createOrder] = useCreateOrderMutation();
  const [saveOrderItems] = useSaveOrderItemsMutation();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "+998",
    email: "",
    address: "",
  });
  const [deliveryType, setDeliveryType] = useState("delivery");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1️⃣ Buyurtma yaratish
      const orderRes = await createOrder({
        ...form,
        isDeliverable: deliveryType === "delivery",
      }).unwrap();

      // 2️⃣ orderid bilan mahsulotlarni yuborish
      const items = cart.map((item) => ({
        orderid: orderRes.id, // 🔥 asosiy qo‘shimcha
        productid: item.productid,
        quantity: item.quantity,
        state: 1,
      }));

      await saveOrderItems(items).unwrap();

      toast.success(t("order.success"));
      dispatch(clearCart());
      router.push("/webapp/home");
    } catch (err) {
      toast.error(
        `${t("order.error")}: ${err?.data?.message || t("order.failed")}`
      );
    }
    let value = e.target.value;

    if (!value.startsWith("+998")) {
      value = "+998" + value.replace(/\D/g, "");
    }

    value = "+998" + value.slice(4).replace(/\D/g, "");

    if (value.length > 13) {
      value = value.slice(0, 13);
    }

    setPhoneNumber(value);
  };

  return (
    <div className="container">
      <ToastContainer
        position="bottom-center"
        style={{ bottom: "50px" }} // 🔹 50px pastdan
      />
      <h2 className="order__header__title">{t("order.title")}</h2>

      <form className="order__form" onSubmit={handleSubmit}>
        <div className="order__form__info">
          <label className="form__group__label">{t("order.full_name")}</label>
          <input
            className="form__group__input"
            type="text"
            placeholder={t("order.full_name_placeholder")}
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">{t("order.phone")}</label>
          <input
            className="form__group__input"
            type="tel"
            placeholder={t("order.phone_placeholder")}
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Email</label>
          <input
            className="form__group__input"
            type="email"
            placeholder={t("order.email_placeholder")}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">{t("order.address")}</label>
          <textarea
            className="form__group__input"
            placeholder={t("order.address_placeholder")}
            name="address"
            value={form.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="order__form__info">
          <label className="form__group__label">{t("order.delivery")}</label>
          <div className="delivery__options">
            <button
              type="button"
              className={`option ${
                deliveryType === "delivery" ? "selected" : ""
              }`}
              onClick={() => setDeliveryType("delivery")}
            >
              {t("order.delivery_method")}
            </button>
            <button
              type="button"
              className={`option ${
                deliveryType === "pickup" ? "selected" : ""
              }`}
              onClick={() => setDeliveryType("pickup")}
            >
              {t("order.pickup_method")}
            </button>
          </div>
        </div>

        <button type="submit" className="order__form__button">
          {t("order.submit")}
        </button>
      </form>
    </div>
  );
};

export default OrderContent;
