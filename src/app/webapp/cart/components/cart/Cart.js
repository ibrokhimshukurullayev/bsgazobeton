"use client";

import React, { useEffect, useMemo, useState } from "react";
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

// 🔸 LocalStorage’da saqlash funksiyasi
function writeLocalCart(productid, nextQuantity, patch) {
  try {
    const raw = localStorage.getItem("carts");
    const list = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((x) => x && x.productid === productid);

    if (nextQuantity <= 0) {
      const next =
        idx === -1 ? list : list.filter((x) => x.productid !== productid);
      localStorage.setItem("carts", JSON.stringify(next));
    } else {
      if (idx === -1) {
        localStorage.setItem(
          "carts",
          JSON.stringify([
            ...list,
            { productid, quantity: nextQuantity, ...(patch || {}) },
          ])
        );
      } else {
        const next = list.map((x, i) =>
          i === idx ? { ...x, quantity: nextQuantity, ...(patch || {}) } : x
        );
        localStorage.setItem("carts", JSON.stringify(next));
      }
    }

    window.dispatchEvent(
      new CustomEvent("cart:sync", { detail: { source: "cart" } })
    );
  } catch (e) {
    console.error("localStorage carts yozishda xato:", e);
  }
}

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

  // 🔹 Server bilan sinxronlash uchun debounce hook
  const { saveLater } = useDebouncedCartSaver({
    token,
    debounceMs: 600,
  });

  const items = token ? serverCart?.data || [] : cart || [];

  // === ✅ Miqdorni oshirish ===
  const handleIncrease = (item) => {
    const nextQty = (Number(item.quantity) || 0) + 1;
    const productid = item.productid;

    // 🔹 LocalStorage + Redux
    writeLocalCart(productid, nextQty, item);
    dispatch(incCart(item));

    // 🔹 Serverga yuborish
    if (token) {
      const state = item.quantity > 0 ? "Update" : "Create";
      saveLater(productid, nextQty, state);
    }
  };

  // === ✅ Miqdorni kamaytirish ===
  const handleDecrease = (item) => {
    const currentQty = Number(item.quantity) || 0;
    const nextQty = Math.max(0, currentQty - 1);
    const productid = item.productid;

    // 🔹 LocalStorage + Redux
    writeLocalCart(productid, nextQty, item);

    if (nextQty <= 0) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decCart(item));
    }

    // 🔹 Serverga yuborish
    if (token) {
      const state = nextQty <= 0 ? "Delete" : "Update";
      saveLater(productid, nextQty, state);
    }
  };

  // === ✅ Mahsulotni o‘chirish ===
  const handleRemove = (item) => {
    const productid = item.productid;
    writeLocalCart(productid, 0, item);
    dispatch(removeFromCart(item));
    if (token) saveLater(productid, 0, "Delete");
  };

  // === ✅ Umumiy summa ===
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
          <h2 className="cart__title">
            Cart: <span>{items.length}</span>
          </h2>
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
                alt={item.productname || "Product"}
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
                    onClick={() => handleDecrease(item)}
                  >
                    <Image src={minusIcon} alt="minus" width={15} height={15} />
                  </button>

                  <span className="cart__quantity__text">{item.quantity}</span>

                  <button
                    type="button"
                    className="cart__quantity__add"
                    onClick={() => handleIncrease(item)}
                  >
                    <Image src={plusIcon} alt="plus" width={15} height={15} />
                  </button>
                </div>
              </div>

              <button
                className="cart__remove"
                onClick={() => handleRemove(item)}
              >
                <Image src={deleteIcon} alt="delete" width={22} height={22} />
              </button>
            </div>
          ))}
        </div>

        {/* TOTAL */}
        <div className="cart__total">
          <span>Umumiy:</span> {totalSum?.toLocaleString()} UZS
        </div>

        {/* CHECKOUT BUTTON */}
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
