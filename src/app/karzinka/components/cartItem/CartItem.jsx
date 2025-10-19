"use client";

import React, { useEffect, useMemo, useState } from "react";
import useDebouncedCartSaver from "../../../../hooks/useDebouncedCartSaver";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import { units } from "../../../../data/unit"; // <-- bu joyda unit tarjimalari saqlangan

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
      new CustomEvent("cart:sync", { detail: { source: "cart-item" } })
    );
  } catch (e) {
    console.error("localStorage carts yozishda xato:", e);
  }
}

const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
  const { t, i18n } = useTranslation("global");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { saveLater /*, isSyncing*/ } = useDebouncedCartSaver({
    token,
    debounceMs: 600,
  });

  const productId =
    (item && (item.productid || item.productId || item.id)) || null;
  const unitPrice = Number(item && item.price) || 0;

  const [qty, setQty] = useState(Number(item && item.quantity) || 0);

  useEffect(() => {
    setQty(Number(item && item.quantity) || 0);
  }, [item && item.quantity, productId]);

  const totalPrice = useMemo(
    () => unitPrice * (Number(qty) || 0),
    [unitPrice, qty]
  );

  const basePatch = {
    name: item && item.name,
    imageurl: item && item.imageurl,
    price: unitPrice,
    desc: item && item.desc,
  };

  const lang = i18n.language?.toLowerCase() || "uz_uz";
  const unitData = units[item?.unit?.toLowerCase()];
  const unitText = unitData ? unitData[lang] || unitData.uz_uz : item?.unit;

  const handleIncrease = () => {
    setQty((prev) => {
      const next = (Number(prev) || 0) + 1;

      writeLocalCart(productId, next, basePatch);

      if (onIncrease) onIncrease();

      if (token) {
        const state = (Number(prev) || 0) > 0 ? "Update" : "Create";
        saveLater(productId, next, state);
      }

      return next;
    });
  };

  const handleDecrease = () => {
    setQty((prev) => {
      const cur = Number(prev) || 0;
      const next = Math.max(0, cur - 1);

      writeLocalCart(productId, next, basePatch);

      if (next <= 0) {
        if (onRemove) onRemove();
      } else {
        if (onDecrease) onDecrease();
      }

      if (token) {
        const state = next <= 0 ? "Delete" : "Update";
        saveLater(productId, next, state);
      }

      return next;
    });
  };

  const handleRemove = () => {
    setQty(0);
    writeLocalCart(productId, 0, basePatch);
    if (onRemove) onRemove();
    if (token) saveLater(productId, 0, "Delete");
  };

  return (
    <div className="cart-item">
      <div className="item-info">
        {item && item.imageurl ? (
          <Image
            src={"https://api.bsgazobeton.uz" + item.imageurl}
            alt={(item && item.name) || ""}
            width={80}
            height={48}
          />
        ) : null}
        <div className="item-text">
          <div className="name">{item && item.name}</div>
          {item && item.desc ? <div className="desc">{item.desc}</div> : null}
        </div>
      </div>

      {/* ✅ Tarjima qilingan birlik bilan narx */}
      <div className="item-price">
        {unitPrice.toLocaleString()} {t("header.priceUnit")}/{unitText}
      </div>

      <div className="item-quantity">
        <button type="button" onClick={handleDecrease} aria-label="Decrease">
          −
        </button>
        <span>{qty}</span>
        <button type="button" onClick={handleIncrease} aria-label="Increase">
          +
        </button>
      </div>

      <div className="remove-item">
        <p className="item-total">
          {totalPrice.toLocaleString()} {t("header.priceUnit")}
        </p>
        <button type="button" onClick={handleRemove} aria-label="Remove">
          ×
        </button>
      </div>
    </div>
  );
};

export default CartItem;
