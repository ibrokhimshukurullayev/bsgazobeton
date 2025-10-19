"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./products.scss";
import "../page.scss";
import { useGetProductQuery } from "../../../context/productApi";
import { useGetCategoryQuery } from "../../../context/categoryApi";
import Loading from "../../../components/loading/Loading";
import product1 from "../../../assets/images/webappImages/card1.svg";
import productleft from "../../../assets/images/webappImages/productleft.svg";
import { useTranslation } from "react-i18next";
import { units } from "../../../data/unit";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("productcategoryid");

  const { i18n, t } = useTranslation("global");
  const currentLang = i18n.language;
  const langKey =
    currentLang === "ru" ? "ru_ru" : currentLang === "en" ? "en_us" : "uz_uz";

  const { data: categoriesData, isLoading: catLoading } = useGetCategoryQuery({
    skip: 0,
    take: 1000,
  });
  const { data: productsData, isLoading: prodLoading } = useGetProductQuery({
    skip: 0,
    take: 1000,
  });

  const isLoading = catLoading || prodLoading;

  const categories = useMemo(
    () => categoriesData?.data?.list || [],
    [categoriesData]
  );
  const products = useMemo(
    () => productsData?.data?.list || [],
    [productsData]
  );

  const getLocalizedValue = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    if (typeof obj === "object") {
      return obj[langKey] || obj.uz_uz || obj.ru_ru || obj.en_us || "";
    }
    return "";
  };

  const currentCategory = categories.find(
    (c) => String(c.productcategoryid) === String(categoryId)
  );

  const parentCategory = currentCategory?.parentproductcategoryid
    ? categories.find(
        (c) =>
          String(c.productcategoryid) ===
          String(currentCategory.parentproductcategoryid)
      )
    : currentCategory;

  const childCategories = useMemo(
    () =>
      categories.filter(
        (c) =>
          String(c.parentproductcategoryid) ===
          String(parentCategory?.productcategoryid)
      ),
    [categories, parentCategory]
  );

  const [activeChildId, setActiveChildId] = useState(null);

  useEffect(() => {
    if (childCategories.length > 0 && !activeChildId) {
      setActiveChildId(String(childCategories[0].productcategoryid));
    } else if (childCategories.length === 0 && currentCategory) {
      setActiveChildId(String(currentCategory.productcategoryid));
    }
  }, [childCategories, activeChildId, currentCategory]);

  if (isLoading) return <Loading />;

  const selectedChild =
    childCategories.find(
      (c) => String(c.productcategoryid) === String(activeChildId)
    ) || currentCategory;

  const selectedProducts = products.filter(
    (p) => String(p.productcategoryid) === String(activeChildId)
  );

  const getShortCategoryName = (fullName) => {
    if (!fullName) return "";
    const name = getLocalizedValue(fullName);
    const match = name.match(/D\d+/i);
    return match ? match[0].toUpperCase() : name;
  };

  return (
    <div className="container">
      {parentCategory?.name && (
        <h2 className="product__header__title">
          {getLocalizedValue(parentCategory.name)}
        </h2>
      )}

      {childCategories.length > 0 && (
        <div className="child__tabs short__tabs">
          {childCategories.map((child) => (
            <button
              key={child.productcategoryid}
              className={`child__tab ${
                String(activeChildId) === String(child.productcategoryid)
                  ? "active"
                  : ""
              }`}
              onClick={() => setActiveChildId(String(child.productcategoryid))}
            >
              {getShortCategoryName(child.name)}
            </button>
          ))}
        </div>
      )}

      {selectedChild && (
        <div className="cart__box">
          {selectedProducts.length > 0 ? (
            selectedProducts.map((el) => {
              const lang =
                localStorage.getItem("language")?.toLowerCase() || "uz_uz";

              const unitKey = el.unit ? el.unit.toLowerCase() : "";
              const unitData = units[unitKey];
              const unitText =
                unitData?.[lang] || unitData?.uz_uz || el.unit || "-";

              return (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/webapp/product/${el.productid}`);
                  }}
                  key={el.productid}
                  className="cart__item"
                >
                  <Image
                    className="cart__item__img"
                    src={
                      el?.imageurl
                        ? `https://api.bsgazobeton.uz${el.imageurl}`
                        : product1
                    }
                    alt={getLocalizedValue(el.name)}
                    width={90}
                    height={90}
                  />
                  <div className="cart__details">
                    <h3 className="cart__details__title">
                      {getLocalizedValue(el.name)}
                    </h3>

                    {/* 🔹 CardProduct dagi bilan aynan bir xil */}
                    {el.technicaldata &&
                      Array.isArray(el.technicaldata) &&
                      el.technicaldata.slice(0, 3).map((item, idx) => {
                        const lang =
                          localStorage.getItem("language")?.toLowerCase() ||
                          "uz_uz";
                        return (
                          <div className="product__card__text" key={idx}>
                            <p className="cart__details__text product__details">
                              {item.key?.[lang] || "-"}:{" "}
                              {item.value?.[lang] || "-"}
                            </p>
                          </div>
                        );
                      })}

                    {el.price && (
                      <p className="cart__price product__price">
                        {el.price.toLocaleString()}
                        {t("header.priceUnit")}/{unitText}
                        <span className="product-detail-btn">
                          <Image
                            src={productleft}
                            alt="left"
                            width={14}
                            height={14}
                          />
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="no-products">
              {currentLang === "ru"
                ? "В этой категории нет продуктов."
                : currentLang === "en"
                ? "No products in this category."
                : "Bu kategoriyada mahsulotlar yo‘q."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
