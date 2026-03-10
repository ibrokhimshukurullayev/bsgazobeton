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
    { href: "/sales", label: t("menu.sales.orderDelivery") },
    {
      href: "/sales/payment-methods",
      label: t("menu.sales.paymentMethods"),
    },
    { href: "/contact", label: t("menu.sales.addresses") },
  ];

  if (pathname === "/contact") {
    return null;
  }

  return (
    <div className="sotuvLinkCard">
      <h3>{t("menu.sales.title")}</h3>
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
