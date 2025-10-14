"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import "./home.scss";
import "../page.scss";

import main from "../../../assets/images/webappImages/main.svg";
import cart from "../../../assets/images/webappImages/cart.svg";
import order from "../../../assets/images/webappImages/order.svg";
import profile from "../../../assets/images/webappImages/profile.svg";
import logo from "../../../assets/images/webappImages/logo.svg";
import notifacation from "../../../assets/images/webappImages/notifacation.svg";
import rights from "../../../assets/images/webappImages/rights.svg";
import product1 from "../../../assets/images/webappImages/card1.svg";

import { useGetCategoryQuery } from "../../../context/categoryApi";
import Loading from "../../../components/loading/Loading";

function getName(cat, language = "uz_Uz") {
  if (!cat) return "";
  if (typeof cat.name === "string" && cat.name) return cat.name;
  const n =
    (cat.name && (cat.name.uz_uz || cat.name.ru_ru || cat.name.en_us)) || "";
  return String(n);
}

const Home = () => {
  const router = useRouter();
  const [language, setLanguage] = useState(() => {
    return (
      (typeof window !== "undefined" && localStorage.getItem("language")) ||
      "uz_Uz"
    );
  });

  const {
    data: catRes,
    isLoading,
    error,
    refetch,
  } = useGetCategoryQuery({ skip: 0, take: 1000 });

  useEffect(() => {
    const onLang = (e) => {
      const newLang =
        (e && e.detail) ||
        (typeof window !== "undefined" && localStorage.getItem("language")) ||
        "uz_Uz";
      setLanguage(newLang);
    };
    window.addEventListener("languageChanged", onLang);
    return () => window.removeEventListener("languageChanged", onLang);
  }, []);

  useEffect(() => {
    refetch();
  }, [language, refetch]);

  const categories = useMemo(() => catRes?.data?.list || [], [catRes]);
  const rootCategories = useMemo(
    () => categories.filter((c) => c.parentproductcategoryid == null),
    [categories]
  );

  if (isLoading) return <Loading />;
  if (error) return <div>Xatolik yuz berdi</div>;

  return (
    <div className="container">
      <div className="home__header">
        <ul className="home__header__list">
          <li>
            <Image src={logo} alt="logo" width={105} height={32} />
          </li>
        </ul>

        {/* Mahsulot kategoriyalari */}
        <div className="home__cards">
          <h3 className="home__cards__title">Mahsulotlar</h3>
          <div className="home__box">
            {rootCategories.length > 0 ? (
              rootCategories.map((el) => (
                <div
                  key={el.productcategoryid}
                  className="home__card"
                  onClick={() =>
                    router.push(
                      `/webapp/products?productcategoryid=${el.productcategoryid}`
                    )
                  }
                >
                  <Image
                    className="home__card__img"
                    src={
                      el?.imageurl
                        ? `https://api.bsgazobeton.uz${el.imageurl}`
                        : product1
                    }
                    alt={getName(el, language)}
                    width={133}
                    height={92}
                  />
                  <p className="home__card__text">{getName(el, language)}</p>
                </div>
              ))
            ) : (
              <div className="no__category">
                <p>Kategoriyalar mavjud emas</p>
              </div>
            )}
          </div>
        </div>

        {/* Kalkulyator */}
        <div className="home__calculator">
          <h3 className="home__calculator__title">Kalkulyator</h3>
          <div className="home__calculator__card">
            <div className="home__calculator__content">
              <h4 className="home__calculator__content__title">
                Gazobloklar sonini bilasizmi?
              </h4>
              <p className="home__calculator__content__text">
                Loyihangiz uchun kerakli gazoblok miqdori va narxini onlayn
                hisoblang!
              </p>
              <div className="home__calculator__card__end">
                <button
                  onClick={() => router.push("/webapp/calculate")}
                  className="home__calculator__card__button"
                >
                  Hisoblash
                  <Image src={rights} alt="right" width={16} height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
