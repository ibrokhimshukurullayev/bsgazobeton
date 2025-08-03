"use client";

import React from "react";
import "./Profile.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutGazabetonLink = () => {
  const pathname = usePathname();

  const links = [
    { href: "/profile", label: "Shaxsiy ma’lumotlar" },
    {
      href: "/profile/buyurtmalar",
      label: "Buyurtmalar",
    },
  ];

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
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
};

export default AboutGazabetonLink;
