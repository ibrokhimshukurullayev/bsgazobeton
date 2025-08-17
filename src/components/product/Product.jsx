"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useGetCategoryQuery } from "../../context/categoryApi";

import product1 from "../../assets/images/product1.svg";
import "./product.scss";

const Product = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "uz_Uz";
  });
  const [t, i18n] = useTranslation("global");
  const [loadingId, setLoadingId] = useState();
  console.log("loadingId", loadingId);

  const handleButtonClick = async (categoryId) => {
    setLoadingId(categoryId);
    console.log("categoryId", categoryId);

    try {
      await router.push(`/katalog?productcategoryid=${categoryId}`);
    } finally {
      setLoadingId(null);
    }
  };

  const {
    data: dataGetCategory,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryQuery({ skip: 0, take: 10 });

  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang = e?.detail || localStorage.getItem("language") || "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  useEffect(() => {
    refetchCategory();
  }, [language]);

  return (
    <div id="product">
      <div className="container product">
        <h2 className="product__title">{t("mahsulot.title")}</h2>
        <div className="product-list">
          {dataGetCategory?.data?.list.map((item) => (
            <div className="product-card" key={item.id}>
              <h3>{item.name}</h3>
              {item?.imageurl ? (
                <Image
                  src={`https://api.bsgazobeton.uz${item.imageurl}`}
                  alt={item.name}
                  width={300}
                  height={200}
                />
              ) : (
                <Image src={product1} alt="product" />
              )}
              <button
                onClick={() => handleButtonClick(item.productcategoryid)}
                disabled={loadingId === item.productcategoryid}
              >
                {loadingId === item.productcategoryid ? (
                  <div className="spinner" />
                ) : (
                  t("mahsulot.button")
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
