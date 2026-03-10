"use client";

import React from "react";
import "./aboutlink.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutLink = () => {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  const links = [
    { href: "/about", label: t("menu.about.company") },
    { href: "/about/quality-control", label: t("menu.about.quality") },
    { href: "/about/clients-partners", label: t("menu.about.clients") },
    { href: "/about/media", label: t("menu.about.media") },
    { href: "/about/news", label: t("menu.about.news") },
    { href: "/about/vacancies", label: t("menu.about.vacancies") },
  ];

  return (
    <div className="aboutLinkCard">
      <h3>{t("menu.about.title")}</h3>
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
