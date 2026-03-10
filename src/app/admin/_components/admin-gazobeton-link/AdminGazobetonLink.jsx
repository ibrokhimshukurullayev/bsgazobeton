"use client";

import React from "react";
import "./admin.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Shaxsiy malumotlar" },
  {
    href: "/admin/order",
    label: "Buyurtmalar tarixi",
  },
  {
    href: "/",
    label: "Tizimdan chiqish",
  },
];

const AdminGazobetonLink = () => {
  const pathname = usePathname();
  return (
    <div className="adminLinkCard">
      <h3>Shaxsiy kabinet</h3>
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

export default AdminGazobetonLink;
