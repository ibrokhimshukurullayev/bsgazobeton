"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  incCart,
  decCart,
  removeFromCart,
  clearCart,
} from "../../../../context/cartSlice";

import CartItem from "../cartItem/CartItem";
import Button from "../../../../components/button/Button";
import { useTranslation } from "react-i18next";
import { useGetUserOrdersQuery } from "../../../../context/orderApi";
import { useRouter } from "next/navigation";
import "./CartPage.scss";

const CartPage = ({ onCheckout }) => {
  const [t, i18n] = useTranslation("global");
  const router = useRouter();

  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: serverCart, isFetching: cartFetching } = useGetUserOrdersQuery(
    undefined,
    {
      skip: !token,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const updateQuantity = (productid, delta) => {
    const item = cart?.find((el) => el.productid === productid);
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

  const removeItem = (productid) => {
    const item = cart.find((el) => el.productid === productid);
    if (item) dispatch(removeFromCart(item));
  };

  const totalSum = (token ? serverCart?.data : cart)?.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{t("card.title")}</h2>
          <span className="item-count">
            {token ? serverCart?.data.length : cart.length}
          </span>
        </div>
        <div className="clear-cart" onClick={() => dispatch(clearCart())}>
          {t("card.clearcard")}
        </div>
      </div>
      <div className="cart-items">
        {(token ? serverCart?.data : cart)?.map((item) => (
          <CartItem
            key={item.productid}
            item={item}
            onIncrease={() => updateQuantity(item.productid, 1)}
            onDecrease={() => updateQuantity(item.productid, -1)}
            onRemove={() => removeItem(item.productid)}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3 className="total">
          <span>{t("card.total")}</span> {totalSum.toLocaleString()} UZS
        </h3>
        {(serverCart?.data?.length || cart.length > 0) && (
          <Button
            title={t("card.checkout")}
            onClick={() => {
              if (!token) {
                router.push("/login");
              } else {
                onCheckout();
              }
            }}
          />
        )}{" "}
      </div>
    </div>
  );
};

export default CartPage;
