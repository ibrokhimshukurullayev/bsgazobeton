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

  const childCategories = categories.filter(
    (c) =>
      String(c.parentproductcategoryid) ===
      String(parentCategory?.productcategoryid)
  );

  const [activeChildId, setActiveChildId] = useState(null);

  useEffect(() => {
    if (childCategories.length > 0 && !activeChildId) {
      setActiveChildId(String(childCategories[0].productcategoryid));
    }
  }, [childCategories, activeChildId]);

  if (isLoading) return <Loading />;

  const getLocalizedValue = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[langKey] || obj.uz_uz || "";
  };

  const selectedChild = childCategories.find(
    (c) => String(c.productcategoryid) === String(activeChildId)
  );

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
      {/* 🔹 Katta parent nomi */}
      {parentCategory?.name && (
        <h2 className="product__header__title">
          {getLocalizedValue(parentCategory.name)}
        </h2>
      )}

      {/* 🔹 Qisqa child tugmalar (D300, D400, D500) */}
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

      {/* 🔹 Mahsulotlar */}
      {selectedChild && (
        <div className="cart__box">
          <h3 className="category-group__title">
            {getLocalizedValue(selectedChild.name)}
          </h3>

          {selectedProducts.length > 0 ? (
            selectedProducts.map((product) => {
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

                    {product.price && (
                      <p className="cart__price product__price">
                        {`${product.price.toLocaleString()} UZS${
                          product.unit
                            ? "/" + getLocalizedValue(product.unit)
                            : ""
                        }`}
                        <span
                          className="product-detail-btn"
                          onClick={(e) => {
                            e.stopPropagation();
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
      )}
    </div>
  );
};

export default Products;
