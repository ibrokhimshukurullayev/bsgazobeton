"use client";

import React, { useState } from "react";
import "./karzinka.scss";
import CartPage from "../../app/karzinka/components/cartPage/CartPage";
import CheckoutForm from "./../../app/karzinka/components/checkoutForm/CheckoutForm";

// export const metadata = {
//   title: "Karzinka | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

const Karzinka = () => {
  const [step, setStep] = useState("cart");

  // if (!cart.length) {
  //   return <Empty />;
  // }

  return (
    <div>
      {step === "cart" && <CartPage onCheckout={() => setStep("checkout")} />}
      {step === "checkout" && <CheckoutForm onBack={() => setStep("cart")} />}
    </div>
  );
};

export default Karzinka;
