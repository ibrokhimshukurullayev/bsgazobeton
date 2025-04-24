import React from "react";
import Image from "next/image";
import "./product.scss";
import product1 from "../../assets/images/product1.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";

const products = [
  {
    id: 1,
    title: "Gazobeton bloklari",
    image: product1,
    button: "Mahsulotlarni ko‘rish",
  },
  {
    id: 2,
    title: "Gazobeton panellari",
    image: product2,
    button: "Mahsulotlarni ko‘rish",
  },
  {
    id: 3,
    title: "Gazoblok kley",
    image: product3,
    button: "Mahsulotlarni ko‘rish",
  },
  {
    id: 4,
    title: "Gazoblok vositalari",
    image: product4,
    button: "Mahsulotlarni ko‘rish",
  },
];

const Product = () => {
  return (
    <div id="product">
      <div className="container product">
        <h2 className="product__title">Mahsulotlar</h2>
        <div className="product-list">
          {products.map((item) => (
            <div className="product-card" key={item.id}>
              <h3>{item.title}</h3>
              <Image
                src={item.image}
                alt={item.title}
                width={260}
                height={160}
              />
              <button>{item.button}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
