"use client";

import React, { useState, useEffect } from "react";
import "./card.scss";
import Image from "next/image";

import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import CardProducts from "../card-products/CardProducts";
import Loading from "../loading/Loading";

import product1 from "../../assets/images/panel.png";

const Card = () => {
  const [categoryValue, setCategoryValue] = useState("");

  const {
    data: dataGetProduct,
    isLoading: productLoading,
    error: productError,
  } = useGetProductQuery({
    skip: 0,
    take: 10,
  });

  console.log(dataGetProduct);
  console.log(dataGetProduct?.data?.list.imageurl);

  const {
    data: dataGetCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoryQuery({
    skip: 0,
    take: 10,
  });

  console.log(dataGetCategory);

  useEffect(() => {
    if (dataGetCategory?.data?.list.length && !categoryValue) {
      setCategoryValue(dataGetCategory?.data?.list[0].productcategoryid);
    }
  }, [dataGetCategory?.data?.list]);

  const filteredProduct = categoryValue
    ? dataGetProduct?.data?.list.filter(
        (el) => el.productcategoryid === categoryValue
      )
    : [];

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
          {dataGetCategory?.data?.list.map((el) => (
            <li
              key={el.productcategoryid}
              className="products__categories__item"
            >
              <div
                onClick={() => setCategoryValue(el.productcategoryid)}
                className={`products__card ${
                  categoryValue === el.productcategoryid ? "active" : ""
                }`}
              >
                <Image src={product1} alt="product" />
                <button
                  className={`products__categories__btn ${
                    categoryValue === el.productcategoryid ? "active" : ""
                  }`}
                >
                  {el.name}
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
