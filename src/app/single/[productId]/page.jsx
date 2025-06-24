"use client";
import Image from "next/image";
import { useState } from "react";
import "./single.scss";
import compare from "../../../assets/images/compare.png";
import Link from "next/link";

import { useParams } from "next/navigation";
import { useGetProductSingleQuery } from "../../../context/productApi";
import { ChevronRight } from "lucide-react";

const ProductDetail = () => {
  const { productId } = useParams();
  const { data: product, isLoading } = useGetProductSingleQuery(productId);
  console.log(product);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (!product?.data) return <p>Mahsulot topilmadi</p>;

  const productData = product?.data;
  console.log(productData);

  return (
    <div>
      <div id="kataloglink">
        <div className="container kataloglink">
          <div className="kataloglink__link">
            <Link href={"/"}>Bosh sahifa</Link>
            <span>
              <ChevronRight className="icon" />
            </span>
            <p>{productData.name}</p>
          </div>
          <h2>{productData.name}</h2>
        </div>
      </div>
      <div className="product-detail container">
        <div className="image-section">
          <div className="image-section__header">
            <Image
              className="main-image"
              src={productData.imageUrl}
              alt="Product"
              width={200}
              height={120}
            />
          </div>
          {/* <div className="thumbnails">
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
        </div> */}

          <div className="description">
            <h3>Mahsulot haqida</h3>
            <p>{productData.description}</p>
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
          <div className="price">{productData.price} UZS/m³</div>
          <h4 className="info-section__title">Texnik xususiyatlari</h4>

          <div className="specs">
            {productData.technicalData &&
              Object.entries(JSON.parse(productData.technicalData)).map(
                ([key, value], idx) => (
                  <div className="spec-item" key={idx}>
                    <span>{key}</span>
                    <span>{value}</span>
                  </div>
                )
              )}
          </div>

          <button className="add-to-cart">SAVATGA QO‘SHISH</button>
          <a href="#" className="info-section__end">
            <Image src={compare} alt="compare" />
            Taqqoslashga qo‘shish
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
