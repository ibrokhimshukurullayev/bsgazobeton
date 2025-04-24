"use client";

import React from "react";
import "./sotuv.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/sotuvlar", label: "Buyurtma berish va yetkazib berish tartibi" },
  { href: "/sotuvlar/tolovUsullari", label: "To’lov usullari" },
  { href: "/sotuvlar/joylashuv", label: "Manzillar" },
];

const SotuvGazabetonLink = () => {
  const pathname = usePathname();

  // Agar joylashuv sahifasida bo‘lsak, bu komponent umuman ko‘rinmaydi
  if (pathname === "/sotuvlar/joylashuv") {
    return null;
  }

  return (
    <div className="sotuvLinkCard">
      <h3>Sotuvlar</h3>
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
