"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import {
  incCart,
  decCart,
  removeFromCart,
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

// 🔸 localStorage funksiyasi
function writeLocalCart(productid, quantity, patch = {}) {
  try {
    const raw = localStorage.getItem("carts");
    const carts = raw ? JSON.parse(raw) : [];

    const idx = carts.findIndex((x) => x.productid === productid);

    let next;
    if (quantity <= 0) {
      next = carts.filter((x) => x.productid !== productid);
    } else if (idx === -1) {
      next = [...carts, { productid, quantity, ...patch }];
    } else {
      next = carts.map((x) =>
        x.productid === productid ? { ...x, quantity, ...patch } : x
      );
    }

    localStorage.setItem("carts", JSON.stringify(next));

    // 🔹 Redux bilan sinxronlash uchun event
    window.dispatchEvent(new CustomEvent("cart:sync"));
  } catch (err) {
    console.error("❌ localStorage yozishda xato:", err);
  }
}

const CartContent = ({ onCheckout }) => {
  const { t } = useTranslation("global");
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

  const { saveLater } = useDebouncedCartSaver({
    token,
    debounceMs: 500,
  });

  const items = token ? serverCart?.data || [] : cart || [];

  const [localQuantities, setLocalQuantities] = useState({});

  // 🔹 Sync quantities with current items
  useEffect(() => {
    if (items.length) {
      const qMap = {};
      items.forEach((item) => {
        qMap[item.productid] = Number(item.quantity) || 0;
      });
      setLocalQuantities(qMap);
    }
  }, [items]);

  // 🔹 Increase quantity
  const handleIncrease = (item) => {
    const pid = item.productid;
    const nextQty = (localQuantities[pid] || 0) + 1;

    setLocalQuantities((prev) => ({ ...prev, [pid]: nextQty }));
    dispatch(incCart(item));
    writeLocalCart(pid, nextQty, item);

    if (token) saveLater(pid, nextQty, nextQty > 1 ? "Update" : "Create");
  };

  // 🔹 Decrease quantity
  const handleDecrease = (item) => {
    const pid = item.productid;
    const curr = localQuantities[pid] || 0;
    const nextQty = Math.max(0, curr - 1);

    setLocalQuantities((prev) => ({ ...prev, [pid]: nextQty }));
    if (nextQty === 0) dispatch(removeFromCart(item));
    else dispatch(decCart(item));

    writeLocalCart(pid, nextQty, item);
    if (token) saveLater(pid, nextQty, nextQty === 0 ? "Delete" : "Update");
  };

  // 🔹 Remove item completely
  const handleRemove = (item) => {
    const pid = item.productid;
    setLocalQuantities((prev) => ({ ...prev, [pid]: 0 }));
    dispatch(removeFromCart(item));
    writeLocalCart(pid, 0);
    if (token) saveLater(pid, 0, "Delete");
  };

  // 🔹 Total sum
  const totalSum = useMemo(() => {
    return items.reduce((sum, item) => {
      const qty = localQuantities[item.productid] ?? item.quantity ?? 0;
      return sum + (Number(item.price) || 0) * qty;
    }, 0);
  }, [items, localQuantities]);

  if (!items?.length)
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
          <h2 className="cart__title">Cart</h2>
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
                  {(item.price || 0).toLocaleString()} UZS
                </span>

                <div className="cart__quantity">
                  <button
                    type="button"
                    className="cart__quantity__add"
                    onClick={() => handleDecrease(item)}
                  >
                    <Image src={minusIcon} alt="minus" width={15} height={15} />
                  </button>

                  <span className="cart__quantity__text">
                    {localQuantities[item.productid] ?? item.quantity}
                  </span>

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

        <div className="cart__total">
          <span>Umumiy:</span> {totalSum.toLocaleString()} UZS
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
