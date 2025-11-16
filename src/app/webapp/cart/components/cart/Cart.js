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
import { useRouter } from "next/navigation";
import useDebouncedCartSaver from "../../../../../hooks/useDebouncedCartSaver";
import { useGetUserOrdersQuery } from "../../../../../context/orderApi";
import { units } from "../../../../../data/unit";

import cardImg from "../../../../../assets/images/webappImages/card1.svg";
import minusIcon from "../../../../../assets/images/webappImages/minus.svg";
import plusIcon from "../../../../../assets/images/webappImages/plus.svg";
import deleteIcon from "../../../../../assets/images/webappImages/delete.svg";

import "./cart.scss";

// 🔹 localStorage yozish funksiyasi
function writeLocalCart(productid, nextQuantity, patch = {}) {
  try {
    const raw = localStorage.getItem("carts");
    const list = raw ? JSON.parse(raw) : [];
    const idx = list.findIndex((x) => x.productid === productid);
    let next;

    if (nextQuantity <= 0) {
      next = list.filter((x) => x.productid !== productid);
    } else if (idx === -1) {
      next = [...list, { productid, quantity: nextQuantity, ...patch }];
    } else {
      next = list.map((x, i) =>
        i === idx ? { ...x, quantity: nextQuantity, ...patch } : x
      );
    }

    localStorage.setItem("carts", JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("cart:sync"));
  } catch (err) {
    console.error("❌ localStorage yozishda xato:", err);
  }
}

export default function CartContent({ onCheckout }) {
  const { t, i18n } = useTranslation("global");
  const router = useRouter();
  const dispatch = useDispatch();

  const reduxCart = useSelector((state) => state.cart.value);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { saveLater } = useDebouncedCartSaver({ token, debounceMs: 600 });

  // 🔹 Server cart hook
  const { data: serverCart, isFetching } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // 🔹 LocalStorage cart
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("carts");
    setLocalCart(raw ? JSON.parse(raw) : []);
    const sync = () => {
      const updated = JSON.parse(localStorage.getItem("carts") || "[]");
      setLocalCart(updated);
    };
    window.addEventListener("cart:sync", sync);
    return () => window.removeEventListener("cart:sync", sync);
  }, []);

  // 🔹 Tanlanadigan cart (token → server, aks holda → local)
  const items = token ? serverCart?.data || [] : localCart || reduxCart || [];

  console.log(items);

  // 🔹 Quantity +
  const handleIncrease = (item) => {
    const id = item.productid || item.id;
    const nextQty = (Number(item.quantity) || 0) + 1;

    const patch = {
      name: item.name,
      imageurl: item.imageurl,
      price: item.price,
      desc: item.desc,
      unit: item.unit,
    };

    writeLocalCart(id, nextQty, patch);
    dispatch(incCart({ ...item, productid: id }));

    if (token) saveLater(id, nextQty, nextQty > 1 ? "Update" : "Create");
  };

  // 🔹 Quantity -
  const handleDecrease = (item) => {
    const id = item.productid || item.id;
    const current = Number(item.quantity) || 0;
    const nextQty = Math.max(0, current - 1);

    const patch = {
      name: item.name,
      imageurl: item.imageurl,
      price: item.price,
      desc: item.desc,
      unit: item.unit,
    };

    writeLocalCart(id, nextQty, patch);

    if (nextQty <= 0) {
      dispatch(removeFromCart({ ...item, productid: id }));
      if (token) saveLater(id, 0, "Delete");
    } else {
      dispatch(decCart({ ...item, productid: id }));
      if (token) saveLater(id, nextQty, "Update");
    }
  };

  // 🔹 O‘chirish
  const handleRemove = (item) => {
    const id = item.productid || item.id;
    writeLocalCart(id, 0);
    dispatch(removeFromCart({ ...item, productid: id }));
    if (token) saveLater(id, 0, "Delete");
  };

  // 🔹 Tozalash
  const handleClear = () => {
    dispatch(clearCart());
    localStorage.setItem("carts", "[]");
    if (token && items.length > 0) {
      items.forEach((el) => saveLater(el.productid, 0, "Delete"));
    }
  };

  // 🔹 Umumiy summa
  const totalSum = useMemo(() => {
    return items.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return sum + price * quantity;
    }, 0);
  }, [items]);

  return (
    <div className="container">
      <div className="cart">
        <div className="cart__header">
          <h2 className="cart__title">{t("card.title")}</h2>
        </div>

        {items.length === 0 ? (
          <div className="empty__cart">{t("card.empty")}</div>
        ) : (
          <div className="cart__box">
            {items.map((item) => {
              const lang = i18n.language?.toLowerCase() || "uz_uz";
              const unitData = units[item?.unit?.toLowerCase()];
              const unitText = unitData
                ? unitData[lang] || unitData.uz_uz
                : item?.unit;

              return (
                <div className="cart__item" key={item.productid || item.id}>
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
                      {(item.price || 0).toLocaleString()}{" "}
                      {t("header.priceUnit")}/{unitText}
                    </span>

                    <div className="cart__quantity">
                      <button
                        type="button"
                        onClick={() => handleDecrease(item)}
                        className="cart__quantity__add"
                      >
                        <Image
                          src={minusIcon}
                          alt="minus"
                          width={15}
                          height={15}
                        />
                      </button>
                      <span className="cart__quantity__text">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleIncrease(item)}
                        className="cart__quantity__add"
                      >
                        <Image
                          src={plusIcon}
                          alt="plus"
                          width={15}
                          height={15}
                        />
                      </button>
                    </div>
                  </div>

                  <button
                    className="cart__remove"
                    onClick={() => handleRemove(item)}
                  >
                    <Image
                      src={deleteIcon}
                      alt="delete"
                      width={22}
                      height={22}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {items.length > 0 && (
          <>
            <div className="cart__total">
              <span>{t("card.total")}:</span> {totalSum.toLocaleString()} UZS
            </div>

            <button
              className="form__button"
              onClick={() => {
                onCheckout && onCheckout();
              }}
            >
              {t("card.checkout")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
