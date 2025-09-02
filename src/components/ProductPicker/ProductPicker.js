"use client";

import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../../context/categoryApi";
import { useGetProductQuery } from "../../context/productApi";
import "./productPicker.scss";

export default function ProductPicker({ onClose }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { data: categories, isLoading: loadingCategories } =
    useGetCategoryQuery({ skip: 0, take: 100 });

  useEffect(() => {
    if (!loadingCategories && categories?.data?.length && !selectedCategory) {
      setSelectedCategory(categories.data[0].productcategoryid);
    }
  }, [loadingCategories, categories, selectedCategory]);

  // Mahsulotlar
  const { data: products, isLoading: loadingProducts } = useGetProductQuery(
    {
      productcategoryid: selectedCategory,
      skip: 0,
      take: 1000,
    },
    { skip: !selectedCategory }
  );

  return (
    <div className="product-picker">
      <div className="product-picker__header">
        <h2>Mahsulot tanlash</h2>
        <button onClick={onClose}>✕</button>
      </div>

      <div className="product-picker__body">
        {/* Chap tomonda kategoriyalar */}
        <div className="product-picker__categories">
          {loadingCategories ? (
            <p>Yuklanmoqda...</p>
          ) : (
            categories?.data?.list.map((cat) => (
              <button
                key={cat.productcategoryid}
                className={`category-btn ${
                  selectedCategory === cat.productcategoryid ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.productcategoryid)}
              >
                {cat.name}
              </button>
            ))
          )}
        </div>

        {/* O‘ng tomonda mahsulotlar */}
        <div className="product-picker__products">
          {loadingProducts ? (
            <p>Mahsulotlar yuklanmoqda...</p>
          ) : products?.data?.list.length ? (
            <div className="product-grid">
              {products.data?.list.map((prod) => (
                <div key={prod.productid} className="product-card">
                  <h4>{prod.name}</h4>
                  <p>{prod.price} so‘m</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Bu kategoriyada mahsulot yo‘q</p>
          )}
        </div>
      </div>
    </div>
  );
}
