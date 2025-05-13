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
import dropdownItems from "../../static/index";

import arrov from "../../assets/images/arrov.svg";
import "./header.scss";

const languages = ["O'Z", "РУ", "EN"];

const Header = () => {
  const [lang, setLang] = useState("O'Z");
  const [open, setOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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

  const navLinks = [
    { href: "/katalog", label: "Katalog", key: "katalog" },
    { href: "/services", label: "Xizmatlar", key: "xizmatlar" },
    { href: "/sotuvlar", label: "Sotuvlar", key: "sotuvlar" },
    {
      href: "/aboutGazabeton",
      label: "Gazobeton haqida",
      key: "gazobeton",
    },
    { href: "/about", label: "Biz haqimizda", key: "about" },
    { href: "/joylashuv  ", label: "Aloqa" },
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
              <div className="lang-dropdown">
                <button onClick={toggleDropdown} className="circle-btn">
                  <Globe size={18} />
                  <span>{lang}</span>
                </button>
                {open && (
                  <div className="lang-options">
                    {languages.map((l) => (
                      <div
                        key={l}
                        className={`lang-option ${lang === l ? "active" : ""}`}
                        onClick={() => chooseLang(l)}
                      >
                        {l}
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
          <div className="lang-dropdown">
            <button onClick={toggleDropdown} className="circle__btn">
              <Globe size={18} />
              <span>{lang}</span>
            </button>
            {open && (
              <div className="lang-options">
                {languages.map((l) => (
                  <div
                    key={l}
                    className={`lang-option ${lang === l ? "active" : ""}`}
                    onClick={() => chooseLang(l)}
                  >
                    {l}
                  </div>
                ))}
              </div>
            )}
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
