"use client";

import React, { useState } from "react";
import CartContent from "./components/cart/Cart"; // sizning cart dizayni
import OrderContent from "./components/order/Order"; // sizning order dizayni

const CartPage = () => {
  const [step, setStep] = useState("cart"); // cart yoki order

  return (
    <div>
      {step === "cart" && <CartContent onCheckout={() => setStep("order")} />}
      {step === "order" && <OrderContent onBack={() => setStep("cart")} />}
    </div>
  );
};

export default CartPage;
