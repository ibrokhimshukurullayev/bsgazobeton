"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import {
  addToCart,
  incCart,
  decCart,
  removeFromCart,
} from "../../context/cartSlice";
import { toggleToWishes } from "../../context/wishlistSlice";
import Image from "next/image";
import "./productPicker.scss";

import product1 from "../../assets/images/product1.svg";

function getName(cat, lang = "uz_uz") {
  if (!cat) return "";
  if (typeof cat.name === "string" && cat.name) return cat.name;
  return (
    cat?.name?.[lang] ||
    cat?.name?.uz_uz ||
    cat?.name?.ru_ru ||
    cat?.name?.en_us ||
    ""
  );
}

export default function ProductPicker() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);

  const [language, setLanguage] = useState(
    typeof window !== "undefined"
      ? localStorage.getItem("language") || "uz_uz"
      : "uz_uz"
  );
  const [selectedRoot, setSelectedRoot] = useState("");

  const { data: catRes } = useGetCategoryQuery({ skip: 0, take: 1000 });
  const { data: prodRes } = useGetProductQuery({ skip: 0, take: 1000 });

  const categories = catRes?.data?.list || [];
  const products = prodRes?.data?.list || [];

  // Root kategoriyalar
  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentproductcategoryid),
    [categories]
  );

  // Birinchi rootni default tanlab qo‘yish
  useEffect(() => {
    if (!selectedRoot && rootCategories.length) {
      setSelectedRoot(String(rootCategories[0].productcategoryid));
    }
  }, [rootCategories, selectedRoot]);

  // Child kategoriyalar
  const childCategories = useMemo(
    () =>
      categories.filter(
        (c) => String(c.parentproductcategoryid) === String(selectedRoot)
      ),
    [categories, selectedRoot]
  );

  // Mahsulotlarni categoryId bo‘yicha olish
  const productsByCategory = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const key = String(p.productcategoryid);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    }
    return map;
  }, [products]);

  // Texnik ma’lumotni faqat 3 ta chiqarish
  function renderTechnicalData(prod) {
    if (!prod.technicaldata) return null;
    let tech;
    try {
      tech = JSON.parse(prod.technicaldata);
    } catch {
      tech = {};
    }
    const entries = Object.entries(tech).slice(0, 3);
    return (
      <ul className="tech-list">
        {entries.map(([key, value]) => (
          <li key={key}>
            <span className="tech-key">{key}:</span> {value}
          </li>
        ))}
      </ul>
    );
  }

  // Savatdagi mahsulotni olish
  function getCartItem(prod) {
    return cart.find((item) => item.productid === prod.productid);
  }

  return (
    <div className="product-picker">
      {/* Root kategoriyalar */}
      <ul className="picker__roots">
        {rootCategories.map((root) => (
          <li
            key={root.productcategoryid}
            className={`picker__root ${
              String(selectedRoot) === String(root.productcategoryid)
                ? "active"
                : ""
            }`}
            onClick={() => setSelectedRoot(String(root.productcategoryid))}
          >
            {root?.imageurl ? (
              <Image
                src={`https://api.bsgazobeton.uz${root.imageurl}`}
                alt={getName(root, language)}
                width={80}
                height={50}
              />
            ) : (
              <Image src={product1} alt="product" width={80} height={50} />
            )}
            <p>{getName(root, language)}</p>
          </li>
        ))}
      </ul>

      {/* Child kategoriyalar va mahsulotlar */}
      <div className="picker__body">
        {childCategories.length > 0 ? (
          childCategories.map((child) => (
            <div key={child.productcategoryid} className="picker__category">
              <h4>{getName(child, language)}</h4>
              <div className="picker__products">
                {(
                  productsByCategory.get(String(child.productcategoryid)) || []
                ).map((prod) => {
                  const cartItem = getCartItem(prod);
                  const inWishlist = wishlist.some(
                    (w) => w.productid === prod.productid
                  );
                  return (
                    <div key={prod.productid} className="product-card">
                      <Image
                        src={`https://api.bsgazobeton.uz${prod.imageurl}`}
                        alt={prod.name}
                        width={200}
                        height={150}
                      />
                      <h3 className="product-title">{prod.name}</h3>
                      <p className="product-price">
                        {prod.price} UZS/m<sup>3</sup>
                      </p>
                      {renderTechnicalData(prod)}

                      <div className="card-actions">
                        {/* Savat */}
                        {!cartItem ? (
                          <button
                            className="btn-cart"
                            onClick={() => dispatch(addToCart(prod))}
                          >
                            Savatchaga qo‘shish
                          </button>
                        ) : (
                          <div className="quantity-control">
                            <button
                              className="quantity-btn"
                              onClick={() =>
                                cartItem.quantity > 1
                                  ? dispatch(decCart(prod))
                                  : dispatch(removeFromCart(prod))
                              }
                            >
                              -
                            </button>
                            <span>{cartItem.quantity} m³</span>
                            <button
                              className="quantity-btn"
                              onClick={() => dispatch(incCart(prod))}
                            >
                              +
                            </button>
                          </div>
                        )}

                        {/* Taqqoslash */}
                        <button
                          className={`btn-compare ${
                            inWishlist ? "active" : ""
                          }`}
                          onClick={() => dispatch(toggleToWishes(prod))}
                        >
                          {inWishlist
                            ? "Taqqoslashdan olish"
                            : "Taqqoslashga qo‘shish"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="picker__products">
            {(productsByCategory.get(String(selectedRoot)) || []).map(
              (prod) => {
                const cartItem = getCartItem(prod);
                const inWishlist = wishlist.some(
                  (w) => w.productid === prod.productid
                );
                return (
                  <div key={prod.productid} className="product-card">
                    <Image
                      src={`https://api.bsgazobeton.uz${prod.imageurl}`}
                      alt={prod.name}
                      width={200}
                      height={150}
                    />
                    <h3 className="product-title">{prod.name}</h3>
                    <p className="product-price">
                      {prod.price} UZS/m<sup>3</sup>
                    </p>
                    {renderTechnicalData(prod)}

                    <div className="card-actions">
                      {/* Savat */}
                      {!cartItem ? (
                        <button
                          className="btn-cart"
                          onClick={() => dispatch(addToCart(prod))}
                        >
                          Savatchaga qo‘shish
                        </button>
                      ) : (
                        <div className="quantity-control">
                          <button
                            className="quantity-btn"
                            onClick={() =>
                              cartItem.quantity > 1
                                ? dispatch(decCart(prod))
                                : dispatch(removeFromCart(prod))
                            }
                          >
                            -
                          </button>
                          <span>{cartItem.quantity} m³</span>
                          <button
                            className="quantity-btn"
                            onClick={() => dispatch(incCart(prod))}
                          >
                            +
                          </button>
                        </div>
                      )}

                      {/* Taqqoslash */}
                      <button
                        className={`btn-compare ${inWishlist ? "active" : ""}`}
                        onClick={() => dispatch(toggleToWishes(prod))}
                      >
                        {inWishlist
                          ? "Taqqoslashdan olish"
                          : "Taqqoslashga qo‘shish"}
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </div>
  );
}
