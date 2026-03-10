"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../assets/images/logo.svg";
import menu from "../../assets/images/menu.svg";
import person from "../../assets/images/header/person.svg";
import cart from "../../assets/images/header/cart.svg";
import phone from "../../assets/images/header/phone.svg";
import arrov from "../../assets/images/arrov.svg";
import { useTranslation } from "react-i18next";
import LangDropdown from "../select/langDropdown";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../../context/orderApi";
import "./style.scss";
import useLoginCartSync from "../../hooks/useLoginCartSync";
import useCatalogLinks from "../../hooks/useCatalogLinks";
import {
  buildHeaderLinks,
  buildNavigationGroups,
} from "../../lib/navigation";

const Header = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const localCart = useSelector((state) => state.cart.value);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const { t, i18n } = useTranslation("global");
  const router = useRouter();

  function logoutAndCleanup(redirectToLogin = true) {
    try {
      localStorage.removeItem("token");
      window.dispatchEvent(new CustomEvent("auth:logout"));
    } catch (e) {}
    if (redirectToLogin) {
      router.push("/login");
    }
  }
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useLoginCartSync(token);

  const {
    data: serverCart,
    isFetching: cartFetching,
    error: serverCartError,
  } = useGetUserOrdersQuery(undefined, {
    skip: !token,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  // 401/expired bo'lsa tokenni o'chirish
  useEffect(() => {
    if (!serverCartError) return;

    const status =
      serverCartError?.status ||
      serverCartError?.originalStatus ||
      serverCartError?.data?.status;

    const msg =
      (serverCartError?.data &&
        (serverCartError.data.message ||
          serverCartError.data.error ||
          serverCartError.data.detail)) ||
      "";

    if (status === 401 || status === 403) {
      logoutAndCleanup(true);
    }
  }, [serverCartError]);

  const serverCount = useMemo(() => {
    const d = serverCart;
    if (!d) return 0;

    const rows = Array.isArray(d)
      ? d
      : Array.isArray(d.items)
      ? d.items
      : Array.isArray(d.list)
      ? d.list
      : Array.isArray(d.data)
      ? d.data
      : Array.isArray(d.result)
      ? d.result
      : null;

    if (rows) {
      const active = rows.filter((r) => {
        const s = String(r.state || "").toLowerCase();
        return (
          s === "" ||
          s === "created" ||
          s === "create" ||
          s === "update" ||
          s === "active"
        );
      });
      return active.reduce(
        (sum, it) =>
          sum + (Number(it.quantity ?? it.qty ?? it.count ?? 0) || 0),
        0
      );
    }

    const total = d.totalQuantity ?? d.total ?? d.count ?? d.total_count ?? 0;
    return Number(total) || 0;
  }, [serverCart]);

  const localCount = useMemo(
    () =>
      Array.isArray(localCart)
        ? localCart.reduce((s, it) => s + (Number(it.quantity) || 0), 0)
        : 0,
    [localCart]
  );

  const badgeCount = token ? serverCount : localCount;

  const [bump, setBump] = useState(false);
  const prevRef = useRef(badgeCount);
  useEffect(() => {
    if (badgeCount !== prevRef.current) {
      setBump(true);
      const to = setTimeout(() => setBump(false), 300);
      prevRef.current = badgeCount;
      return () => clearTimeout(to);
    }
  }, [badgeCount]);

  // ----- NAV -----
  const toggleNavbar = () => setNavbarOpen(!navbarOpen);

  const { links: katalogFromApi, isLoading: categoryLoading } = useCatalogLinks(
    i18n?.language
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "true") setIsUserModalOpen(true);
  }, []);

  const handleClick = () => {
    const tk = typeof window !== "undefined" && localStorage.getItem("token");
    router.push(tk ? "/profile" : "/login");
  };

  const toggleDropdown = (key) =>
    setActiveDropdown((prev) => (prev === key ? null : key));
  const toggleUserModal = () => setIsUserModalOpen((prev) => !prev);

  const dropdownItems = useMemo(
    () => buildNavigationGroups(t, categoryLoading ? [] : katalogFromApi),
    [katalogFromApi, categoryLoading, t]
  );

  const navLinks = useMemo(() => buildHeaderLinks(t), [t]);

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

                {/* DESKTOP DROPDOWN */}
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
              <div className="header__lang">
                <LangDropdown />
              </div>
              <button className="circle-btns" onClick={handleClick}>
                <Image src={person} alt="person" />
              </button>

              <Link
                href="/cart"
                className={`circle-btns ${bump ? "badge-bump" : ""}`}
              >
                <div className="iconWrapper">
                  <Image src={cart} alt="cart" />
                  {badgeCount > 0 && (
                    <span className="badge">
                      {cartFetching ? "…" : badgeCount}
                    </span>
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

      {/* MOBILE NAV */}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
