"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery } from "../../../../context/productApi";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incCart,
  decCart,
  removeFromCart,
} from "../../../../context/cartSlice";
import Loading from "../../../../components/loading/Loading";

import plusIcon from "../../../../assets/images/webappImages/plus.svg";
import minusIcon from "../../../../assets/images/webappImages/minus.svg";

import "./single.scss";

const resolveLangKey = (lng) => {
  const s = String(lng || "").toLowerCase();
  if (s.startsWith("uz")) return "uz_uz";
  if (s.startsWith("ru")) return "ru_ru";
  if (s.startsWith("en")) return "en_us";
  return "uz_uz";
};

const readI18n = (obj, lng) => {
  if (!obj || typeof obj !== "object") return obj || "";
  const key = resolveLangKey(lng);
  return (
    obj[key] ||
    obj[key.slice(0, 2)] ||
    obj.uz_uz ||
    obj.ru_ru ||
    obj.en_us ||
    obj.uz ||
    obj.ru ||
    obj.en ||
    ""
  );
};

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { i18n, t } = useTranslation("global");
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const { data, isLoading } = useGetProductQuery({ skip: 0, take: 1000 });
  const product = data?.data?.list?.find(
    (p) => String(p.productid) === String(id)
  );

  const lang = i18n.language || "uz";

  const productInCart = cart.find(
    (item) => item.productid === product?.productid
  );

  const [quantity, setQuantity] = useState(productInCart?.quantity || 0);

  useEffect(() => {
    setQuantity(productInCart?.quantity || 0);
  }, [productInCart?.quantity]);

  if (isLoading) return <Loading />;
  if (!product)
    return <div>{t("products.notFound") || "Mahsulot topilmadi"}</div>;

  const tech = Array.isArray(product.technicaldata)
    ? product.technicaldata
    : [];

  const handleAddToCart = () => {
    const newItem = { ...product, quantity: 1 };
    dispatch(addToCart(newItem));
    setQuantity(1);
  };

  const handleIncrease = () => {
    dispatch(incCart(product));
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      dispatch(removeFromCart(product));
      setQuantity(0);
    } else {
      dispatch(decCart(product));
      setQuantity((prev) => prev - 1);
    }
  };

  // 💡 Til bo‘yicha barcha joyni readI18n orqali ko‘rsatamiz:
  const name = readI18n(product.name, lang);
  const desc = readI18n(product.description, lang);
  const unit = readI18n(product.unit, lang);

  return (
    <div className="product__detail__wrapper">
      <div className="fixed-top-overlay"></div>

      <h3 className="product__detail__title">{name}</h3>

      <div id="product__body">
        <div className="container product__detail__content">
          <div className="product-image-container">
            <Image
              src={
                product?.imageurl
                  ? `https://api.bsgazobeton.uz${product.imageurl}`
                  : "/no-image.png"
              }
              alt={name}
              width={300}
              height={300}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{name}</h1>

            <div className="product__specs">
              <div className="product-price">
                {product.price?.toLocaleString("uz-UZ")} UZS
                {unit ? "/" + unit : ""}
              </div>

              <div className="spec-title">
                {t("products.technicalprops") || "Texnik xususiyatlari"}
              </div>
              {tech.length > 0 ? (
                tech.map((item, idx) => (
                  <div key={idx} className="spec-row">
                    <div className="spec-label">
                      {readI18n(item.key, lang)}:
                    </div>
                    <div className="spec-value">
                      {readI18n(item.value, lang)}{" "}
                      {item.unit ? readI18n(item.unit, lang) : ""}
                    </div>
                  </div>
                ))
              ) : (
                <p className="spec-empty">
                  {t("products.nodata") || "Maʼlumot mavjud emas"}
                </p>
              )}
            </div>

            <div className="product-features">
              <h2 className="features-title">
                {t("products.aboutproducts") || "Mahsulot haqida"}
              </h2>
              <ul className="features-list">
                {desc ? (
                  <li>
                    <span className="feature-text">{desc}</span>
                  </li>
                ) : (
                  <>
                    <li>
                      <span className="feature-text">
                        Gazobeton bloklari issiqlikni yaxshi saqlaydi va
                        mustahkamlikka ega.
                      </span>
                    </li>
                    <li>
                      <span className="feature-text">
                        Yengil material — o‘rnatish va tashish qulay.
                      </span>
                    </li>
                    <li>
                      <span className="feature-text">
                        Energiya tejamkor va ekologik toza mahsulot.
                      </span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>

          <div className="product__actions">
            {quantity > 0 ? (
              <div className="product__action__box">
                <div className="product__quantity__box">
                  <button onClick={handleDecrease} className="qty__btn">
                    <Image src={minusIcon} alt="minus" width={18} height={18} />
                  </button>

                  <span className="qty__count">{quantity}</span>

                  <button onClick={handleIncrease} className="qty__btn">
                    <Image src={plusIcon} alt="plus" width={18} height={18} />
                  </button>
                </div>

                <button
                  className="cart__checkoutBtn"
                  onClick={() => router.push("/webapp/cart")}
                >
                  🛒 {t("footers.cart") || "Savat"}: {quantity}
                </button>
              </div>
            ) : (
              <button className="add__to__cart__btn" onClick={handleAddToCart}>
                {t("products.addcards") || "Savatga qo‘shish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
