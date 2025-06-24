"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import person from "../../assets/images/header/person.svg";
import cart from "../../assets/images/header/cart.svg";
import phone from "../../assets/images/header/phone.svg";
import { Globe, User, ShoppingCart, Phone } from "lucide-react";
import Modal from "../mudule/Modal";
import { useTranslation } from "react-i18next";
import LangDropdown from "../select/langDropdown";

import arrov from "../../assets/images/arrov.svg";
import "./header.scss";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [t, i18n] = useTranslation("global");

  const toggleNavbar = () => setNavbarOpen(!navbarOpen);
  const closeNavbar = () => setNavbarOpen(false);
  const chooseLang = (l) => {
    setLang(l);
    setOpen(false);
  };

  const toggleDropdown = (key) => {
    setActiveDropdown((prev) => (prev === key ? null : key));
  };

  const toggleUserModal = () => setIsUserModalOpen((prev) => !prev);
  const dropdownItems = {
    katalog: [
      { label: t("menu.katalog.gazobloklar"), href: "#" },
      { label: t("menu.katalog.panellar"), href: "#" },
      { label: t("menu.katalog.kleylar"), href: "#" },
      {
        label: t("menu.katalog.instrumentlar"),
        href: "#",
      },
    ],
    xizmatlar: [
      { label: t("menu.xizmatlar.konsultatsiya"), href: "/services" },
      { label: t("menu.xizmatlar.montaj"), href: "/services/gazablokmantaji" },
      {
        label: t("menu.xizmatlar.hisoblash"),
        href: "/services/calculator",
      },
    ],
    sotuvlar: [
      {
        label: t("menu.sotuvlar.buyurtma"),
        href: "/sotuvlar",
      },
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
      {
        label: t("menu.gazobeton.faq"),
        href: "/aboutGazabeton/aboutFaq",
      },
    ],
    about: [
      { label: t("menu.about.kompaniya"), href: "/about" },
      { label: t("menu.about.sifat"), href: "/about/aboutSifat" },
      { label: t("menu.about.mijoz"), href: "/about/aboutMijoz" },
      { label: t("menu.about.oav"), href: "/about/aboutOAV" },
      { label: t("menu.about.yangiliklar"), href: "#" },
      { label: t("menu.about.vakansiyalar"), href: "#" },
    ],
  };

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
    { href: "/joylashuv  ", label: t("header.contact") },
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
                    <ul>
                      {dropdownItems[item.key].map((subItem, i) => (
                        <li key={i}>
                          <Link href={subItem.href}>{subItem.label}</Link>
                        </li>
                      ))}
                    </ul>
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

              <button className="circle-btn" onClick={toggleUserModal}>
                <Image src={person} alt="person" />
              </button>
              <Link href="/karzinka" className="circle-btns">
                <Image src={cart} alt="cart" />
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

      {isUserModalOpen && (
        <Modal
          isOpen={isUserModalOpen}
          onClose={() => setIsUserModalOpen(false)}
        />
      )}
    </>
  );
};

export default Header;
