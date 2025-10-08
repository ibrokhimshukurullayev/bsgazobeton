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

export default function ProductPicker() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);
  const wishlist = useSelector((state) => state.wishlist.value);
  const { t, i18n } = useTranslation("global");

  // ✅ To‘g‘ri til state
  const [language, setLanguage] = useState(i18n.language.toLowerCase() || "uz");

  // ✅ i18n languageChanged event bilan tinglash
  useEffect(() => {
    const handleLangChange = (lng) => setLanguage(lng.toLowerCase());
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n]);

  // ✅ i18next tili backend formatiga mos
  const langMap = {
    uz: "uz_UZ",
    ru: "ru_RU",
    en: "en_US",
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

  // 🔹 Unit tarjimasi
  function getUnitText(unitKey) {
    if (!unitKey) return "";
    const unitData = units[unitKey.toLowerCase()];
    if (!unitData) return unitKey;
    return unitData[lang.toLowerCase()] || unitData.uz_uz;
  }

  // 🔹 Texnik ma'lumotlar
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
            {root?.translations?.imageUrl ? (
              <Image
                src={`https://api.bsgazobeton.uz${root.translations.imageUrl[lang]}`}
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
                  const unitText = getUnitText(prod.unit);

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
                        {prod.price} UZS / {unitText}
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
                const unitText = getUnitText(prod.unit);

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
                      {prod.price} {t("header.priceUnit")}/{unitText}
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
