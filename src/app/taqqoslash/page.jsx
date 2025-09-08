"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux"; // ✅ dispatch qo‘shildi
import Image from "next/image";
import "./taqqoslash.scss";
import deleteicon from "../../assets/images/deleteicon.svg";
import addproduct from "../../assets/images/addproduct.svg";
import Modal from "../../components/modal/Modal";
import ProductPicker from "../../components/ProductPicker/ProductPicker";
import { toggleToWishes } from "../../context/wishlistSlice"; // ✅ action chaqiramiz

export default function ProductComparison() {
  const wishlist = useSelector((state) => state.wishlist.value);
  const dispatch = useDispatch(); // ✅ ishlatamiz
  const [open, setOpen] = useState(false);

  const lang = "uz_uz";

  const allLabels = Array.from(
    new Set(
      wishlist.flatMap(
        (product) =>
          product.technicaldata?.map((item) => item.key?.[lang]) || []
      )
    )
  );

  const specifications = allLabels.map((label) => ({
    label,
    value1:
      wishlist[0]?.technicaldata?.find((item) => item.key?.[lang] === label)
        ?.value?.[lang] || "-",
    value2:
      wishlist[1]?.technicaldata?.find((item) => item.key?.[lang] === label)
        ?.value?.[lang] || "-",
    value3:
      wishlist[2]?.technicaldata?.find((item) => item.key?.[lang] === label)
        ?.value?.[lang] || "-",
  }));

  return (
    <div className="product__comparison container">
      <div className="header-section">
        <div className="product__comparison__header__title">
          <h2 className="product__comparison__title">Xususiyatlar</h2>
        </div>

        {wishlist.slice(0, 3).map((product, idx) => (
          <div className="product-column" key={idx}>
            <div className="product-cards">
              <div className="product-header">
                <button
                  className="close__button"
                  onClick={() => dispatch(toggleToWishes(product))}
                >
                  <Image src={deleteicon} alt="deleteicon" />
                </button>

                <div className="product-content">
                  <div className="product__image__wrapper">
                    <img
                      src={`https://api.bsgazobeton.uz${product?.imageurl}`}
                      alt={product.name}
                      width={100}
                      height={60}
                      className="product__image"
                    />
                  </div>
                  <div className="product__title">{product.name}</div>
                  <div className="product__size">
                    {product.technicaldata?.find(
                      (item) => item.key?.[lang] === "O‘lchami, mm"
                    )?.value?.[lang] || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {Array.from({ length: 3 - wishlist.length }).map((_, idx) => (
          <div key={idx} className="product-column">
            <div className="add__product__card" onClick={() => setOpen(true)}>
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

      <div className="table-container">
        <table className="comparison-table">
          <tbody>
            {specifications.map((row, index) => (
              <tr key={index} className="table-row">
                <td className="table-label">{row.label}</td>
                <td className="table-value">{row.value1}</td>
                <td className="table-value">{row.value2}</td>
                <td className="table-value">{row.value3}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ProductPicker onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
