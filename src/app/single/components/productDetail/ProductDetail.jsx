"use client";
import Image from "next/image";
import { useState } from "react";
import "./productDetail.scss";
import compare from "../../../../assets/images/compare.png";

const ProductDetail = ({ product }) => {
  const [activeImage, setActiveImage] = useState(product.images[0]);

  return (
    <div className="product-detail container">
      <div className="image-section">
        <div className="image-section__header">
          <Image className="main-image" src={activeImage} alt="Product" />
        </div>
        <div className="thumbnails">
          {product.images.map((img, idx) => (
            <Image
              key={idx}
              src={img}
              width={140}
              height={90}
              className={img === activeImage ? "active" : ""}
              onClick={() => setActiveImage(img)}
              alt={`thumb-${idx}`}
            />
          ))}
        </div>

        <div className="description">
          <h3>Mahsulot haqida</h3>
          <p>{product.description}</p>
          <ul className="description__list">
            {product.features.map((item, idx) => (
              <li key={idx}>
                {item} <span></span>
              </li>
            ))}
          </ul>
          <h4>
            Mahsulot turlari va o‘lchamlari haqida batafsil ma'lumot
            katalogimizda mavjud.
          </h4>
          <div className="catalog-button">
            <button>KATALOGNI YUKLAB OLISH</button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <div className="price">{product.price} UZS/m³</div>
        <h4 className="info-section__title">Texnik xususiyatlari</h4>
        <div className="specs">
          {Object.entries(product.specs).map(([key, value], idx) => (
            <div className="spec-item" key={idx}>
              <span>{key}</span>
              <span>{value}</span>
            </div>
          ))}
        </div>
        <button className="add-to-cart">SAVATGA QO‘SHISH</button>
        <a href="#" className="info-section__end">
          <Image src={compare} alt="compare" />
          Taqqoslashga qo‘shish
        </a>
      </div>
    </div>
  );
};

export default ProductDetail;
