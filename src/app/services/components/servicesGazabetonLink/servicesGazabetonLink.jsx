"use client";

import React from "react";
import "./services.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const ServicesGazabetonLink = () => {
  const [t, i18n] = useTranslation("global");
  const pathname = usePathname();

  const links = [
    { href: "/services", label: t("menu.xizmatlar.konsultatsiya") },
    {
      href: "/services/gazablokmantaji",
      label: t("menu.xizmatlar.montaj"),
    },
    {
      href: "/services/calculator",
      label: t("menu.xizmatlar.hisoblash"),
    },
  ];

  return (
    <div className="servicesLinkCard">
      <h3>{t("menu.xizmatlar.xizmatlar")}</h3>
      {links.map((link, index) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={index}
            href={link.href}
            className={isActive ? "active" : ""}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default ServicesGazabetonLink;
