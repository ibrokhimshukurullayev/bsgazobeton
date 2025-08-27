"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import compare from "../../../assets/images/compare.png";
import { useGetProductSingleQuery } from "../../../context/productApi";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import useDebouncedCartSaver from "../../../hooks/useDebouncedCartSaver";
import { useDispatch, useSelector } from "react-redux";
import plus from "../../../assets/images/plus.svg";
import minus from "../../../assets/images/minus.svg";
import { useGetUserOrdersQuery } from "../../../context/orderApi";
import {
  addToCart,
  decCart,
  incCart,
  removeFromCart,
} from "../../../context/cartSlice";

import "./single.scss";

const toI18nCode = (lang) => (lang || "uz_Uz").slice(0, 2).toLowerCase();

const ProductDetail = ({ productId }) => {
  const dispatch = useDispatch();

  const { t, i18n } = useTranslation("global");
  const localCart = useSelector((s) => s.cart.value);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "uz_Uz";
    return localStorage.getItem("language") || "uz_Uz";
  });

  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  const {
    data: product,
    isLoading,
    isError,
    refetch: refetchProduct,
  } = useGetProductSingleQuery(productId, {
    skip: !productId,
  });

  const { saveLater, isSyncing } = useDebouncedCartSaver({
    token,
    debounceMs: 1000,
  });

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
      dispatch(addToCart(product?.data));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  const handleInc = () => {
    if (!token) {
      dispatch(incCart(product?.data));
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
      if (cur <= 1) dispatch(removeFromCart(product?.data));
      else dispatch(decCart(product?.data));
      return;
    }
    const prev = Math.max(0, baseQty + delta);
    const next = Math.max(0, prev - 1);
    setDelta((d) => Math.max(-baseQty, d - 1));
    saveLater(productId, next, nextState(prev, next));
  };

  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang = e?.detail || localStorage.getItem("language") || "uz_Uz";
      setLanguage(newLang);

      const code = toI18nCode(newLang);
      i18n.changeLanguage(code);
    };

    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, [i18n]);

  useEffect(() => {
    refetchProduct();
  }, [language]);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (isError) return <p>Xatolik yuz berdi</p>;
  if (!product || !product.data) return <p>Mahsulot topilmadi</p>;

  const productData = product.data;

  return (
    <div>
      <div id="kataloglink">
        <div className="container kataloglink">
          <div className="kataloglink__link">
            <Link href="/">Bosh sahifa</Link>
            <span>
              <ChevronRight className="icon" />
            </span>
            <p>{productData.name}</p>
          </div>
          <h2>{productData.name}</h2>
        </div>
      </div>

      <div className="product-detail container">
        <div className="image-section">
          <div className="image-section__header">
            <Image
              className="main-image"
              src={`https://api.bsgazobeton.uz${productData.imageurl}`}
              alt="Product"
              width={200}
              height={120}
            />
          </div>

          <div className="description">
            <h3>{t("products.aboutproducts")}</h3>
            <p>{productData.description}</p>
            <h4>{t("products.moreprops")}</h4>
            <div className="catalog-button">
              <button>{t("products.downloadcatalog")}</button>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="price">{productData.price} UZS/m³</div>
          <h4 className="info-section__title">
            {t("products.technicalprops")}
          </h4>

          <div className="specs">
            {Array.isArray(productData.technicaldata) &&
              productData.technicaldata.map((item, idx) => (
                <div className="spec-item" key={idx}>
                  <span>{item.key && item.key[language]}</span>
                  <span>{item.value && item.value[language]}</span>
                </div>
              ))}
          </div>

          {hasQty > 0 ? (
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
          ) : (
            <button
              className="add-to-cart"
              onClick={handleAdd}
              disabled={isSyncing && !!token}
            >
              {t("products.addcards")}
            </button>
          )}
          <a href="#" className="info-section__end">
            <Image src={compare} alt="compare" />
            {t("products.addcompare")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
