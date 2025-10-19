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
  const { t } = useTranslation("global");
  const router = useRouter();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  // Token borligini tekshirish
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Foydalanuvchi buyurtmalari
  const { data: serverCart, isFetching: cartFetching } = useGetUserOrdersQuery(
    undefined,
    {
      skip: !token,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  // Mahsulot sonini yangilash
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

  // Mahsulotni o‘chirish
  const removeItem = (productid) => {
    const item = cart.find((el) => el.productid === productid);
    if (item) dispatch(removeFromCart(item));
  };

  // Tanlangan cart ro‘yxati (token bilan yoki localsdan)
  const currentCart = token ? serverCart?.data || [] : cart || [];

  // Umumiy summa
  const totalSum = currentCart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const quantity = Number(item.quantity) || 0;
    return sum + price * quantity;
  }, 0);

  return (
    <div className="cart-page container">
      <div className="cart-header">
        <div style={{ display: "flex", alignItems: "center" }}>
          <h2>{t("card.title")}</h2>
          <span className="item-count">{currentCart.length}</span>
        </div>
        {currentCart.length > 0 && (
          <div className="clear-cart" onClick={() => dispatch(clearCart())}>
            {t("card.clearcard")}
          </div>
        )}
      </div>

      <div className="cart-items">
        {currentCart.length > 0 ? (
          currentCart.map((item) => (
            <CartItem
              key={item.productid}
              item={item}
              onIncrease={() => updateQuantity(item.productid, 1)}
              onDecrease={() => updateQuantity(item.productid, -1)}
              onRemove={() => removeItem(item.productid)}
            />
          ))
        ) : (
          <p className="empty-text">{t("card.empty")}</p>
        )}
      </div>

      <div className="cart-summary">
        <h3 className="total">
          <span>{t("card.total")}</span> {totalSum.toLocaleString("uz-UZ")} UZS
        </h3>

        {currentCart.length > 0 && (
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
        )}
      </div>
    </div>
  );
};

export default CartPage;
