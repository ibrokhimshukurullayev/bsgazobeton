"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetProductQuery } from "../../../../context/productApi";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incCart, decCart } from "../../../../context/cartSlice";
import Loading from "../../../../components/loading/Loading";

import back from "../../../../assets/images/webappImages/left.svg";
import share from "../../../../assets/images/webappImages/share.svg";
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
    dispatch(addToCart({ ...product, quantity: 1 }));
    setQuantity(1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
    dispatch(incCart(product));
  };

  const handleDecrease = () => {
    if (quantity <= 1) {
      setQuantity(0);
      dispatch(decCart(product)); // Redux slice ichida 0 bo‘lsa remove qiladigan qilib yozilgan bo‘lishi kerak
    } else {
      setQuantity((prev) => prev - 1);
      dispatch(decCart(product));
    }
  };

  return (
    <div id="product__body">
      <div className="container product__detail__content">
        {/* HEADER */}
        <div className="product__detail__header">
          <div className="back-button" onClick={() => router.back()}>
            <Image src={back} alt="back" width={24} height={24} />
          </div>
          <div className="share-button">
            <Image src={share} alt="share" width={24} height={24} />
          </div>
        </div>

        {/* PRODUCT IMAGE */}
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

        {/* INFO */}
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
                    {getLocalizedValue(item.unit)}
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

        {/* ACTIONS */}
        <div className="product__actions">
          {quantity > 0 ? (
            <div className="product__quantity">
              <button
                onClick={handleDecrease}
                className="cart__quantity__add product__quantity"
              >
                <Image src={minusIcon} alt="minus" width={20} height={20} />
              </button>
              <span className="cart__quantity__text">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="cart__quantity__add product__quantity"
              >
                <Image src={plusIcon} alt="plus" width={20} height={20} />
              </button>
            </div>
          ) : (
            <button className="form__button" onClick={handleAddToCart}>
              Savatchaga qo‘shish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
