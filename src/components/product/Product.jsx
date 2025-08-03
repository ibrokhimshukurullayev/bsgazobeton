"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

import "./product.scss";
import product1 from "../../assets/images/product1.svg";
import product2 from "../../assets/images/product2.svg";
import product3 from "../../assets/images/product3.svg";
import product4 from "../../assets/images/product4.svg";

const Product = () => {
  const router = useRouter();

  const [t, i18n] = useTranslation("global");

  const products = [
    {
      id: 1,
      title: t("mahsulot.text1"),
      image: product1,
      button: t("mahsulot.button"),
    },
    {
      id: 2,
      title: t("mahsulot.text2"),
      image: product2,
      button: t("mahsulot.button"),
    },
    {
      id: 3,
      title: t("mahsulot.text3"),
      image: product3,
      button: t("mahsulot.button"),
    },
    {
      id: 4,
      title: t("mahsulot.text4"),
      image: product4,
      button: t("mahsulot.button"),
    },
  ];

  const handleButtonClick = () => {
    router.push("/katalog");
  };

  return (
    <div id="product">
      <div className="container product">
        <h2 className="product__title">{t("mahsulot.title")}</h2>
        <div className="product-list">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <h3>{item.title}</h3>
              <Image
                src={item.image}
                alt={item.title}
                width={300}
                height={200}
              />
              <button onClick={handleButtonClick}>{item.button}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
