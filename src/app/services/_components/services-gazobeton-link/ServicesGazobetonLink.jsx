"use client";

import React from "react";
import "./services.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const ServicesGazobetonLink = () => {
  const [t] = useTranslation("global");
  const pathname = usePathname();

  const links = [
    { href: "/services", label: t("menu.services.consultation") },
    {
      href: "/services/gas-block-installation",
      label: t("menu.services.installation"),
    },
    {
      href: "/services/calculator",
      label: t("menu.services.calculator"),
    },
  ];

  return (
    <div className="servicesLinkCard">
      <h3>{t("menu.services.title")}</h3>
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

export default ServicesGazobetonLink;
