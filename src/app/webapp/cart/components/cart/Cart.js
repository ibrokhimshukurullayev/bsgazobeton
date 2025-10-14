"use client";

import React, { useMemo, useEffect, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  incCart,
  decCart,
  removeFromCart,
  clearCart,
} from "../../../../../context/cartSlice";
import { useTranslation } from "react-i18next";
import { useGetUserOrdersQuery } from "../../../../../context/orderApi";
import { useRouter } from "next/navigation";
import useDebouncedCartSaver from "../../../../../hooks/useDebouncedCartSaver";

import cardImg from "../../../../../assets/images/webappImages/card1.svg";
import minusIcon from "../../../../../assets/images/webappImages/minus.svg";
import plusIcon from "../../../../../assets/images/webappImages/plus.svg";
import deleteIcon from "../../../../../assets/images/webappImages/delete.svg";

import "./cart.scss";

const CartContent = ({ onCheckout }) => {
  const [t] = useTranslation("global");
  const router = useRouter();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart.value);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const items = token ? serverCart?.data || [] : cart || [];

  // 🔹 Debounce saver hook — serverga bosim bermaslik uchun
  const { saveLater } = useDebouncedCartSaver({
    token,
    debounceMs: 600,
  });

  // === ✅ Miqdorni oshirish yoki kamaytirish ===
  const updateQuantity = (productid, delta) => {
    const item = items.find((el) => el.productid === productid);
    if (!item) return;

    let nextQuantity = item.quantity + delta;
    if (nextQuantity < 0) nextQuantity = 0;

    if (delta === 1) {
      dispatch(incCart(item));
    } else if (delta === -1) {
      if (item.quantity <= 1) {
        dispatch(removeFromCart(item));
      } else {
        dispatch(decCart(item));
      }
    }

    // 🔹 serverga yuborish (agar token mavjud bo‘lsa)
    if (token) {
      const state =
        nextQuantity <= 0
          ? "Delete"
          : item.quantity === 0
          ? "Create"
          : "Update";
      saveLater(productid, nextQuantity, state);
    }
  };

  // === ✅ Mahsulotni o‘chirish ===
  const removeItem = (productid) => {
    const item = items.find((el) => el.productid === productid);
    if (item) {
      dispatch(removeFromCart(item));
      if (token) saveLater(productid, 0, "Delete");
    }
  };

  const totalSum = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items]
  );

  if (!items || items.length === 0)
    return (
      <div className="container">
        <h2 className="cart__titles">Cart</h2>
        <div className="empty__cart">Empty cart!</div>
      </div>
    );

  return (
    <div className="container">
      <div className="cart">
        <div className="cart__header">
          <h2 className="cart__title">Cart: {items.length}</h2>
          <button className="cart__clear" onClick={() => dispatch(clearCart())}>
            Clear all
          </button>
        </div>

        <div className="cart__box">
          {items.map((item) => (
            <div className="cart__item" key={item.productid}>
              <Image
                className="cart__item__img"
                src={
                  item.imageurl
                    ? `https://api.bsgazobeton.uz${item.imageurl}`
                    : cardImg
                }
                alt={item.name || "Product"}
                width={100}
                height={80}
              />

              <div className="cart__details">
                <h4 className="cart__category">{item.productname}</h4>
                <span className="cart__price">
                  {item.price?.toLocaleString()} UZS
                </span>

                <div className="cart__quantity">
                  <button
                    type="button"
                    className="cart__quantity__add"
                    onClick={() => updateQuantity(item.productid, -1)}
                  >
                    <Image src={minusIcon} alt="minus" width={15} height={15} />
                  </button>

                  <span className="cart__quantity__text">{item.quantity}</span>

                  <button
                    type="button"
                    className="cart__quantity__add"
                    onClick={() => updateQuantity(item.productid, 1)}
                  >
                    <Image src={plusIcon} alt="plus" width={15} height={15} />
                  </button>
                </div>
              </div>

              <button
                className="cart__remove"
                onClick={() => removeItem(item.productid)}
              >
                <Image src={deleteIcon} alt="delete" width={22} height={22} />
              </button>
            </div>
          ))}
        </div>

        <div className="cart__total">
          <span>Umumiy:</span> {totalSum?.toLocaleString()} UZS
        </div>

        <button
          className="form__button"
          onClick={() => {
            if (!token) router.push("/login");
            else onCheckout();
          }}
        >
          Buyurtmani rasmiylashtirish
        </button>
      </div>
    </div>
  );
};

export default CartContent;
