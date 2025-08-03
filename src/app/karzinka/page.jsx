"use client";

import React, { useState } from "react";
import "./karzinka.scss";
import Empty from "../../components/empty/Empty";
import CartPage from "../../app/karzinka/components/cartPage/CartPage";
import CheckoutForm from "./../../app/karzinka/components/checkoutForm/CheckoutForm";
import { useSelector } from "react-redux";

const Karzinka = () => {
  const cart = useSelector((state) => state.cart.value);
  const [step, setStep] = useState("cart"); // 'cart' yoki 'checkout'

  // 1. Agar karzinka bo'sh bo'lsa
  if (!cart.length) {
    return <Empty />;
  }

  return (
    <div>
      {step === "cart" && <CartPage onCheckout={() => setStep("checkout")} />}
      {step === "checkout" && <CheckoutForm onBack={() => setStep("cart")} />}
    </div>
  );
};

export default Karzinka;
