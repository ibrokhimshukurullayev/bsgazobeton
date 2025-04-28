"use client";

import React, { useState, useEffect } from "react";
import "./header.scss";
import Image from "next/image";
import Link from "next/link";
import logo from "../../assets/images/logo.png";
import { Globe, User, ShoppingCart, Phone } from "lucide-react";
import Modal from "../mudule/Modal";
import menu from "../../assets/images/menu.png";

const languages = ["O'Z", "РУ", "EN"];

const Header = () => {
  const [lang, setLang] = useState("O'Z");
  const [open, setOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen((prevState) => !prevState);
  };

  const closeNavbar = () => {
    setNavbarOpen(false);
  };
  const toggleDropdown = () => setOpen(!open);
  const chooseLang = (l) => {
    setLang(l);
    setOpen(false);
  };

  const toggleUserModal = () => setIsUserModalOpen((prev) => !prev);

  return (
    <>
      <header id="header">
        <div className="container nav">
          <div className="nav__logo">
            <Link href={"/"}>
              <Image src={logo} alt="Logo" />
            </Link>
          </div>

          <ul className="nav__list">
            <li className="nav__item">
              <Link href={"/katalog"} className="nav__link">
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
                <User size={18} />
              </button>
              <a href="/karzinka" className="circle-btns">
                <ShoppingCart size={18} />
              </a>
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
      <div id="navbar-responsive" style={{ left: navbarOpen ? "0" : "-100%" }}>
        <ul className="nav__lists">
          <li className="nav__item">
            <Link href={"/katalog"} className="nav__link">
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
        <button id="navbar-close" onClick={closeNavbar}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30"
            width="30"
            viewBox="0 0 512 512"
          >
            <path
              fill="#000000"
              d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"
            />
          </svg>
        </button>
      </div>
      <div id="main" onClick={closeNavbar}></div>

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
