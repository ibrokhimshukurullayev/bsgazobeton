"use client";

import React from "react";
import "./sotuv.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const SalesGazobetonLink = () => {
  const [t] = useTranslation("global");
  const pathname = usePathname();

  const links = [
    { href: "/sales", label: t("menu.sotuvlar.buyurtma") },
    {
      href: "/sales/payment-methods",
      label: t("menu.sotuvlar.tolov"),
    },
    { href: "/contact", label: t("menu.sotuvlar.manzillar") },
  ];

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="sotuvLinkCard">
      <h3>{t("menu.sotuvlar.sotuvlar")}</h3>
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

export default SalesGazobetonLink;
