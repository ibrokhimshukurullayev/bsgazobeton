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
import useDebouncedCartSaver from "../../../../hooks/useDebouncedCartSaver";
import { useGetUserOrdersQuery } from "../../../../context/orderApi";

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

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const lang = i18n.language || "uz";

  const { data, isLoading } = useGetProductQuery({ skip: 0, take: 1000 });
  const product = data?.data?.list?.find(
    (p) => String(p.productid) === String(id)
  );

  // 🧾 serverdagi cart holatini olish
  const { data: serverCart } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // 💾 Backend bilan cart sinxronlash hook
  const { saveLater, isSyncing } = useDebouncedCartSaver({
    token,
    debounceMs: 1000,
  });

  // 🔍 Server va local cartdan item topish
  const serverItem = useMemo(() => {
    if (!token || !serverCart) return null;
    const rows =
      serverCart?.data?.list ||
      serverCart?.data ||
      serverCart?.list ||
      serverCart?.items ||
      serverCart?.result ||
      [];
    if (!Array.isArray(rows)) return null;
    return rows.find(
      (x) =>
        String(x?.productid) === String(id) ||
        String(x?.productId) === String(id) ||
        String(x?.id) === String(id)
    );
  }, [token, serverCart, id]);

  const localItem = useMemo(() => {
    if (!Array.isArray(cart)) return null;
    return cart.find(
      (x) =>
        String(x?.productid) === String(id) ||
        String(x?.productId) === String(id) ||
        String(x?.id) === String(id)
    );
  }, [cart, id]);

  const baseQty = Number(serverItem?.quantity ?? 0);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setDelta(0);
  }, [token, baseQty]);

  const uiQty = token ? baseQty + delta : Number(localItem?.quantity ?? 0);
  const hasQty = uiQty > 0;

  const nextState = (prev, next) =>
    next === 0 ? "Delete" : prev === 0 ? "Create" : "Update";

  const handleAdd = () => {
    if (!product) return;
    if (!token) {
      dispatch(addToCart(product));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(id, next, nextState(prev, next));
  };

  const handleInc = () => {
    if (!product) return;
    if (!token) {
      dispatch(incCart(product));
      return;
    }
    const prev = baseQty + delta;
    const next = prev + 1;
    setDelta((d) => d + 1);
    saveLater(id, next, nextState(prev, next));
  };

  const handleDec = () => {
    if (!product) return;
    if (!token) {
      const cur = Number(localItem?.quantity || 0);
      if (cur <= 1) {
        dispatch(removeFromCart(product));
      } else {
        dispatch(decCart(product));
      }
      return;
    }
    const prev = Math.max(0, baseQty + delta);
    const next = Math.max(0, prev - 1);
    setDelta((d) => Math.max(-baseQty, d - 1));
    saveLater(id, next, nextState(prev, next));
  };

  if (isLoading) return <Loading />;
  if (!product)
    return <div>{t("products.notFound") || "Mahsulot topilmadi"}</div>;

  const name = readI18n(product.name, lang);
  const desc = readI18n(product.description, lang);
  const unit = readI18n(product.unit, lang);
  const tech =
    Array.isArray(product.technicaldata) && product.technicaldata.length > 0
      ? product.technicaldata
      : [];

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
            {hasQty ? (
              <div className="product__action__box">
                <div className="product__quantity__box">
                  <button
                    onClick={handleDec}
                    className="qty__btn"
                    disabled={isSyncing && !!token}
                  >
                    <Image src={minusIcon} alt="minus" width={18} height={18} />
                  </button>

                  <span className="qty__count">
                    {uiQty} {unit ? unit : ""}
                  </span>

                  <button
                    onClick={handleInc}
                    className="qty__btn"
                    disabled={isSyncing && !!token}
                  >
                    <Image src={plusIcon} alt="plus" width={18} height={18} />
                  </button>
                </div>

                <button
                  className="cart__checkoutBtn"
                  onClick={() => router.push("/webapp/cart")}
                >
                  🛒 {t("footers.cart") || "Savat"}: {uiQty}
                </button>
              </div>
            ) : (
              <button
                className="add__to__cart__btn"
                onClick={handleAdd}
                disabled={isSyncing && !!token}
              >
                {t("products.addcards") || "Savatga qo‘shish"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
