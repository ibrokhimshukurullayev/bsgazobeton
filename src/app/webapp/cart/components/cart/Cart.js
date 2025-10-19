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
import { useRouter } from "next/navigation";
import useDebouncedCartSaver from "../../../../../hooks/useDebouncedCartSaver";

import cardImg from "../../../../../assets/images/webappImages/card1.svg";
import minusIcon from "../../../../../assets/images/webappImages/minus.svg";
import plusIcon from "../../../../../assets/images/webappImages/plus.svg";
import deleteIcon from "../../../../../assets/images/webappImages/delete.svg";
import { units } from "../../../../../data/unit"; // ✅ birlik tarjimalari

import "./cart.scss";

function writeLocalCart(productid, quantity, patch = {}) {
  try {
    const raw = localStorage.getItem("carts");
    const carts = raw ? JSON.parse(raw) : [];
    const idx = carts.findIndex((x) => x.productid === productid);

    let next;
    if (quantity <= 0) {
      next = carts.filter((x) => x.productid !== productid);
    } else if (idx === -1) {
      next = [...carts, { ...patch, productid, quantity }];
    } else {
      next = carts.map((x) =>
        x.productid === productid ? { ...x, quantity, ...patch } : x
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

  const cart = useSelector((state) => state.cart.value);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { saveLater } = useDebouncedCartSaver({
    token,
    debounceMs: 500,
  });

  const items = cart || [];
  const [localQuantities, setLocalQuantities] = useState({});

  // 🔹 Initial log & quantity sync
  useEffect(() => {
    console.log("🛒 CART PAGE LOADED:", items);
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

  // 🔹 Remove item
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
      const price = Number(item.price) || 0;
      return sum + price * qty;
    }, 0);
  }, [items, localQuantities]);

  if (!items?.length)
    return (
      <div className="container">
        <h2 className="cart__titles">{t("card.title") || "Cart"}</h2>
        <div className="empty__cart">Savat bo‘sh!</div>
      </div>
    );

  return (
    <div className="container">
      <div className="cart">
        <div className="cart__header">
          <h2 className="cart__title">{t("card.title") || "Cart"}</h2>
        </div>

        <div className="cart__box">
          {items.map((item) => {
            // ✅ UNIT tarjimasi
            const lang = i18n.language?.toLowerCase() || "uz_uz";
            const unitData = units[item?.unit?.toLowerCase()];
            const unitText = unitData
              ? unitData[lang] || unitData.uz_uz
              : item?.unit;

            return (
              <div className="cart__item" key={item.productid}>
                <Image
                  className="cart__item__img"
                  src={
                    item.imageurl
                      ? `https://api.bsgazobeton.uz${item.imageurl}`
                      : cardImg
                  }
                  alt={item.name?.uz_uz || item.productname || "Product"}
                  width={100}
                  height={80}
                />

                <div className="cart__details">
                  <h4 className="cart__category">{item.name}</h4>

                  <span className="cart__price">
                    {(item.price || 0).toLocaleString()} {t("header.priceUnit")}
                    /{unitText}
                  </span>

                  <div className="cart__quantity">
                    <button
                      type="button"
                      className="cart__quantity__add"
                      onClick={() => handleDecrease(item)}
                    >
                      <Image
                        src={minusIcon}
                        alt="minus"
                        width={15}
                        height={15}
                      />
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
            );
          })}
        </div>

        <div className="cart__total">
          <span>{t("card.total")}:</span> {totalSum.toLocaleString()} UZS
        </div>

        <button
          className="form__button"
          onClick={() => {
            if (!token) router.push("/login");
            else onCheckout();
          }}
        >
          {t("card.checkout")}
        </button>
      </div>
    </div>
  );
}
