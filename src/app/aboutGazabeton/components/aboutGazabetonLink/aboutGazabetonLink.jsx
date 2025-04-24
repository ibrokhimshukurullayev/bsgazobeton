"use client";

import React from "react";
import "./about.scss";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/aboutGazabeton", label: "Gazobeton haqida batafsil" },
  {
    href: "/aboutGazabeton/aboutSinovtest",
    label: "Sinov testlari",
  },
  {
    href: "/aboutGazabeton/aboutSertifikat",
    label: "Sertifikat va litsenziyalar",
  },
  {
    href: "/aboutGazabeton/aboutQollanilishi",
    label: "Gazobetonning qo‘llanilish joylari",
  },
  {
    href: "/aboutGazabeton/aboutIshlatilishi",
    label: "Gazoblok ishlatish bo’yicha qo’llanma",
  },
  {
    href: "/aboutGazabeton/aboutMaterialardanFarqi",
    label: "Gazobetonning boshqa materiallardan farqi",
  },
  { href: "/aboutGazabeton/aboutFaq", label: "Tez-tez beriladigan savollar" },
];

const AboutGazabetonLink = () => {
  const pathname = usePathname();
  return (
    <div className="aboutLinkCard">
      <h3>Gazabeton haqimizda</h3>
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
