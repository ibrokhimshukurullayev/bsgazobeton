"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery } from "../../../../context/productApi";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState, useEffect } from "react";
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

export default function ProductDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.value);

  const { data, isLoading } = useGetProductQuery({ skip: 0, take: 1000 });
  const product = data?.data?.list?.find(
    (p) => String(p.productid) === String(id)
  );

  const langKey =
    i18n.language === "uz"
      ? "uz_uz"
      : i18n.language === "ru"
      ? "ru_ru"
      : "en_us";

  const getLocalizedValue = (obj) => {
    if (!obj) return "";
    if (typeof obj === "string") return obj;
    return obj[langKey] || obj.uz_uz || "";
  };

  const productInCart = cart.find(
    (item) => item.productid === product?.productid
  );

  const [quantity, setQuantity] = useState(productInCart?.quantity || 0);

  useEffect(() => {
    setQuantity(productInCart?.quantity || 0);
  }, [productInCart?.quantity]);

  if (isLoading) return <Loading />;
  if (!product) return <div>Mahsulot topilmadi</div>;

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

  return (
    <div className="product__detail__wrapper">
      <div className="fixed-top-overlay"></div>

      <h3 className="product__detail__title">
        {getLocalizedValue(product.name)}
      </h3>

      <div id="product__body">
        <div className="container product__detail__content">
          <div className="product-image-container">
            <Image
              src={
                product?.imageurl
                  ? `https://api.bsgazobeton.uz${product.imageurl}`
                  : "/no-image.png"
              }
              alt={getLocalizedValue(product.name)}
              width={300}
              height={300}
              className="product-image"
            />
          </div>

          <div className="product-info">
            <h1 className="product-title">{getLocalizedValue(product.name)}</h1>

            <div className="product__specs">
              <div className="product-price">
                {product.price?.toLocaleString()} UZS
                {product.unit ? "/" + getLocalizedValue(product.unit) : ""}
              </div>

              <div className="spec-title">Texnik xususiyatlari</div>
              {tech.length > 0 ? (
                tech.map((item, idx) => (
                  <div key={idx} className="spec-row">
                    <div className="spec-label">
                      {getLocalizedValue(item.key)}:
                    </div>
                    <div className="spec-value">
                      {getLocalizedValue(item.value)}{" "}
                      {item.unit ? getLocalizedValue(item.unit) : ""}
                    </div>
                  </div>
                ))
              ) : (
                <p className="spec-empty">Maʼlumot mavjud emas</p>
              )}
            </div>

            <div className="product-features">
              <h2 className="features-title">Mahsulot haqida</h2>
              <ul className="features-list">
                {product.description ? (
                  <li>
                    <span className="feature-text">
                      {getLocalizedValue(product.description)}
                    </span>
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
                  🛒 Savat: {quantity}
                </button>
              </div>
            ) : (
              <button className="add__to__cart__btn" onClick={handleAddToCart}>
                Savatga qo‘shish
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
