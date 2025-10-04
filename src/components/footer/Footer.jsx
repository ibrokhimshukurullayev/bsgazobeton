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
import { useGetCategoryQuery } from "../../context/categoryApi";

function resolveLangKey(lng) {
  const l = (lng || "").toLowerCase();
  if (l.startsWith("uz")) return "uz_uz";
  if (l.startsWith("ru")) return "ru_ru";
  if (l.startsWith("en")) return "en_us";
  return "uz_uz";
}

const Footer = () => {
  const { t, i18n } = useTranslation("global");

  // kategoriyalar API dan
  const {
    data: dataGetCategory,
    isLoading,
    error,
  } = useGetCategoryQuery({
    skip: 0,
    take: 1000,
  });

  const katalogFromApi = useMemo(() => {
    const list = dataGetCategory?.data?.list ?? [];
    const langKey = resolveLangKey(i18n?.language);

    const parents = list.filter((cat) => !cat.parentproductcategoryid);

    const sorted = [...parents].sort((a, b) => {
      const pa = a.position ?? a.order ?? 0;
      const pb = b.position ?? b.order ?? 0;
      return pa - pb;
    });

    return sorted.map((cat) => {
      const id =
        cat.productcategoryid ?? cat.id ?? cat.productCategoryId ?? null;

      const trName = cat?.translations?.name;
      let label =
        typeof trName === "string"
          ? trName
          : trName?.[langKey] ??
            Object.values(trName || {}).find(Boolean) ??
            cat?.name ??
            "";

      return {
        label: String(label),
        href: id ? `/katalog?productcategoryid=${id}` : "/katalog",
      };
    });
  }, [dataGetCategory, i18n?.language]);

  const dropdownItems = {
    katalog: katalogFromApi,
    xizmatlar: [
      { label: t("menu.xizmatlar.konsultatsiya"), href: "/services" },
      { label: t("menu.xizmatlar.montaj"), href: "/services/gazablokmantaji" },
      { label: t("menu.xizmatlar.hisoblash"), href: "/services/calculator" },
    ],
    sotuvlar: [
      { label: t("menu.sotuvlar.buyurtma"), href: "/sotuvlar" },
      { label: t("menu.sotuvlar.tolov"), href: "/sotuvlar/tolovUsullari" },
      { label: t("menu.sotuvlar.manzillar"), href: "/joylashuv" },
    ],
    gazobeton: [
      { label: t("menu.gazobeton.haqida"), href: "/aboutGazabeton" },
      {
        label: t("menu.gazobeton.testlar"),
        href: "/aboutGazabeton/aboutSinovtest",
      },
      {
        label: t("menu.gazobeton.sertifikat"),
        href: "/aboutGazabeton/aboutSertifikat",
      },
      {
        label: t("menu.gazobeton.qollanilishi"),
        href: "/aboutGazabeton/aboutQollanilishi",
      },
      {
        label: t("menu.gazobeton.qollanma"),
        href: "/aboutGazabeton/aboutIshlatilishi",
      },
      {
        label: t("menu.gazobeton.farqi"),
        href: "/aboutGazabeton/aboutMaterialardanFarqi",
      },
      { label: t("menu.gazobeton.faq"), href: "/aboutGazabeton/aboutFaq" },
    ],
    about: [
      { label: t("menu.about.kompaniya"), href: "/about" },
      { label: t("menu.about.sifat"), href: "/about/aboutSifat" },
      { label: t("menu.about.mijoz"), href: "/about/aboutMijoz" },
      { label: t("menu.about.oav"), href: "/about/aboutOAV" },
      { label: t("menu.about.yangiliklar"), href: "/about/news" },
      { label: t("menu.about.vakansiyalar"), href: "/about/vakansiyalar" },
    ],
  };

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
            <h4>{t("footer.manzil")}</h4>
            <p>{t("footer.manjil1")}</p>
          </div>

          <div>
            <h4>{t("footer.telefon")}</h4>
            <p>+998 (99) 150-22-22</p>
            <p>+998 (99) 150-22-22</p>
          </div>

          <div>
            <h4>{t("footer.email")}</h4>
            <p>info@bsgroup.uz</p>
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
          <h4>{t("header.catalog")}</h4>
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

          <h4>{t("header.services")}</h4>
          <ul>
            {dropdownItems.xizmatlar.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>{t("header.about")}</h4>
          <ul>
            {dropdownItems.about.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h4>{t("header.sales")}</h4>
          <ul>
            {dropdownItems.sotuvlar.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>{t("header.gazabetonabout")}</h4>
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
        <p>{t("footer.title")}</p>
      </div>
    </footer>
  );
};

export default Footer;
