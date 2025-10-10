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
import { useTranslation } from "react-i18next";
import { units } from "../../data/unit";
import "./productPicker.scss";
import product1 from "../../assets/images/product1.svg";

// 🔹 Kategoriya nomini tilga qarab chiqarish
function getTranslatedName(category, lang = "uz_UZ") {
  if (!category) return "";
  if (typeof category.name === "string" && category.name) return category.name;
  return (
    category?.translations?.name?.[lang] ||
    category?.translations?.name?.uz_UZ ||
    category?.translations?.name?.ru_RU ||
    category?.translations?.name?.en_US ||
    ""
  );
}

// 🔹 Unit tarjimasi (har doim 3 tilda ishlaydi)
function getUnitText(unitKey, lang = "uz_UZ") {
  if (!unitKey) return "";
  const unitData = units[unitKey?.toLowerCase()];
  return unitData ? unitData[lang.toLowerCase()] || unitData.uz_uz : unitKey;
}

export default function ProductPicker() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);
  const { t, i18n } = useTranslation("global");

  // 🔹 Hozirgi tilni kuzatish uchun state
  const [language, setLanguage] = useState(
    typeof window !== "undefined"
      ? (
          localStorage.getItem("language") ||
          i18n.language ||
          "uz_UZ"
        ).toLowerCase()
      : "uz_uz"
  );

  // 🔹 i18n tili o‘zgarsa — avtomatik yangilanish
  useEffect(() => {
    const handleLangChange = (lng) => {
      const newLang = lng?.toLowerCase() || "uz_uz";
      localStorage.setItem("language", newLang);
      setLanguage(newLang);
    };

    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n]);

  // 🔹 i18n til kodini bizning JSON formatga moslashtiramiz
  const langMap = {
    uz: "uz_UZ",
    ru: "ru_RU",
    en: "en_US",
    uz_uz: "uz_UZ",
    ru_ru: "ru_RU",
    en_us: "en_US",
  };
  const lang = langMap[language] || "uz_UZ";

  const [selectedRoot, setSelectedRoot] = useState("");
  const { data: catRes } = useGetCategoryQuery({ skip: 0, take: 1000 });
  const { data: prodRes } = useGetProductQuery({ skip: 0, take: 1000 });

  const categories = catRes?.data?.list || [];
  const products = prodRes?.data?.list || [];

  const rootCategories = useMemo(
    () => categories.filter((c) => !c.parentproductcategoryid),
    [categories]
  );

  useEffect(() => {
    if (!selectedRoot && rootCategories.length) {
      setSelectedRoot(String(rootCategories[0].productcategoryid));
    }
  }, [rootCategories, selectedRoot]);

  const childCategories = useMemo(
    () =>
      categories.filter(
        (c) => String(c.parentproductcategoryid) === String(selectedRoot)
      ),
    [categories, selectedRoot]
  );

  const productsByCategory = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const key = String(p.productcategoryid);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    }
    return map;
  }, [products]);

  // 🔹 Texnik ma'lumotlar (3tasi)
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

  function getCartItem(prod) {
    return cart.find((item) => item.productid === prod.productid);
  }

  return (
    <div className="product-picker">
      {/* 🔹 Root kategoriyalar */}
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
                alt={getTranslatedName(root, lang)}
                width={80}
                height={50}
              />
            ) : (
              <Image src={product1} alt="product" width={80} height={50} />
            )}
            <p>{getTranslatedName(root, lang)}</p>
          </li>
        ))}
      </ul>

      {/* 🔹 Kategoriyalar bo‘yicha mahsulotlar */}
      <div className="picker__body">
        {childCategories.length > 0 ? (
          childCategories.map((child) => (
            <div key={child.productcategoryid} className="picker__category">
              <h4>{getTranslatedName(child, lang)}</h4>
              <div className="picker__products">
                {(
                  productsByCategory.get(String(child.productcategoryid)) || []
                ).map((prod) => {
                  const cartItem = getCartItem(prod);
                  const inWishlist = wishlist.some(
                    (w) => w.productid === prod.productid
                  );
                  const unitText = getUnitText(prod.unit, lang); // ✅ endi to‘g‘ri yangilanadi

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
                        {prod.price} {t("header.priceUnit")} / {unitText}
                      </p>

                      {renderTechnicalData(prod)}

                      <div className="card-actions">
                        {!cartItem ? (
                          <button
                            className="btn-cart"
                            onClick={() => dispatch(addToCart(prod))}
                          >
                            {t("products.addcards")}
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
                            <span>
                              {cartItem.quantity} {unitText}
                            </span>
                            <button
                              className="quantity-btn"
                              onClick={() => dispatch(incCart(prod))}
                            >
                              +
                            </button>
                          </div>
                        )}

                        <button
                          className={`btn-compare ${
                            inWishlist ? "active" : ""
                          }`}
                          onClick={() => dispatch(toggleToWishes(prod))}
                        >
                          {inWishlist
                            ? t("products.removecompare")
                            : t("products.addcompare")}
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
                const unitText = getUnitText(prod.unit, lang); // ✅ hamma joyda bir xil ishlaydi

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
                      {prod.price} {t("header.priceUnit")} / {unitText}
                    </p>

                    {renderTechnicalData(prod)}

                    <div className="card-actions">
                      {!cartItem ? (
                        <button
                          className="btn-cart"
                          onClick={() => dispatch(addToCart(prod))}
                        >
                          {t("products.addcards")}
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
                          <span>
                            {cartItem.quantity} {unitText}
                          </span>
                          <button
                            className="quantity-btn"
                            onClick={() => dispatch(incCart(prod))}
                          >
                            +
                          </button>
                        </div>
                      )}

                      <button
                        className={`btn-compare ${inWishlist ? "active" : ""}`}
                        onClick={() => dispatch(toggleToWishes(prod))}
                      >
                        {inWishlist
                          ? t("products.removecompare")
                          : t("products.addcompare")}
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
