"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import "./taqqoslash.scss";
import deleteicon from "../../assets/images/deleteicon.svg";
import addproduct from "../../assets/images/addproduct.svg";
import Modal from "../../components/modal/Modal";
import ProductPicker from "../../components/ProductPicker/ProductPicker";
import { toggleToWishes } from "../../context/wishlistSlice";
import { useTranslation } from "react-i18next";

export const metadata = {
  title: "Taqqoslash | BS Gazobeton",
  description: "O‘zbekistonning eng sifatli gazobeton mahsulotlari.",
};

// ✅ Carddagi kabi funksiya — obyekt ichidan mos tildagi qiymatni olish
function getName(item, language = "uz_UZ") {
  if (!item) return "";
  if (typeof item === "string" && item) return item;
  const value =
    (item &&
      (item[language.toLowerCase()] ||
        item.uz_uz ||
        item.ru_ru ||
        item.en_us)) ||
    "";
  return String(value);
}

export default function ProductComparison() {
  const wishlist = useSelector((state) => state.wishlist.value);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("global");

  // ✅ Carddagi kabi tilni olish
  const [language, setLanguage] = useState(() => {
    return (
      (typeof window !== "undefined" && localStorage.getItem("language")) ||
      "uz_UZ"
    );
  });

  useEffect(() => {
    const onLang = (e) => {
      const newLang =
        (e && e.detail) ||
        (typeof window !== "undefined" && localStorage.getItem("language")) ||
        "uz_UZ";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", onLang);
    return () => window.removeEventListener("languageChanged", onLang);
  }, []);

  // ✅ Barcha unikal label’larni olish
  const allLabels = Array.from(
    new Set(
      wishlist.flatMap(
        (product) =>
          product.technicaldata?.map((item) => getName(item.key, language)) ||
          []
      )
    )
  );

  // ✅ Jadval uchun data
  const specifications = allLabels.map((label) => ({
    label,
    value1:
      wishlist[0]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.[language.toLowerCase()] ||
      wishlist[0]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.uz_uz ||
      "-",
    value2:
      wishlist[1]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.[language.toLowerCase()] ||
      wishlist[1]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.uz_uz ||
      "-",
    value3:
      wishlist[2]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.[language.toLowerCase()] ||
      wishlist[2]?.technicaldata?.find(
        (item) => getName(item.key, language) === label
      )?.value?.uz_uz ||
      "-",
  }));

  return (
    <div className="product__comparison container">
      <div className="header-section">
        <div className="product__comparison__header__title">
          <h2 className="product__comparison__title">
            {t("taqqoslash.features")}
          </h2>
        </div>

        {/* Mahsulotlar */}
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
                      alt={getName(product.name, language)}
                      width={130}
                      height={70}
                      className="product__image"
                    />
                  </div>
                  <div className="product__title">
                    {getName(product.name, language)}
                  </div>
                  <div className="product__size">
                    {product.technicaldata?.find((item) =>
                      getName(item.key, language)
                        .toLowerCase()
                        .includes("o‘lchami")
                    )?.value?.[language.toLowerCase()] || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Bo‘sh joylar uchun "Add product" card */}
        {Array.from({ length: 3 - wishlist.length }).map((_, idx) => (
          <div key={idx} className="product-column">
            <div className="add__product__card" onClick={() => setOpen(true)}>
              <div className="add-product-content">
                <div className="add__product__card__icon">
                  <Image src={addproduct} alt="addproduct" />
                </div>
                <div className="add__product__text">
                  {t("taqqoslash.addProduct")}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Jadval */}
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
