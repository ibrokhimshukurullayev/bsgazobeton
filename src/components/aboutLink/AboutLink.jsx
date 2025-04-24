"use client";

import React from "react";
import "./aboutlink.scss";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/about", label: "Kompaniya haqida" },
  { href: "/about/aboutSifat", label: "Sifat nazorati va laboratoriya" },
  { href: "/about/aboutMijoz", label: "Mijozlar va hamkorlar" },
  { href: "/about/aboutOAV", label: "Biz haqimizda OAV" },
  // { href: "/", label: "Yangiliklar" },
  // { href: "/", label: "Vakansiyalar" },
];

const AboutLink = () => {
  const pathname = usePathname();

  return (
    <div className="aboutLinkCard">
      <h3>Biz haqimizda</h3>
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
