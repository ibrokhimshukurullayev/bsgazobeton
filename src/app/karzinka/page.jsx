import React from "react";
import "./karzinka.scss";
import Empty from "./components/empty/Empty";
import CartPage from "./components/cartPage/CartPage";
import CheckoutForm from "./components/checkoutForm/CheckoutForm";

const Karzinka = () => {
  return (
    <div>
      {/* <Empty /> */}
      <CartPage />
      <CheckoutForm />
    </div>
  );
};

export default Karzinka;
