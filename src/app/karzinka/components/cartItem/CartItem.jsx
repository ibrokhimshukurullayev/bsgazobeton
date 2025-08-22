"use client";

import React, { useEffect, useMemo, useState } from "react";
import useDebouncedCartSaver from "../../../../hooks/useDebouncedCartSaver";
import Image from "next/image";

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
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 600ms ichida bosishlarni bitta batch qilib yuboradi
  const { saveLater /*, isSyncing*/ } = useDebouncedCartSaver({
    token,
    debounceMs: 600,
  });

  const productId =
    (item && (item.productid || item.productId || item.id)) || null;
  const unitPrice = Number(item && item.price) || 0;

  // 🔴 Optimistik lokal quantity — tez bosishlarda UI darhol yangilanadi
  const [qty, setQty] = useState(Number(item && item.quantity) || 0);

  // Parentdan kelgan quantity o‘zgarsa, sinxronlab qo‘yamiz
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

  const handleIncrease = () => {
    setQty((prev) => {
      const next = (Number(prev) || 0) + 1;

      // local
      writeLocalCart(productId, next, basePatch);

      // ota-komponentga xabar (ixtiyoriy)
      if (onIncrease) onIncrease();

      // server
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

      <div className="item-price">
        {unitPrice.toLocaleString()} UZS/m<sup>3</sup>
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
        <p className="item-total">{totalPrice.toLocaleString()} UZS</p>
        <button type="button" onClick={handleRemove} aria-label="Remove">
          ×
        </button>
        {/* {isSyncing ? <small>sync...</small> : null} */}
      </div>
    </div>
  );
};

export default CartItem;

// "use client";

// import useDebouncedCartSaver from "../../../../hooks/useDebouncedCartSaver";
// import Image from "next/image";
// import { useMemo } from "react";

// function writeLocalCart(productid, nextQuantity, patch = {}) {
//   try {
//     const raw = localStorage.getItem("carts");
//     const list = raw ? JSON.parse(raw) : [];
//     const idx = list.findIndex((x) => x?.productid === productid);

//     if (nextQuantity <= 0) {
//       const next =
//         idx === -1 ? list : list.filter((x) => x.productid !== productid);
//       localStorage.setItem("carts", JSON.stringify(next));
//     } else {
//       if (idx === -1) {
//         localStorage.setItem(
//           "carts",
//           JSON.stringify([
//             ...list,
//             { productid, quantity: nextQuantity, ...patch },
//           ])
//         );
//       } else {
//         const next = list.map((x, i) =>
//           i === idx ? { ...x, quantity: nextQuantity, ...patch } : x
//         );
//         localStorage.setItem("carts", JSON.stringify(next));
//       }
//     }
//     window.dispatchEvent(
//       new CustomEvent("cart:sync", { detail: { source: "cart-item" } })
//     );
//   } catch (e) {
//     console.error("localStorage carts yozishda xato:", e);
//   }
// }

// const CartItem = ({ item, onIncrease, onDecrease, onRemove }) => {
//   // token bo'lsa serverga yuboramiz
//   const token =
//     typeof window !== "undefined" ? localStorage.getItem("token") : null;

//   // 600ms ichida bosilganlarini bitta /orders/save ga yuboradi
//   const { saveLater, isSyncing } = useDebouncedCartSaver({
//     token,
//     debounceMs: 600,
//   });

//   const productId = item?.productid ?? item?.productId ?? item?.id;
//   const unitPrice = Number(item?.price) || 0;
//   const totalPrice = useMemo(
//     () => unitPrice * (Number(item?.quantity) || 0),
//     [unitPrice, item?.quantity]
//   );

//   const handleIncrease = () => {
//     const next = (Number(item?.quantity) || 0) + 1;

//     // 1) Lokalni darhol yangilash
//     writeLocalCart(productId, next, {
//       name: item?.name,
//       imageurl: item?.imageurl,
//       price: unitPrice,
//       desc: item?.desc,
//     });

//     // 2) UI ota-komponentga xabar (agar berilgan bo'lsa)
//     onIncrease?.();

//     // 3) Serverga batch (token bo'lsa)
//     if (token) {
//       // mavjud bo'lsa Update, bo'lmasa Create deb jo'natamiz
//       const state = (item?.quantity ?? 0) > 0 ? "Update" : "Create";
//       saveLater(productId, next, state);
//     }
//   };

//   const handleDecrease = () => {
//     const cur = Number(item?.quantity) || 0;
//     const next = Math.max(0, cur - 1);

//     // 1) Lokal yangilash
//     writeLocalCart(productId, next);

//     // 2) UI ota-komponentga xabar
//     if (next <= 0) onRemove?.();
//     else onDecrease?.();

//     // 3) Serverga batch
//     if (token) {
//       const state = next <= 0 ? "Delete" : "Update";
//       saveLater(productId, next, state);
//     }
//   };

//   const handleRemove = () => {
//     // 1) Lokal o'chirish
//     writeLocalCart(productId, 0);

//     // 2) UI ota-komponentga xabar
//     onRemove?.();

//     // 3) Serverga batch
//     if (token) {
//       saveLater(productId, 0, "Delete");
//     }
//   };

//   return (
//     <div className="cart-item">
//       <div className="item-info">
//         {item?.imageurl && (
//           <Image
//             src={`https://api.bsgazobeton.uz${item?.imageurl}`}
//             alt={item?.name || ""}
//             width={80}
//             height={48}
//           />
//         )}
//         <div className="item-text">
//           <div className="name">{item?.name}</div>
//           {item?.desc ? <div className="desc">{item?.desc}</div> : null}
//         </div>
//       </div>

//       <div className="item-price">{unitPrice.toLocaleString()} UZS</div>

//       <div className="item-quantity">
//         <button onClick={handleDecrease} aria-label="Decrease">
//           −
//         </button>
//         <span>{item?.quantity}</span>
//         <button onClick={handleIncrease} aria-label="Increase">
//           +
//         </button>
//       </div>

//       <div className="remove-item">
//         <p className="item-total">{totalPrice.toLocaleString()} UZS</p>
//         <button onClick={handleRemove} aria-label="Remove">
//           ×
//         </button>
//         {/* ixtiyoriy: syncing indikator */}
//       </div>
//     </div>
//   );
// };

// export default CartItem;
