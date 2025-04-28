"use client";

import { useState } from "react";
import "./checkoutForm.scss";

const CheckoutForm = () => {
  const [deliveryMethod, setDeliveryMethod] = useState("delivery");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Formani yuborish logikasi
    alert("Buyurtma yuborildi!");
  };

  return (
    <div className="checkout-page container">
      <button className="back-button">← Savatga qaytish</button>

      <h2>Buyurtmani rasmiylashtirish</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>To'liq ismingiz*</label>
          <input type="text" required placeholder="Ismingizni kiriting" />
        </div>

        <div className="form-group">
          <label>Telefon raqamingiz*</label>
          <input type="tel" required placeholder="+998 (__) ___-__-__" />
        </div>

        <div className="form-group">
          <label>Hudud</label>
          <select>
            <option>Hududni tanlang...</option>
            <option>Toshkent</option>
            <option>Samarqand</option>
            <option>Buxoro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="Emailni kiriting" />
        </div>

        <div className="form-group full-width">
          <label>Manzil</label>
          <input type="text" placeholder="Manzilni kiriting" />
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
