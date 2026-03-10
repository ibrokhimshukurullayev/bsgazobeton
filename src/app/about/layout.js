"use client";
import { usePathname } from "next/navigation";
import AboutLink from "../../components/aboutLink/AboutLink";
import Aboutlink from "../../components/aboutlinks/Aboutlink";
import { useTranslation } from "react-i18next";
import "./about.scss";

export default function AboutLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");
  const titles = {
    "/about": t("menu.about.kompaniya"),
    "/about/quality-control": t("menu.about.sifat"),
    "/about/clients-partners": t("menu.about.mijoz"),
    "/about/media": t("menu.about.oav"),
    "/about/news": t("menu.about.yangiliklar"),
    "/about/vacancies": t("menu.about.vakansiyalar"),
  };

  const title = titles[pathname] || "Kompaniya haqida";

  return (
    <div id="abouts">
      <Aboutlink title={title} link={pathname} />
      <div className="abouts container">
        <div className="abouts__left">{children}</div>
        <div className="abouts__right">
          <AboutLink />
        </div>
      </div>
    </div>
  );
}
