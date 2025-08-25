"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import compare from "../../../assets/images/compare.png";
import { useGetProductSingleQuery } from "../../../context/productApi";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import "./single.scss";

const toI18nCode = (lang) => (lang || "uz_Uz").slice(0, 2).toLowerCase();

const ProductDetail = ({ productId }) => {
  const { t, i18n } = useTranslation("global");

  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "uz_Uz";
    return localStorage.getItem("language") || "uz_Uz";
  });

  const {
    data: product,
    isLoading,
    isError,
    refetch: refetchProduct,
  } = useGetProductSingleQuery(productId, {
    skip: !productId,
  });

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

          <button className="add-to-cart">{t("products.addcards")}</button>
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
