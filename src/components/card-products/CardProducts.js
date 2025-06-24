"use client";

import React from "react";
import "./cardproducts.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incCart,
  decCart,
  removeFromCart, // 🛠️ SHUNI QO‘SHING
} from "../../context/cartSlice";
import { toggleToWishes } from "../../context/wishlistSlice";
import Link from "next/link";
import Image from "next/image";
import compare from "../../assets/images/compare.png";
import plus from "../../assets/images/plus.svg";
import minus from "../../assets/images/minus.svg";

const CardProducts = ({ el }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);

  const inCart = cart.find((item) => item.productId === el.productId);

  return (
    <div key={el.productId} className="card">
      <div className="product__card">
        <Link href={`/single/${el.productId}`}>
          <img className="product__img" src={el.imageUrl} alt={el.name} />
        </Link>

        <h3>{el.name}</h3>

        {el.technicalData &&
          Object.entries(JSON.parse(el.technicalData))
            .slice(0, 3)
            .map(([key, value], idx) => (
              <div className="product__card__text" key={idx}>
                <p>{key}:</p>
                <p>{value}</p>
              </div>
            ))}

        <h4 className="product__price">{el.price} UZS/m3</h4>

        {/* Savatga qo‘shish yoki +/- tugmalar */}
        {!inCart ? (
          <button
            className="add-to-cart"
            onClick={() => dispatch(addToCart(el))}
          >
            Savatga qo‘shish
          </button>
        ) : (
          <div className="quantity-control">
            <button
              className="quantity-btn"
              onClick={() =>
                inCart.quantity <= 1
                  ? dispatch(removeFromCart(el))
                  : dispatch(decCart(el))
              }
            >
              <Image src={minus} />
            </button>
            <p className="quantity-value">
              {inCart.quantity} <span>m3</span>
            </p>
            <button
              className="quantity-btn"
              onClick={() => dispatch(incCart(el))}
            >
              <Image src={plus} />
            </button>
          </div>
        )}

        <p
          className="product__card__compare"
          onClick={() => dispatch(toggleToWishes(el))}
        >
          <Image src={compare} alt="compare" width={24} height={24} />
          {wishlist.some((item) => item.productId === el.productId) ? (
            <>
              <span className="red-dot"></span>
              Taqqoslashdan olish
            </>
          ) : (
            "Taqqoslashga qo‘shish"
          )}
        </p>
      </div>
    </div>
  );
};

export default CardProducts;
