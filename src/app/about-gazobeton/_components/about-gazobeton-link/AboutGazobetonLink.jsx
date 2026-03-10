"use client";

import React from "react";
import "./about.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutGazabetonLink = () => {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  const links = [
    { href: "/about-gazobeton", label: t("menu.gazobeton.overview") },
    {
      href: "/about-gazobeton/tests",
      label: t("menu.gazobeton.tests"),
    },
    {
      href: "/about-gazobeton/certificates",
      label: t("menu.gazobeton.certificates"),
    },
    {
      href: "/about-gazobeton/applications",
      label: t("menu.gazobeton.applications"),
    },
    {
      href: "/about-gazobeton/usage-guide",
      label: t("menu.gazobeton.usageGuide"),
    },
    {
      href: "/about-gazobeton/material-differences",
      label: t("menu.gazobeton.materialDifferences"),
    },
    { href: "/about-gazobeton/faq", label: t("menu.gazobeton.faq") },
  ];

  return (
    <div className="aboutLinkCard">
      <h3>{t("menu.gazobeton.title")}</h3>
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
