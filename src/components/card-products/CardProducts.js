"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incCart,
  decCart,
  removeFromCart,
} from "../../context/cartSlice";
import { useTranslation } from "react-i18next";

import { toggleToWishes } from "../../context/wishlistSlice";
import Link from "next/link";
import Image from "next/image";
import compare from "../../assets/images/compare.png";
import plus from "../../assets/images/plus.svg";
import minus from "../../assets/images/minus.svg";
import useDebouncedCartSaver from "../../hooks/useDebouncedCartSaver";
import { useGetUserOrdersQuery } from "../../context/orderApi";

import "./cardproducts.scss";

const CardProducts = ({ el }) => {
  const dispatch = useDispatch();
  const localCart = useSelector((s) => s.cart.value);
  const wishlist = useSelector((s) => s.wishlist.value);
  const { t, i18n } = useTranslation("global");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const { saveLater, isSyncing } = useDebouncedCartSaver({
    token,
    debounceMs: 1000,
  });

  const productId = el.productid;

  const serverItem = useMemo(
    () =>
      token ? serverCart?.data?.find((x) => x.productid === productId) : null,
    [token, serverCart, productId]
  );
  const localItem = useMemo(
    () => localCart?.find((x) => x.productid === productId),
    [localCart, productId]
  );

  const baseQty = Number(serverItem?.quantity ?? 0);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setDelta(0);
  }, [token, baseQty]);

  const uiQty = token ? baseQty + delta : Number(localItem?.quantity ?? 0);
  const hasQty = uiQty > 0;

  const nextState = (prev, next) =>
    next === 0 ? "Delete" : prev === 0 ? "Create" : "Update";

  const handleAdd = () => {
    if (!token) {
      dispatch(addToCart(el));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  const handleInc = () => {
    if (!token) {
      dispatch(incCart(el));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  const handleDec = () => {
    if (!token) {
      const cur = Number(localItem?.quantity || 0);
      if (cur <= 1) dispatch(removeFromCart(el));
      else dispatch(decCart(el));
      return;
    }
    const prev = Math.max(0, baseQty + delta);
    const next = Math.max(0, prev - 1);
    setDelta((d) => Math.max(-baseQty, d - 1));
    saveLater(productId, next, nextState(prev, next));
  };

  return (
    <div key={productId} className="card">
      <div className="product__card">
        <Link href={`/products/${el.productid}`} prefetch={false}>
          <Image
            src={`https://api.bsgazobeton.uz${el?.imageurl}`}
            className="product__img"
            alt={el.name}
            width={192}
            height={120}
          />
        </Link>

        <h3>{el.name}</h3>

        <h4 className="product__price">{el.price} UZS/m3</h4>

        {!hasQty ? (
          <button className="add-to-cart" onClick={handleAdd}>
            {isSyncing && token ? <span className="spinner" /> : null}
            {t("products.addcards")}
          </button>
        ) : (
          <div className="quantity-control">
            <button className="quantity-btn" onClick={handleDec}>
              <Image src={minus} alt="minus" />
            </button>
            <p className="quantity-value">
              {uiQty} <span>m³</span>
            </p>
            <button className="quantity-btn" onClick={handleInc}>
              <Image src={plus} alt="plus" />
            </button>
          </div>
        )}

        <p
          className="product__card__compare"
          onClick={() => dispatch(toggleToWishes(el))}
        >
          <Image src={compare} alt="compare" width={24} height={24} />
          {wishlist.some((item) => item.productid === productId) ? (
            <>
              <span className="red-dot"></span>
              {t("products.removecompare")}
            </>
          ) : (
            <p>{t("products.addcompare")}</p>
          )}
        </p>
      </div>
    </div>
  );
};

export default CardProducts;

// "use client";

// import React from "react";
// import "./cardproducts.scss";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   addToCart,
//   incCart,
//   decCart,
//   removeFromCart,
// } from "../../context/cartSlice";
// import { toggleToWishes } from "../../context/wishlistSlice";
// import Link from "next/link";
// import Image from "next/image";
// import compare from "../../assets/images/compare.png";
// import plus from "../../assets/images/plus.svg";
// import minus from "../../assets/images/minus.svg";

// const CardProducts = ({ el }) => {
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart.value);
//   const wishlist = useSelector((state) => state.wishlist.value);

//   const inCart = cart.find((item) => item.productid === el.productid);

//   return (
//     <div key={el.productid} className="card">
//       <div className="product__card">
//         <Link href={`/products/${el.productid}`} prefetch={false}>
//           <Image
//             src={`https://api.bsgazobeton.uz${el?.imageurl}`}
//             className="product__img"
//             alt={el.name}
//             width={192}
//             height={120}
//           />
//         </Link>

//         <h3>{el.name}</h3>

//         {el.technicaldata &&
//           Array.isArray(el.technicaldata) &&
//           el.technicaldata.slice(0, 3).map((item, idx) => {
//             const lang =
//               localStorage.getItem("language")?.toLowerCase() || "uz_uz";
//             return (
//               <div className="product__card__text" key={idx}>
//                 <p>{item.key?.[lang] || "-"}</p>
//                 <p>{item.value?.[lang] || "-"}</p>
//               </div>
//             );
//           })}

//         <h4 className="product__price">{el.price} UZS/m3</h4>

//         {!inCart ? (
//           <button
//             className="add-to-cart"
//             onClick={() => dispatch(addToCart(el))}
//           >
//             Savatga qo‘shish
//           </button>
//         ) : (
//           <div className="quantity-control">
//             <button
//               className="quantity-btn"
//               onClick={() =>
//                 inCart.quantity <= 1
//                   ? dispatch(removeFromCart(el))
//                   : dispatch(decCart(el))
//               }
//             >
//               <Image src={minus} alt="minus" />
//             </button>
//             <p className="quantity-value">
//               {inCart.quantity} <span>m³</span>
//             </p>
//             <button
//               className="quantity-btn"
//               onClick={() => dispatch(incCart(el))}
//             >
//               <Image src={plus} alt="plus" />
//             </button>
//           </div>
//         )}

//         <p
//           className="product__card__compare"
//           onClick={() => dispatch(toggleToWishes(el))}
//         >
//           <Image src={compare} alt="compare" width={24} height={24} />
//           {wishlist.some((item) => item.productid === el.productid) ? (
//             <>
//               <span className="red-dot"></span>
//               Taqqoslashdan olish
//             </>
//           ) : (
//             "Taqqoslashga qo‘shish"
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CardProducts;
