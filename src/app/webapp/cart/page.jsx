"use client";

import React, { useState } from "react";
import CartContent from "./_components/cart/Cart";
import OrderContent from "./_components/order/Order";

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
