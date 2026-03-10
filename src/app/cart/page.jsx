"use client";

import React, { useState } from "react";
import "./cart.scss";
import CartPage from "./_components/cart-page/CartPage";
import CheckoutForm from "./_components/checkout-form/CheckoutForm";

const Cart = () => {
  const [step, setStep] = useState("cart");

  return (
    <div>
      {step === "cart" && <CartPage onCheckout={() => setStep("checkout")} />}
      {step === "checkout" && <CheckoutForm onBack={() => setStep("cart")} />}
    </div>
  );
};

export default Cart;
