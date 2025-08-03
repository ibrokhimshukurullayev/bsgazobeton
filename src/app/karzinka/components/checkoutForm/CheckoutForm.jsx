"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  useCreateOrderMutation,
  useSaveOrderItemsMutation,
} from "../../../../context/orderApi";
import { clearCart } from "../../../../context/cartSlice";
import { toast, ToastContainer } from "react-toastify";
import "./checkoutForm.scss";

const CheckoutForm = ({ onBack }) => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const [createOrder] = useCreateOrderMutation();
  const [saveOrderItems] = useSaveOrderItemsMutation();

  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    address: "",
    email: "",
  });
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Buyurtmani yaratish
      const orderRes = await createOrder({
        ...form,
        isDeliverable: deliveryMethod === "delivery",
      }).unwrap();

      const orderId = orderRes?.data?.orderId || orderRes?.orderId;

      // 2. Mahsulotlarni yuborish
      const items = cart.map((item) => ({
        productid: item.productid,
        quantity: item.quantity,
        state: 1,
      }));

      console.log("Yuborilayotgan items:", items);

      await saveOrderItems(items).unwrap();

      toast.success("Buyurtma muvaffaqiyatli yuborildi!");
      dispatch(clearCart());
    } catch (err) {
      toast.error("Xatolik: " + (err?.data?.message || "Buyurtma yuborilmadi"));
    }
  };

  return (
    <div className="checkout-page container">
      <ToastContainer />
      <button className="back-button" onClick={onBack}>
        ← Savatga qaytish
      </button>

      <h2>Buyurtmani rasmiylashtirish</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>To'liq ismingiz*</label>
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            type="text"
            required
            placeholder="Ismingizni kiriting"
          />
        </div>

        <div className="form-group">
          <label>Telefon raqamingiz*</label>
          <input
            name="phoneNumber"
            value={form.phoneNumber}
            onChange={handleChange}
            type="tel"
            required
            placeholder="+998 (__) ___-__-__"
          />
        </div>

        <div className="form-group full-width">
          <label>Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            placeholder="Emailni kiriting"
          />
        </div>

        <div className="form-group full-width">
          <label>Manzil</label>
          <input
            name="address"
            value={form.address}
            onChange={handleChange}
            type="text"
            placeholder="Manzilni kiriting"
          />
        </div>

        <div className="form-group full-width">
          <label>Yetkazib berish</label>
          <div className="delivery-options">
            <div
              className={`option ${
                deliveryMethod === "delivery" ? "active" : ""
              }`}
              onClick={() => setDeliveryMethod("delivery")}
            >
              Yetkazib berish
            </div>
            <div
              className={`option ${
                deliveryMethod === "pickup" ? "active" : ""
              }`}
              onClick={() => setDeliveryMethod("pickup")}
            >
              Zavoddan olib ketish
            </div>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          Buyurtmani yuborish
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
