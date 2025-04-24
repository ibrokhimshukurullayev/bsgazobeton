"use client";

import React from "react";
import "./services.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/services", label: "Mahsulot bo’yicha konsultatsiya" },
  { href: "/services/gazablokmantaji", label: "Gazoblok montaji" },
  {
    href: "/services/calculator",
    label:
      "Loyihangiz uchun gazobloklar miqdorini va narxini hisoblang (Kalkulyator)",
  },
];

const ServicesGazabetonLink = () => {
  const pathname = usePathname();

  return (
    <div className="servicesLinkCard">
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

export default ServicesGazabetonLink;
