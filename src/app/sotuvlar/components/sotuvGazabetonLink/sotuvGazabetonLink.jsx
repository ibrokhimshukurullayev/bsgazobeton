"use client";

import React from "react";
import "./sotuv.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const SotuvGazabetonLink = () => {
  const [t, i18n] = useTranslation("global");
  const pathname = usePathname();

  const links = [
    { href: "/sotuvlar", label: t("menu.sotuvlar.buyurtma") },
    {
      href: "/sotuvlar/tolovUsullari",
      label: t("menu.sotuvlar.tolov"),
    },
    { href: "/joylashuv", label: t("menu.sotuvlar.manzillar") },
  ];

  if (pathname === "/joylashuv") {
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

export default SotuvGazabetonLink;
