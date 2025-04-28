"use client";

import CartItem from "../cartItem/CartItem";
import "./CartPage.scss";
import { useState } from "react";
import gazablok from "../../../../assets/images/Containergaza.png";
import product3 from "../../../../assets/images/product3.png";
import Button from "../../../../components/button/Button";

const CartPage = () => {
  const [cart, setCart] = useState([
    {
      id: 1,
      name: "Gazobeton",
      desc: "D300, 600×200×200",
      image: gazablok,
      price: 72000,
      quantity: 3,
      total: 216000,
      unit: "m³",
    },
    {
      id: 2,
      name: "Gazobeton",
      desc: "D400, 600×200×200",
      image: gazablok,
      price: 72000,
      quantity: 3,
      total: 216000,
      unit: "m³",
    },
    {
      id: 3,
      name: "Gazoblok kley",
      desc: "Nanokley",
      image: product3,
      price: 31000,
      quantity: 2,
      total: 62000,
    },
  ]);

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + delta),
              total: item.price * Math.max(1, item.quantity + delta),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalSum = cart.reduce((sum, item) => sum + item.total, 0);

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Savatcha</h2>
          <span className="item-count">{cart.length}</span>
        </div>
        <div className="clear-cart" onClick={clearCart}>
          Savatchani tozalash
        </div>
      </div>

      <div className="cart-items">
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            onIncrease={() => updateQuantity(item.id, 1)}
            onDecrease={() => updateQuantity(item.id, -1)}
            onRemove={() => removeItem(item.id)}
          />
        ))}
      </div>

      <div className="cart-summary">
        <h3 className="total">
          <span>Umumiy:</span> {totalSum.toLocaleString()} UZS
        </h3>
        <Button title={"BUYURTMANI RASMIYLASHTIRISH"} />
      </div>
    </div>
  );
};

export default CartPage;
