"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import main from "../../assets/images/webappImages/main.svg";
import cart from "../../assets/images/webappImages/cart.svg";
import order from "../../assets/images/webappImages/order.svg";
import profile from "../../assets/images/webappImages/profile.svg";

import homered from "../../assets/images/webappImages/homered.svg";
import cartred from "../../assets/images/webappImages/cartred.svg";
import ordersred from "../../assets/images/webappImages/ordersred.svg";
import profilered from "../../assets/images/webappImages/profilered.svg";

import "./page.scss";

export default function WebappFooter() {
  const { t, i18n } = useTranslation("global");
  const router = useRouter();
  const pathname = usePathname();

  const [lang, setLang] = useState(i18n.language);
  useEffect(() => {
    const handleLangChange = () => setLang(i18n.language);
    i18n.on("languageChanged", handleLangChange);
    return () => i18n.off("languageChanged", handleLangChange);
  }, [i18n]);

  const navItems = [
    {
      path: "/webapp/home",
      label: t("footers.main"),
      icon: main,
      activeIcon: homered,
    },
    {
      path: "/webapp/cart",
      label: t("footers.cart"),
      icon: cart,
      activeIcon: cartred,
    },
    {
      path: "/webapp/orders",
      label: t("footers.orders"),
      icon: order,
      activeIcon: ordersred,
    },
    {
      path: "/webapp/profile",
      label: t("footers.profile"),
      icon: profile,
      activeIcon: profilered,
    },
  ];

  return (
    <ul className="home__footer__list">
      {navItems.map((item, index) => {
        const isActive = pathname === item.path;
        return (
          <li
            key={index}
            onClick={() => router.push(item.path)}
            className={isActive ? "active" : ""}
          >
            <div className="icon-wrapper">
              <Image
                src={isActive ? item.activeIcon : item.icon}
                alt={item.label}
                width={24}
                height={24}
              />
            </div>
            <span>{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
