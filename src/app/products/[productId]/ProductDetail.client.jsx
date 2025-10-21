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
import { units } from "../../../data/unit";

import "./single.scss";

const toI18nCode = (lang) => (lang || "uz_Uz").slice(0, 2).toLowerCase();

const resolveLangKey = (lng) => {
  const s = String(lng || "").toLowerCase();
  if (s.startsWith("uz")) return "uz_uz";
  if (s.startsWith("ru")) return "ru_ru";
  if (s.startsWith("en")) return "en_us";
  return "uz_uz";
};

const readI18n = (obj, lng) => {
  if (!obj || typeof obj !== "object") return "";
  const key = resolveLangKey(lng);
  if (obj[key]) return obj[key];
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

const formatPrice = (value) => {
  const n = Number(value);
  if (!isFinite(n) || isNaN(n)) return "0";
  // O‘zbekiston formatiga mos — "1 000" kabi bo‘ladi
  return n.toLocaleString("uz-UZ");
};

const safeImageUrl = (url) => {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  // agar backend faqat path berayotgan bo‘lsa
  return `https://api.bsgazobeton.uz${url}`;
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

  // serverCart ichidan productni topish (turlar farqi bo'lsa ham ishlasin)
  const serverItem = useMemo(() => {
    if (!token || !serverCart) return null;
    // turli backend formatlari uchun umumiy qatorlar
    const rows =
      serverCart?.data?.list ||
      serverCart?.data ||
      serverCart?.list ||
      serverCart?.items ||
      serverCart?.result ||
      [];
    if (!Array.isArray(rows)) return null;
    return rows.find(
      (x) =>
        String(x?.productid) === String(productId) ||
        String(x?.productId) === String(productId) ||
        String(x?.id) === String(productId)
    );
  }, [token, serverCart, productId]);

  const localItem = useMemo(() => {
    if (!Array.isArray(localCart)) return null;
    return localCart.find(
      (x) =>
        String(x?.productid) === String(productId) ||
        String(x?.productId) === String(productId) ||
        String(x?.id) === String(productId)
    );
  }, [localCart, productId]);

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
    if (!product?.data && !product) return;
    const productObj = product?.data || product;
    if (!token) {
      dispatch(addToCart(productObj));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  const handleInc = () => {
    if (!product?.data && !product) return;
    const productObj = product?.data || product;
    if (!token) {
      dispatch(incCart(productObj));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(productId, next, nextState(prev, next));
  };

  const handleDec = () => {
    if (!product?.data && !product) return;
    const productObj = product?.data || product;
    if (!token) {
      const cur = Number(localItem?.quantity || 0);
      if (cur <= 1) {
        dispatch(removeFromCart(productObj));
      } else {
        dispatch(decCart(productObj));
      }
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
      i18n.changeLanguage(toI18nCode(newLang));
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, [i18n]);

  useEffect(() => {
    // til oʻzgarganda mahsulotni qayta yuklash
    refetchProduct();
  }, [language, refetchProduct]);

  if (isLoading) return <p>{t("common.loading") || "Yuklanmoqda..."}</p>;
  if (isError) return <p>{t("common.error") || "Xatolik yuz berdi"}</p>;

  const productData = product?.data || product;
  if (!productData)
    return <p>{t("products.notFound") || "Mahsulot topilmadi"}</p>;

  // UNIT tarjima (useMemo)
  const langKey = resolveLangKey(language);
  let unitData = null;
  if (productData?.unit && units) {
    unitData = units[String(productData.unit).toLowerCase()] || null;
  }

  let unitText = "";
  if (unitData) {
    unitText = unitData[langKey] || unitData.uz_uz || productData.unit;
  } else {
    unitText = productData?.unit || "";
  }

  // price formatting
  const priceText = formatPrice(productData.price);

  const imageUrl = safeImageUrl(productData.imageurl);

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
            {imageUrl ? (
              <Image
                className="main-image"
                src={imageUrl}
                alt={productData.name || "Product"}
                width={400}
                height={240}
                // priority yoki placeholder qo`shmoqchi bo`lsangiz shu yerga
              />
            ) : (
              <div className="no-image" aria-hidden>
                {t("products.noImage") || "Rasm mavjud emas"}
              </div>
            )}
          </div>

          <div className="description">
            <h3>{t("products.aboutproducts")}</h3>
            <div
              className="product-description"
              // Eslatma: agar backend HTML yuboradigan bo'lsa, u toza ekanligiga ishonch hosil qiling.
              dangerouslySetInnerHTML={{
                __html: productData.description || "",
              }}
            />
            <h4>{t("products.moreprops")}</h4>
            <div className="catalog-button">
              <button type="button">{t("products.downloadcatalog")}</button>
            </div>
          </div>
        </div>

        <div className="info-section">
          <div className="price" aria-live="polite">
            {priceText} {t("header.priceUnit")}/{unitText}
          </div>

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
            <div
              className="quantity-control"
              role="group"
              aria-label={t("products.quantity")}
            >
              <button
                className="quantity-btn"
                onClick={handleDec}
                aria-label={t("products.decrease")}
                disabled={isSyncing && !!token}
              >
                <Image src={minus} alt="minus" />
              </button>
              <p className="quantity-value">
                {uiQty} <span>{unitText}</span>
              </p>
              <button
                className="quantity-btn"
                onClick={handleInc}
                aria-label={t("products.increase")}
                disabled={isSyncing && !!token}
              >
                <Image src={plus} alt="plus" />
              </button>
            </div>
          ) : (
            <button
              className="add-to-cart"
              onClick={handleAdd}
              disabled={isSyncing && !!token}
              aria-disabled={isSyncing && !!token}
            >
              {t("products.addcards")}
            </button>
          )}

          <a
            href="#"
            className="info-section__end"
            aria-label={t("products.addcompare")}
          >
            <Image src={compare} alt="compare" />
            {t("products.addcompare")}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
