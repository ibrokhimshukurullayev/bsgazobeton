"use client";

import React, { useEffect, useMemo, useState } from "react";
import "./card.scss";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import CardProducts from "../card-products/CardProducts";
import Loading from "../loading/Loading";
import product1 from "../../assets/images/panel.png";

function getName(cat, language = "uz_Uz") {
  if (!cat) return "";
  if (typeof cat.name === "string" && cat.name) return cat.name;
  const n =
    (cat.name && (cat.name.uz_uz || cat.name.ru_ru || cat.name.en_us)) || "";
  return String(n);
}

const Card = () => {
  const [language, setLanguage] = useState(() => {
    return (
      (typeof window !== "undefined" && localStorage.getItem("language")) ||
      "uz_Uz"
    );
  });

  const [rootId, setRootId] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const idFromQuery = (
    searchParams.get("productcategoryid") || ""
  ).toLowerCase();

  useEffect(() => {
    const onLang = (e) => {
      const newLang =
        (e && e.detail) ||
        (typeof window !== "undefined" && localStorage.getItem("language")) ||
        "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", onLang);
    return () => window.removeEventListener("languageChanged", onLang);
  }, []);

  const {
    data: catRes,
    isLoading: categoryLoading,
    error: categoryError,
    refetch: refetchCategory,
  } = useGetCategoryQuery({ skip: 0, take: 1000 });

  const {
    data: prodRes,
    isLoading: productLoading,
    error: productError,
    refetch: refetchProduct,
  } = useGetProductQuery({ skip: 0, take: 1000 });

  useEffect(() => {
    refetchCategory();
    refetchProduct();
  }, [language, refetchCategory, refetchProduct]);

  const categories = catRes?.data?.list || [];
  const products = prodRes?.data?.list || [];

  const rootCategories = useMemo(
    () => categories.filter((c) => c.parentproductcategoryid == null),
    [categories]
  );

  useEffect(() => {
    if (!categories.length) return;

    const matched = categories.find(
      (c) => String(c.productcategoryid).toLowerCase() === idFromQuery
    );

    if (matched) {
      if (matched.parentproductcategoryid != null) {
        setRootId(String(matched.parentproductcategoryid));
        setSelectedId(String(matched.productcategoryid));
      } else {
        setRootId(String(matched.productcategoryid));
        setSelectedId(String(matched.productcategoryid));
      }
    } else if (!rootId && rootCategories.length) {
      const first = rootCategories[0];
      setRootId(String(first.productcategoryid));
      setSelectedId(String(first.productcategoryid));
    }
  }, [categories, idFromQuery, rootCategories, rootId]);

  const childCategories = useMemo(
    () =>
      categories.filter(
        (c) => String(c.parentproductcategoryid) === String(rootId)
      ),
    [categories, rootId]
  );

  const productsByCategory = useMemo(() => {
    const map = new Map();
    for (const p of products) {
      const key = String(p.productcategoryid);
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(p);
    }
    return map;
  }, [products]);

  const handleSelectRoot = (id) => {
    const idStr = String(id);
    setRootId(idStr);
    setSelectedId(idStr);
    const params = new URLSearchParams(window.location.search);
    params.set("productcategoryid", idStr);
    router.replace(`/katalog?${params.toString()}`, { scroll: false });
  };

  const handleSelectChild = (id) => {
    const idStr = String(id);
    setSelectedId(idStr);
    const params = new URLSearchParams(window.location.search);
    params.set("productcategoryid", idStr);
    router.replace(`/katalog?${params.toString()}`, { scroll: false });
  };

  if (productLoading || categoryLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }
  if (productError || categoryError) return <div>Error loading data</div>;

  const selectedRoot = categories.find(
    (c) => String(c.productcategoryid) === String(rootId)
  );

  return (
    <section id="products">
      <div className="products">
        <ul className="products__categories">
          {rootCategories.map((el) => (
            <li
              key={el.productcategoryid}
              className="products__categories__item"
            >
              <div
                onClick={() => handleSelectRoot(el.productcategoryid)}
                className={`products__card ${
                  String(rootId) === String(el.productcategoryid)
                    ? "active"
                    : ""
                }`}
              >
                {el?.imageurl ? (
                  <Image
                    src={`https://api.bsgazobeton.uz${el.imageurl}`}
                    alt={getName(el, language)}
                    width={100}
                    height={70}
                  />
                ) : (
                  <Image src={product1} alt="product" />
                )}

                <button
                  className={`products__categories__btn ${
                    String(rootId) === String(el.productcategoryid)
                      ? "active"
                      : ""
                  }`}
                >
                  {getName(el, language)}
                </button>
              </div>
            </li>
          ))}
        </ul>

        {childCategories.length > 0 ? (
          childCategories.map((child) => {
            const list =
              productsByCategory.get(String(child.productcategoryid)) || [];
            return (
              <div key={child.productcategoryid} className="child-section">
                <div className="products__header">
                  <h3
                    className={`products__title ${
                      String(selectedId) === String(child.productcategoryid)
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleSelectChild(child.productcategoryid)}
                    style={{ cursor: "pointer" }}
                  >
                    {getName(child, language)}
                  </h3>
                </div>

                <div
                  className={`products__wrapper ${
                    list.length ? "" : "simple__products__wrapper"
                  }`}
                >
                  {list.length ? (
                    list.map((el) => (
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
            );
          })
        ) : (
          // Agar tanlangan root’ning child’lari bo‘lmasa, o‘sha root’ning o‘z mahsulotlari
          <div className="child-section">
            <div className="products__header">
              <h3 className="products__title">
                {getName(selectedRoot, language)}
              </h3>
            </div>
            <div
              className={`products__wrapper ${
                (productsByCategory.get(String(rootId)) || []).length
                  ? ""
                  : "simple__products__wrapper"
              }`}
            >
              {(productsByCategory.get(String(rootId)) || []).length ? (
                (productsByCategory.get(String(rootId)) || []).map((el) => (
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
        )}
      </div>
    </section>
  );
};

export default Card;
