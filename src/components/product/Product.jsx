"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../../context/categoryApi";

import product1 from "../../assets/images/product1.svg";
import "./product.scss";

function langKeyOf(i18nLang) {
  const l = String(i18nLang || "").toLowerCase();
  if (l.startsWith("ru")) return "ru_ru";
  if (l.startsWith("en")) return "en_us";
  return "uz_uz";
}

function getLabel(cat, langKey) {
  if (!cat) return "";
  if (typeof cat.name === "string" && cat.name) return cat.name;
  const fromName =
    cat?.name?.[langKey] ||
    cat?.name?.uz_uz ||
    cat?.name?.ru_ru ||
    cat?.name?.en_us;
  if (fromName) return String(fromName);
  const tr = cat?.translations?.name;
  const fromTr =
    (tr && (tr[langKey] || tr.uz_uz || tr.ru_ru || tr.en_us)) || "";
  return String(fromTr);
}

const Product = () => {
  const router = useRouter();
  const { t, i18n } = useTranslation("global");

  const [language, setLanguage] = useState(() => {
    return (
      (typeof window !== "undefined" && localStorage.getItem("language")) ||
      "uz_Uz"
    );
  });
  const [loadingId, setLoadingId] = useState(null);

  const handleButtonClick = async (categoryId) => {
    setLoadingId(categoryId);
    try {
      router.push(`/katalog?productcategoryid=${categoryId}`);
    } finally {
      setLoadingId(null);
    }
  };

  const {
    data: dataGetCategory,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryQuery({ skip: 0, take: 1000 });

  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang =
        (e && e.detail) ||
        (typeof window !== "undefined" && localStorage.getItem("language")) ||
        "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  useEffect(() => {
    refetchCategory();
  }, [language, refetchCategory]);

  const langKey = langKeyOf(i18n.language);
  const parentCategories = useMemo(() => {
    const list = dataGetCategory?.data?.list || [];
    // Faqat PARENT (root) lar
    const onlyParents = list.filter((c) => !c.parentproductcategoryid);
    // Pozitsiya/order bo‘yicha sart
    return onlyParents.sort((a, b) => {
      const pa = a.position ?? a.order ?? 0;
      const pb = b.position ?? b.order ?? 0;
      return pa - pb;
    });
  }, [dataGetCategory]);

  return (
    <div id="product">
      <div className="container product">
        <h2 className="product__title">{t("mahsulot.title")}</h2>

        {categoryLoading && <div className="product-loading">Yuklanmoqda…</div>}
        {categoryError && (
          <div className="product-error">Xatolik yuz berdi</div>
        )}

        <div className="product-list">
          {parentCategories.map((item) => {
            const id =
              item.productcategoryid ?? item.id ?? item.productCategoryId;
            const label = getLabel(item, langKey);

            return (
              <div className="product-card" key={String(id)}>
                <h3>{label}</h3>

                {item?.imageurl ? (
                  <Image
                    src={`https://api.bsgazobeton.uz${item.imageurl}`}
                    alt={label}
                    width={300}
                    height={200}
                  />
                ) : (
                  <Image src={product1} alt="product" />
                )}

                <button
                  onClick={() => handleButtonClick(id)}
                  disabled={loadingId === id}
                >
                  {loadingId === id ? (
                    <div className="spinner" />
                  ) : (
                    t("mahsulot.button")
                  )}
                </button>
              </div>
            );
          })}

          {!categoryLoading && parentCategories.length === 0 && (
            <div className="product-empty">Kategoriyalar topilmadi</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
