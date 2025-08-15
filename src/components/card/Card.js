"use client";

import React, { useState, useEffect } from "react";
import "./card.scss";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import CardProducts from "../card-products/CardProducts";
import Loading from "../loading/Loading";

import product1 from "../../assets/images/panel.png";

const Card = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "uz_Uz";
  });

  const [categoryValue, setCategoryValue] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const idFromQuery = (
    searchParams.get("productcategoryid") || ""
  ).toLowerCase();

  useEffect(() => {
    const handleLanguageChange = (e) => {
      const newLang = e?.detail || localStorage.getItem("language") || "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", handleLanguageChange);
    return () =>
      window.removeEventListener("languageChanged", handleLanguageChange);
  }, []);

  const {
    data: dataGetProduct,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct,
  } = useGetProductQuery({ skip: 0, take: 10 });

  const {
    data: dataGetCategory,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryQuery({ skip: 0, take: 10 });

  useEffect(() => {
    refetchProduct();
    refetchCategory();
  }, [language]); // til o'zgarsa qayta yuklash

  // ✅ URL dagi productcategoryid bo'lsa — o'shani active qilish; bo'lmasa birinchisini
  useEffect(() => {
    const list = dataGetCategory?.data?.list ?? [];
    if (!list.length) return;

    // URL dagi id ro'yxatda bormi?
    const match = list.find(
      (c) => String(c.productcategoryid).toLowerCase() === idFromQuery
    );

    if (idFromQuery && match) {
      setCategoryValue(match.productcategoryid);
    } else if (!categoryValue) {
      setCategoryValue(list[0].productcategoryid);
    }
  }, [dataGetCategory?.data?.list, idFromQuery]); // list yoki URL o'zgarsa

  const filteredProduct = categoryValue
    ? dataGetProduct?.data?.list?.filter(
        (el) => String(el.productcategoryid) === String(categoryValue)
      )
    : [];

  // Klikda ham state, ham URL yangilanadi
  const handleSelectCategory = (id) => {
    setCategoryValue(id);
    const params = new URLSearchParams(window.location.search);
    params.set("productcategoryid", id);
    router.replace(`/katalog?${params.toString()}`, { scroll: false });
  };

  if (productLoading || categoryLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (productError || categoryError) return <div>Error loading data</div>;

  return (
    <section id="products">
      <div className="products">
        <ul className="products__categories">
          {(dataGetCategory?.data?.list ?? []).map((el) => (
            <li
              key={el.productcategoryid}
              className="products__categories__item"
            >
              <div
                onClick={() => handleSelectCategory(el.productcategoryid)}
                className={`products__card ${
                  String(categoryValue) === String(el.productcategoryid)
                    ? "active"
                    : ""
                }`}
              >
                {el?.imageurl ? (
                  <Image
                    src={`https://api.bsgazobeton.uz${el.imageurl}`}
                    alt={String(el.name || "category")}
                    width={100}
                    height={70}
                  />
                ) : (
                  <Image src={product1} alt="product" />
                )}

                <button
                  className={`products__categories__btn ${
                    String(categoryValue) === String(el.productcategoryid)
                      ? "active"
                      : ""
                  }`}
                >
                  {typeof el.name === "string"
                    ? el.name
                    : String(
                        el.name?.uz_uz || el.name?.ru_ru || el.name?.en_us || ""
                      )}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="products__header">
          <h3 className="products__title">Gazobeton bloklari - D300</h3>
        </div>

        <div
          className={`products__wrapper ${
            filteredProduct?.length ? "" : "simple__products__wrapper"
          }`}
        >
          {filteredProduct?.length ? (
            filteredProduct.map((el) => (
              <CardProducts
                key={el.productid}
                el={el}
                id={el.productid}
                title={el.name}
                description={el.description}
                price={el.price}
                image={el.imageurl}
              />
            ))
          ) : (
            <div className="no__category">
              <p>Bunday kategoriyalik mahsulot mavjud emas</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Card;
