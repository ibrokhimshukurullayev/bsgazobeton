"use client";

import React, { useState } from "react";
import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import "./productPicker.scss";

export default function ProductPicker({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Kategoriyalar
  const { data: categories, isLoading: loadingCategories } =
    useGetCategoryQuery({ skip: 0, take: 1000 });

  // Mahsulotlar (kategoriya bo‘yicha filter)
  const { data: products, isLoading: loadingProducts } = useGetProductQuery(
    { productcategoryid: selectedCategory, skip: 0, take: 100 },
    { skip: !selectedCategory }
  );

  console.log("Categories API response:", categories);
  console.log("Products API response:", products);

  return (
    <div className="product-picker">
      <h3>Kategoriya va mahsulot tanlang</h3>

      {/* Kategoriya list */}
      {loadingCategories ? (
        <p>Yuklanmoqda...</p>
      ) : (
        <div className="category-list">
          {categories?.data?.list?.length ? (
            categories.data.list.map((cat) => (
              <button
                key={cat.id || cat.productCategoryId} // ✅ key har doim noyob
                className={`category-btn ${
                  selectedCategory === (cat.id || cat.productCategoryId)
                    ? "active"
                    : ""
                }`}
                onClick={() =>
                  setSelectedCategory(cat.id || cat.productCategoryId)
                }
              >
                {cat.name?.uz_UZ ||
                  cat.name?.ru_RU ||
                  cat.name?.en_US ||
                  cat.name}
              </button>
            ))
          ) : (
            <p>Kategoriyalar topilmadi</p>
          )}
        </div>
      )}

      {/* Mahsulot list */}
      {selectedCategory && (
        <div className="product-list">
          {loadingProducts ? (
            <p>Mahsulotlar yuklanmoqda...</p>
          ) : products?.data?.list?.length ? (
            products.data.list.map((p) => (
              <div
                key={p.productId || p.id} // ✅ key noyob bo‘lishi shart
                className="product-item"
              >
                {/* <img
                  src={
                    p.imageUrl
                      ? `https://api.bsgazobeton.uz${p.imageUrl}`
                      : "/no-image.png"
                  }
                  alt={
                    p.name?.uz_UZ ||
                    p.name?.ru_RU ||
                    p.name?.en_US ||
                    "Mahsulot"
                  }
                /> */}
                <p>
                  {p.name?.uz_UZ || p.name?.ru_RU || p.name?.en_US || p.name}
                </p>
                <button onClick={() => console.log("Tanlandi:", p)}>
                  Tanlash
                </button>
              </div>
            ))
          ) : (
            <p>Mahsulotlar topilmadi</p>
          )}
        </div>
      )}

      <div className="modal-footer">
        <button className="close-btn" onClick={onClose}>
          Yopish
        </button>
      </div>
    </div>
  );
}
