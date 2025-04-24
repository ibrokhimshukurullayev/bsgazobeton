"use client";

import React, { useState } from "react";
import "./header.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Globe, User, ShoppingCart, Phone } from "lucide-react";

const languages = ["O'Z", "РУ", "EN"];

const Header = () => {
  const [lang, setLang] = useState("O'Z");
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const chooseLang = (l) => {
    setLang(l);
    setOpen(false);
  };

  return (
    <header id="header">
      <div className="container nav">
        <div className="nav__logo">
          <Link href={"/"}>
            <Image src={logo} alt="Logo" />
          </Link>
        </div>

        <ul className="nav__list">
          <li className="nav__item">
            <Link href={"/"} className="nav__link">
              Katalog
            </Link>
          </li>
          <li className="nav__item">
            <Link href={"/services"} className="nav__link">
              Xizmatlar
            </Link>
          </li>
          <li className="nav__item">
            <Link href={"/sotuvlar"} className="nav__link">
              Sotuvlar
            </Link>
          </li>
          <li className="nav__item">
            <Link href={"/aboutGazabeton"} className="nav__link">
              Gazobeton haqida
            </Link>
          </li>
          <li className="nav__item">
            <Link href={"/about"} className="nav__link">
              Biz haqimizda
            </Link>
          </li>
          <li className="nav__item">
            <Link href={"/sotuvlar/joylashuv"} className="nav__link">
              Aloqa
            </Link>
          </li>
        </ul>

        <div className="nav__end">
          <a className="nav__phone" href="tel:+998991502222">
            <Phone />
            (99) 150-22-22
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

            <button className="circle-btn">
              <User size={18} />
            </button>
            <button className="circle-btn">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
