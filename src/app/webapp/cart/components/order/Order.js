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
import "./order.scss";

const OrderContent = ({ onBack }) => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();
  const router = useRouter();

  const [createOrder] = useCreateOrderMutation();
  const [saveOrderItems] = useSaveOrderItemsMutation();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
  });
  const [deliveryType, setDeliveryType] = useState("delivery");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const orderRes = await createOrder({
        ...form,
        isDeliverable: deliveryType === "delivery",
      }).unwrap();

      const items = cart.map((item) => ({
        productid: item.productid,
        quantity: item.quantity,
        state: 1,
      }));

      await saveOrderItems(items).unwrap();

      toast.success("Buyurtma muvaffaqiyatli yuborildi!");
      dispatch(clearCart());
      router.push("/katalog");
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Buyurtma yuborilmadi"));
    }
  };

  return (
    <div className="container">
      <ToastContainer />
      <h2>Buyurtmani rasmiylashtirish</h2>

      <form className="order__form" onSubmit={handleSubmit}>
        <div className="order__form__info">
          <label className="form__group__label">To‘liq ismingiz</label>
          <input
            className="form__group__input"
            type="text"
            placeholder="Sohib"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Phone number</label>
          <input
            className="form__group__input"
            type="tel"
            placeholder="+998 (__) ___-__-__"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Email</label>
          <input
            className="form__group__input"
            type="email"
            placeholder="Emailni kiriting"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Manzil</label>
          <textarea
            className="form__group__input"
            placeholder="Manzilni kiriting"
            name="address"
            value={form.address}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="order__form__info">
          <label className="form__group__label">Yetkazib berish</label>
          <div className="delivery__options">
            <button
              type="button"
              className={`option ${
                deliveryType === "delivery" ? "selected" : ""
              }`}
              onClick={() => setDeliveryType("delivery")}
            >
              Yetkazib berish
            </button>
            <button
              type="button"
              className={`option ${
                deliveryType === "pickup" ? "selected" : ""
              }`}
              onClick={() => setDeliveryType("pickup")}
            >
              Zavoddan olib ketish
            </button>
          </div>
        </div>

        <button type="submit" className="order__form__button">
          Yuborish
        </button>
      </form>
    </div>
  );
};

export default OrderContent;
