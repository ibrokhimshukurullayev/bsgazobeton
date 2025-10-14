"use client";

import React, { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import "./products.scss";
import "../page.scss";
import { useGetProductQuery } from "../../../context/productApi";
import { useGetCategoryQuery } from "../../../context/categoryApi";
import Loading from "../../../components/loading/Loading";
import product1 from "../../../assets/images/webappImages/card1.svg";
import left from "../../../assets/images/webappImages/left.svg";
import productleft from "../../../assets/images/webappImages/productleft.svg";
import { useTranslation } from "react-i18next";

const Products = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("productcategoryid");

  const { i18n } = useTranslation();
  const currentLang = i18n.language;
  const langKey =
    currentLang === "uz" ? "uz_uz" : currentLang === "ru" ? "ru_ru" : "en_us";

  const { data: categoriesData } = useGetCategoryQuery({ skip: 0, take: 1000 });
  const { data: productsData, isLoading } = useGetProductQuery({
    skip: 0,
    take: 1000,
  });

  const categories = useMemo(
    () => categoriesData?.data?.list || [],
    [categoriesData]
  );
  const products = useMemo(
    () => productsData?.data?.list || [],
    [productsData]
  );

  const currentCategory = useMemo(
    () =>
      categories.find(
        (c) => String(c.productcategoryid) === String(categoryId)
      ),
    [categories, categoryId]
  );

  const filteredProducts = useMemo(
    () =>
      products.filter(
        (p) => String(p.productcategoryid) === String(categoryId)
      ),
    [products, categoryId]
  );

  if (isLoading) return <Loading />;

  const getLocalizedValue = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[langKey] || obj.uz_uz || "";
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="product__header">
        {currentCategory?.name && (
          <h2 className="product__header__title">
            {getLocalizedValue(currentCategory.name)}
          </h2>
        )}
      </div>

      {/* Category nomi */}
      {currentCategory?.name && (
        <h2 className="product__title">
          {getLocalizedValue(currentCategory.name)}
        </h2>
      )}

      <div className="cart__box">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => {
            const techData = Array.isArray(product.technicaldata)
              ? product.technicaldata.slice(0, 3)
              : [];

            return (
              <div key={product.productid} className="cart__item">
                <Image
                  className="cart__item__img"
                  src={
                    product?.imageurl
                      ? `https://api.bsgazobeton.uz${product.imageurl}`
                      : product1
                  }
                  alt={getLocalizedValue(product.name)}
                  width={90}
                  height={90}
                />
                <div className="cart__details">
                  <h3 className="cart__details__title">
                    {getLocalizedValue(product.name)}
                  </h3>

                  {/* Faqat 3ta texnik ma'lumot */}
                  {techData.map((item, idx) => (
                    <p
                      key={idx}
                      className="cart__details__text product__details"
                    >
                      {getLocalizedValue(item.key)}:{" "}
                      {getLocalizedValue(item.value)}{" "}
                      {getLocalizedValue(item.unit)}
                    </p>
                  ))}

                  {/* Narx */}
                  {product.price && (
                    <p className="cart__price product__price">
                      {`${product.price.toLocaleString()} UZS${
                        product.unit
                          ? "/" + getLocalizedValue(product.unit)
                          : ""
                      }`}
                      {/* ✅ Faqat ikonka bosilganda o'tish */}
                      <span
                        className="product-detail-btn"
                        onClick={(e) => {
                          e.stopPropagation(); // asosiy div clickni to‘xtatadi
                          router.push(`/webapp/product/${product.productid}`);
                        }}
                      >
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
          <p className="no-products">Bu kategoriyada mahsulotlar yo‘q.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
