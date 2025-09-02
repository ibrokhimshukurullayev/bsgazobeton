"use client";

import React from "react";
import "./aboutlink.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutLink = () => {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const links = [
    { href: "/about", label: t("menu.about.kompaniya") },
    { href: "/about/aboutSifat", label: t("menu.about.sifat") },
    { href: "/about/aboutMijoz", label: t("menu.about.mijoz") },
    { href: "/about/aboutOAV", label: t("menu.about.oav") },
    { href: "/about/news", label: t("menu.about.yangiliklar") },
    { href: "/about/vakansiyalar", label: t("menu.about.vakansiyalar") },
  ];

  return (
    <div className="aboutLinkCard">
      <h3>{t("menu.about.about")}</h3>
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

export default AboutLink;
