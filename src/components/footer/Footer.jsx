"use client";
import React, { useMemo } from "react";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";
import "./footer.scss";
import instagram from "../../assets/images/social/intagram.svg";
import facebook from "../../assets/images/social/facebook.svg";
import yootube from "../../assets/images/social/youtube.svg";
import telegram from "../../assets/images/social/telegram.svg";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import useCatalogLinks from "../../hooks/useCatalogLinks";
import { buildNavigationGroups } from "../../lib/navigation";

const Footer = () => {
  const { t, i18n } = useTranslation("global");

  const { links: katalogFromApi, isLoading } = useCatalogLinks(i18n?.language);
  const dropdownItems = useMemo(
    () => buildNavigationGroups(t, katalogFromApi),
    [katalogFromApi, t]
  );

  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__column">
          <div className="footer__logo">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <div>
            <p className="">{t("footer.manzil")}</p>
            <p className="footer__list__text">{t("footer.addressLine1")}</p>
          </div>

          <div>
            <p className="">{t("footer.telefon")}</p>
            <p className="footer__list__text">+998 (99) 150-22-22</p>
            <p className="footer__list__text">+998 (99) 150-22-22</p>
          </div>

          <div>
            <p className="">{t("footer.email")}</p>
            <p className="footer__list__text">info@bsgroup.uz</p>
          </div>

          <div className="footer__socials">
            <a href="https://www.instagram.com/bs_gazobeton/">
              <Image src={instagram} alt="instagram" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=61575359537252">
              <Image src={facebook} alt="facebook" />
            </a>
            <a href="https://t.me/bsgazobeton_uz">
              <Image src={telegram} alt="telegram" />
            </a>
            <a href="https://www.youtube.com/@bsgazobeton">
              <Image src={yootube} alt="youtube" />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <p className="">{t("header.catalog")}</p>
          <ul>
            {isLoading ? (
              <li>Yuklanmoqda...</li>
            ) : (
              dropdownItems.katalog.map((item, i) => (
                <li key={i}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))
            )}
          </ul>

          <p className="">{t("header.services")}</p>
          <ul>
            {dropdownItems.services.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <p className="">{t("header.about")}</p>
          <ul>
            {dropdownItems.about.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <p className="">{t("header.sales")}</p>
          <ul>
            {dropdownItems.sales.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <p className="">{t("header.gazobetonAbout")}</p>
          <ul>
            {dropdownItems.gazobeton.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__list__text">{t("footer.title")}</p>
      </div>
    </footer>
  );
};

export default Footer;
