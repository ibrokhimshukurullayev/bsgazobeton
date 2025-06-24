// pages/CartPage.js
"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  incCart,
  decCart,
  removeFromCart,
  clearCart,
} from "../../../../context/cartSlice"; // path loyihangizga qarab sozlang

import CartItem from "../cartItem/CartItem";
import Button from "../../../../components/button/Button";
// import gazablok from "../../assets/images/Containergaza.png";
// import product3 from "../../assets/images/product3.png";
import "./CartPage.scss";

const CartPage = () => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const updateQuantity = (id, delta) => {
    const item = cart.find((el) => el.id === id);
    if (!item) return;

    if (delta === 1) {
      dispatch(incCart(item));
    } else if (delta === -1) {
      if (item.quantity <= 1) {
        dispatch(removeFromCart(item));
      } else {
        dispatch(decCart(item));
      }
    }
  };

  const removeItem = (id) => {
    const item = cart.find((el) => el.id === id);
    if (item) dispatch(removeFromCart(item));
  };

  const totalSum = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>Savatcha</h2>
          <span className="item-count">{cart.length}</span>
        </div>
        <div className="clear-cart" onClick={() => dispatch(clearCart())}>
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
