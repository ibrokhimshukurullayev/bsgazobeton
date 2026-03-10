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
    { href: "/about-gazobeton", label: t("menu.gazobeton.haqida") },
    {
      href: "/about-gazobeton/tests",
      label: t("menu.gazobeton.testlar"),
    },
    {
      href: "/about-gazobeton/certificates",
      label: t("menu.gazobeton.sertifikat"),
    },
    {
      href: "/about-gazobeton/applications",
      label: t("menu.gazobeton.qollanilishi"),
    },
    {
      href: "/about-gazobeton/usage-guide",
      label: t("menu.gazobeton.qollanma"),
    },
    {
      href: "/about-gazobeton/material-differences",
      label: t("menu.gazobeton.farqi"),
    },
    { href: "/about-gazobeton/faq", label: t("menu.gazobeton.faq") },
  ];

  return (
    <div className="aboutLinkCard">
      <h3>{t("menu.gazobeton.gazobeton")}</h3>
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
