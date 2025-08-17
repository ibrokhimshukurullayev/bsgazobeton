"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import person from "../../assets/images/header/person.svg";
import cart from "../../assets/images/header/cart.svg";
import phone from "../../assets/images/header/phone.svg";
import { useTranslation } from "react-i18next";
import LangDropdown from "../select/langDropdown";
import { useRouter } from "next/navigation";
import arrov from "../../assets/images/arrov.svg";
import { useSelector } from "react-redux";
import { useGetCategoryQuery } from "../../context/categoryApi";
import "./style.scss";

const Header = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.value);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // ✅ to'g'ri destructuring
  const { t, i18n } = useTranslation("global");

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  const {
    data: dataGetCategory,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetCategoryQuery({ skip: 0, take: 10 });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "true") setIsUserModalOpen(true);
  }, []);

  const router = useRouter();

  const handleClick = () => {
    const token =
      typeof window !== "undefined" && localStorage.getItem("token");
    router.push(token ? "/profile" : "/login");
  };

  const toggleDropdown = (key) =>
    setActiveDropdown((prev) => (prev === key ? null : key));
  const toggleUserModal = () => setIsUserModalOpen((prev) => !prev);

  const resolveLangKey = (lng) => {
    const l = (lng || "").toLowerCase();
    if (l.startsWith("uz")) return "uz_uz";
    if (l.startsWith("ru")) return "ru_ru";
    if (l.startsWith("en")) return "en_us";
    return "uz_uz";
  };

  const katalogFromApi = useMemo(() => {
    const list = dataGetCategory?.data?.list ?? [];
    const langKey = resolveLangKey(i18n?.language);

    const sorted = [...list].sort((a, b) => {
      const pa = a.position ?? a.order ?? 0;
      const pb = b.position ?? b.order ?? 0;
      return pa - pb;
    });

    return sorted.map((cat) => {
      const id =
        cat.productcategoryid ?? cat.id ?? cat.productCategoryId ?? null;

      let label = "";
      const trName = cat?.translations?.name;

      if (typeof trName === "string") {
        label = trName;
      } else if (trName && typeof trName === "object") {
        label = trName[langKey] ?? Object.values(trName).find(Boolean) ?? "";
      } else {
        label = cat?.name ?? "";
      }

      return {
        label: String(label),
        href: id ? `/katalog?productcategoryid=${id}` : "/katalog",
      };
    });
  }, [dataGetCategory, i18n?.language]);

  const dropdownItems = useMemo(
    () => ({
      katalog:
        !categoryLoading &&
        !categoryError &&
        katalogFromApi.length &&
        katalogFromApi,
      xizmatlar: [
        { label: t("menu.xizmatlar.konsultatsiya"), href: "/services" },
        {
          label: t("menu.xizmatlar.montaj"),
          href: "/services/gazablokmantaji",
        },
        { label: t("menu.xizmatlar.hisoblash"), href: "/services/calculator" },
      ],
      sotuvlar: [
        { label: t("menu.sotuvlar.buyurtma"), href: "/sotuvlar" },
        { label: t("menu.sotuvlar.tolov"), href: "/sotuvlar/tolovUsullari" },
        { label: t("menu.sotuvlar.manzillar"), href: "/joylashuv" },
      ],
      gazobeton: [
        { label: t("menu.gazobeton.haqida"), href: "/aboutGazabeton" },
        {
          label: t("menu.gazobeton.testlar"),
          href: "/aboutGazabeton/aboutSinovtest",
        },
        {
          label: t("menu.gazobeton.sertifikat"),
          href: "/aboutGazabeton/aboutSertifikat",
        },
        {
          label: t("menu.gazobeton.qollanilishi"),
          href: "/aboutGazabeton/aboutQollanilishi",
        },
        {
          label: t("menu.gazobeton.qollanma"),
          href: "/aboutGazabeton/aboutIshlatilishi",
        },
        {
          label: t("menu.gazobeton.farqi"),
          href: "/aboutGazabeton/aboutMaterialardanFarqi",
        },
        { label: t("menu.gazobeton.faq"), href: "/aboutGazabeton/aboutFaq" },
      ],
      about: [
        { label: t("menu.about.kompaniya"), href: "/about" },
        { label: t("menu.about.sifat"), href: "/about/aboutSifat" },
        { label: t("menu.about.mijoz"), href: "/about/aboutMijoz" },
        { label: t("menu.about.oav"), href: "/about/aboutOAV" },
        { label: t("menu.about.vakansiyalar"), href: "/about/vakansiyalar" },
      ],
    }),
    [katalogFromApi, categoryLoading, categoryError, t]
  );

  const navLinks = [
    { href: "/katalog", label: t("header.catalog"), key: "katalog" },
    { href: "/services", label: t("header.services"), key: "xizmatlar" },
    { href: "/sotuvlar", label: t("header.sales"), key: "sotuvlar" },
    {
      href: "/aboutGazabeton",
      label: t("header.gazabetonabout"),
      key: "gazobeton",
    },
    { href: "/about", label: t("header.about"), key: "about" },
    { href: "/joylashuv", label: t("header.contact") },
  ];

  return (
    <>
      <header id="header">
        <div className="container nav">
          <div className="nav__logo">
            <Link href="/">
              <Image src={logo} alt="Logo" />
            </Link>
          </div>

          <ul className="nav__list">
            {navLinks.map((item) => (
              <li
                className="nav__item"
                key={item.label}
                onMouseEnter={() => setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link href={item.href} className="nav__link">
                  {item.label}
                </Link>

                {dropdownItems[item.key] && activeDropdown === item.key && (
                  <div className="mega-dropdown">
                    {item.key === "katalog" && categoryLoading ? (
                      <div style={{ padding: 8, color: "#6b7280" }}>
                        Yuklanmoqda…
                      </div>
                    ) : (
                      <ul>
                        {dropdownItems[item.key].map((subItem, i) => (
                          <li key={i}>
                            <Link href={subItem.href}>{subItem.label}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <div className="nav__end">
            <a className="nav__phone" href="tel:+998991502222">
              <Image src={phone} alt="phone" />
              <span>(99) 150-22-22</span>
            </a>
            <div className="nav__actions">
              <LangDropdown />
              <button className="circle-btns" onClick={handleClick}>
                <Image src={person} alt="person" />
              </button>

              <Link href="/karzinka" className="circle-btns">
                <div className="iconWrapper">
                  <Image src={cart} alt="cart" />
                  {cartCount?.length > 0 && (
                    <span className="badge">{cartCount?.length}</span>
                  )}
                </div>
              </Link>

              <button
                id="navbar-open"
                onClick={toggleNavbar}
                className="nav__icons"
              >
                <Image src={menu} alt="menu" width={16} height={14} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile */}
      <div id="navbar-responsive" style={{ top: navbarOpen ? "0" : "-100%" }}>
        <ul className="nav__lists">
          {navLinks.map((item) => (
            <li key={item.label} className="nav__item">
              <div
                className="nav__link"
                onClick={() => toggleDropdown(item.key)}
              >
                {item.label}
                {dropdownItems[item.key] && <Image src={arrov} alt="arrow" />}
              </div>

              {activeDropdown === item.key && dropdownItems[item.key] && (
                <ul className="dropdown__list">
                  {dropdownItems[item.key].map((subItem, i) => (
                    <li key={i}>
                      <Link
                        href={subItem.href}
                        className="dropdown__link"
                        onClick={() => setNavbarOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="nav__res">
          <div className="nav__actions">
            <LangDropdown />
            <button className="circle-btn" onClick={toggleUserModal}>
              <Image src={person} alt="person" />
            </button>
            <Link href="/karzinka" className="circle-btns">
              <Image src={cart} alt="cart" />
            </Link>
          </div>
          <button className="circle__btn" onClick={toggleUserModal}>
            <Image src={person} alt="person" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Header;
