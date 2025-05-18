"use client";

import React from "react";
import "./about.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutGazabetonLink = () => {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const links = [
    { href: "/aboutGazabeton", label: t("menu.gazobeton.haqida") },
    {
      href: "/aboutGazabeton/aboutSinovtest",
      label: t("menu.gazobeton.testlar"),
    },
    {
      href: "/aboutGazabeton/aboutSertifikat",
      label: t("menu.gazobeton.sertifikat"),
    },
    {
      href: "/aboutGazabeton/aboutQollanilishi",
      label: t("menu.gazobeton.qollanilishi"),
    },
    {
      href: "/aboutGazabeton/aboutIshlatilishi",
      label: t("menu.gazobeton.qollanma"),
    },
    {
      href: "/aboutGazabeton/aboutMaterialardanFarqi",
      label: t("menu.gazobeton.farqi"),
    },
    { href: "/aboutGazabeton/aboutFaq", label: t("menu.gazobeton.faq") },
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
