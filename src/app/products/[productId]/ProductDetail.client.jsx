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

// i18n (frontend) uchun: "uz_Uz" -> "uz"
const toI18nCode = (lang) => (lang || "uz_Uz").slice(0, 2).toLowerCase();

// backend kalitlari uchun: "uz_Uz" | "uz" -> "uz_uz"
const resolveLangKey = (lng) => {
  const s = String(lng || "").toLowerCase();
  if (s.startsWith("uz")) return "uz_uz";
  if (s.startsWith("ru")) return "ru_ru";
  if (s.startsWith("en")) return "en_us";
  return "uz_uz";
};

// i18n obyektidan qiymatni xavfsiz o‘qish
const readI18n = (obj, lng) => {
  if (!obj || typeof obj !== "object") return "";
  const key = resolveLangKey(lng); // masalan "uz_uz"
  if (obj[key]) return obj[key];

  // qisqa (uz/ru/en) bo‘lsa
  const short = key.slice(0, 2);
  return (
    obj[short] ||
    obj.uz_uz ||
    obj.ru_ru ||
    obj.en_us ||
    obj.uz ||
    obj.ru ||
    obj.en ||
    ""
  );
};

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

  // Server cart (agar token bo‘lsa)
  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // Mahsulotni olish
  const {
    data: product,
    isLoading,
    isError,
    refetch: refetchProduct,
  } = useGetProductSingleQuery(productId, {
    skip: !productId,
  });

  // Serverga batch saqlash
  const { saveLater, isSyncing } = useDebouncedCartSaver({
    token,
    debounceMs: 1000,
  });

  // Joriy mahsulot cartdagi yozuvi
  const serverItem = useMemo(() => {
    if (!token) return null;
    // serverCart tuzilmasi: data yoki list bo‘lishi mumkin — moslashuvchan o‘qiymiz
    const rows =
      serverCart?.data?.list ||
      serverCart?.data ||
      serverCart?.list ||
      serverCart?.items ||
      serverCart?.result ||
      [];
    return Array.isArray(rows)
      ? rows.find((x) => x.productid === productId)
      : null;
  }, [token, serverCart, productId]);

  const localItem = useMemo(
    () =>
      Array.isArray(localCart)
        ? localCart.find((x) => x.productid === productId)
        : null,
    [localCart, productId]
  );

  // Serverdagi bazaviy qty + bu sessiyada qilgan o‘zgarishlar
  const baseQty = Number(serverItem?.quantity ?? 0);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setDelta(0);
  }, [token, baseQty]);

  const uiQty = token ? baseQty + delta : Number(localItem?.quantity ?? 0);
  const hasQty = uiQty > 0;

  const nextState = (prev, next) =>
    next === 0 ? "Delete" : prev === 0 ? "Create" : "Update";

  // Qo‘shish
  const handleAdd = () => {
    if (!token) {
      if (product?.data) dispatch(addToCart(product.data));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  // +
  const handleInc = () => {
    if (!token) {
      if (product?.data) dispatch(incCart(product.data));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  // -
  const handleDec = () => {
    if (!token) {
      const cur = Number(localItem?.quantity || 0);
      if (cur <= 1) {
        if (product?.data) dispatch(removeFromCart(product.data));
      } else {
        if (product?.data) dispatch(decCart(product.data));
      }
      return;
    }
    const prev = Math.max(0, baseQty + delta);
    const next = Math.max(0, prev - 1);
    setDelta((d) => Math.max(-baseQty, d - 1));
    saveLater(productId, next, nextState(prev, next));
  };

  // Til o‘zgarganda i18n va refetch
  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang = e?.detail || localStorage.getItem("language") || "uz_Uz";
      setLanguage(newLang);
      i18n.changeLanguage(toI18nCode(newLang));
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, [i18n]);

  useEffect(() => {
    refetchProduct();
  }, [language, refetchProduct]);

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
              alt={productData.name || "Product"}
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
            {Array.isArray(productData?.technicaldata) &&
              productData.technicaldata.map((item, idx) => (
                <div className="spec-item" key={idx}>
                  <span>{readI18n(item?.key, language)}</span>
                  <span>{readI18n(item?.value, language)}</span>
                </div>
              ))}
          </div>

          {hasQty ? (
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
