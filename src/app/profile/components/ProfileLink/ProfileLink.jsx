"use client";

import React from "react";
import "./Profile.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

const AboutGazabetonLink = () => {
  const { t } = useTranslation("global");
  const pathname = usePathname();
  const dispatch = useDispatch();

  const links = [
    { href: "/profile", label: t("Shaxsiy ma’lumotlar") },
    {
      href: "/profile/buyurtmalar",
      label: t("Buyurtmalar"),
    },
    {
      href: "/",
      label: t("Tizimdan chiqish"),
    },
  ];

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("carts");
      localStorage.removeItem("wishlist");
      localStorage.removeItem("cart_synced_for");
    } catch (e) {}
    dispatch(clearCart());
  };
  return (
    <div className="aboutLinkCard">
      <h3>Profile</h3>
      {links.map((link, index) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={index}
            href={link.href}
            className={isActive ? "active" : ""}
            onClick={link?.href === "/" && handleLogout}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default AboutGazabetonLink;
