"use client";

import React, { useMemo } from "react";
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

  // Agar foydalanuvchi avtorizatsiyadan o‘tgan bo‘lsa, serverdagi cartni olayapmiz
  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Foydalanuvchi kirgan/kirmagan holatga qarab cart tanlanadi
  const items = token ? serverCart?.data || [] : cart || [];
  console.log("Cart items:", items);

  // === ✅ Miqdorni oshirish yoki kamaytirish ===
  const updateQuantity = (productid, delta) => {
    const item = items.find((el) => el.productid === productid);
    if (!item) return;

    if (delta === 1) {
      dispatch(incCart(item));
    } else if (delta === -1) {
      if (item.quantity > 1) dispatch(decCart(item));
      else dispatch(removeFromCart(item));
    }
  };

  // === ✅ Mahsulotni o‘chirish ===
  const removeItem = (productid) => {
    const item = items.find((el) => el.productid === productid);
    if (item) dispatch(removeFromCart(item));
  };

  // === ✅ Umumiy summa ===
  const totalSum = useMemo(
    () =>
      items.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0),
    [items]
  );

  // === ✅ Agar cart bo‘sh bo‘lsa ===
  if (!items || items.length === 0)
    return <div className="container empty__cart">Savat bo‘sh</div>;

  return (
    <div className="container">
      <div className="cart">
        <h2 className="cart__title">Savat: {items.length} ta mahsulot</h2>

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
                <h3 className="cart__details__title">
                  <h4 className="cart__category">{item.productname}</h4>
                </h3>
                <span className="cart__price">
                  {item.price?.toLocaleString()} UZS
                </span>

                <div className="cart__quantity">
                  <button
                    className="cart__quantity__add"
                    onClick={() => updateQuantity(item.productid, -1)}
                  >
                    <Image
                      className="cart__quantity__add__img"
                      src={minusIcon}
                      alt="minus"
                    />
                  </button>

                  <span className="cart__quantity__text">{item.quantity}</span>

                  <button
                    className="cart__quantity__add"
                    onClick={() => updateQuantity(item.productid, 1)}
                  >
                    <Image
                      className="cart__quantity__add__img"
                      src={plusIcon}
                      alt="plus"
                    />
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
          Umumiy: {totalSum?.toLocaleString()} UZS{" "}
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
