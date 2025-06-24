"use client";

import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import "./taqqoslash.scss";
import deleteicon from "../../assets/images/deleteicon.svg";
import addproduct from "../../assets/images/addproduct.svg";

// Compare sahifa komponenti
export default function ProductComparison() {
  const wishlist = useSelector((state) => state.wishlist.value);

  // 1. Texnik xususiyatlarning barcha nomlarini yig'ib olish
  const allLabels = Array.from(
    new Set(
      wishlist.flatMap((product) =>
        product.technicalData
          ? Object.keys(JSON.parse(product.technicalData))
          : []
      )
    )
  );

  // 2. Har bir label uchun 3ta mahsulotdan qiymatlarni olish
  const specifications = allLabels.map((label) => ({
    label,
    value1:
      wishlist[0]?.technicalData &&
      JSON.parse(wishlist[0].technicalData)[label],
    value2:
      wishlist[1]?.technicalData &&
      JSON.parse(wishlist[1].technicalData)[label],
    value3:
      wishlist[2]?.technicalData &&
      JSON.parse(wishlist[2].technicalData)[label],
  }));

  return (
    <div className="product__comparison container">
      <div className="header-section">
        <div className="product__comparison__header__title">
          <h2 className="product__comparison__title">Xususiyatlar</h2>
        </div>

        {/* Har bir mahsulot uchun ustun */}
        {wishlist.slice(0, 3).map((product, idx) => (
          <div className="product-column" key={idx}>
            <div className="product-card">
              <div className="product-header">
                <button className="close__button">
                  <Image src={deleteicon} alt="deleteicon" />
                </button>
                <div className="product-content">
                  <div className="product__image__wrapper">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      width={100}
                      height={60}
                      className="product__image"
                    />
                  </div>
                  <div className="product__title">{product.name}</div>
                  <div className="product__size">
                    {JSON.parse(product.technicalData)["O‘lchami, mm"] || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Agar mahsulot < 3 bo‘lsa, qolgan ustunlarga "Qo‘shish" kartasi */}
        {Array.from({ length: 3 - wishlist.length }).map((_, idx) => (
          <div key={idx} className="product-column">
            <div className="add__product__card">
              <div className="add-product-content">
                <div className="add__product__card__icon">
                  <Image src={addproduct} alt="addproduct" />
                </div>
                <div className="add__product__text">Mahsulot qo‘shish</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Xususiyatlar jadvali */}
      <div className="table-container">
        <table className="comparison-table">
          <tbody>
            {specifications.map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-label">{row.label}</td>
                <td className="table-value">{row.value1 || "-"}</td>
                <td className="table-value">{row.value2 || "-"}</td>
                <td className="table-value">{row.value3 || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
