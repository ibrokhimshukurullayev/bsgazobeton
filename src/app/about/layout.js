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
    "/about": t("menu.about.company"),
    "/about/quality-control": t("menu.about.quality"),
    "/about/clients-partners": t("menu.about.clients"),
    "/about/media": t("menu.about.media"),
    "/about/news": t("menu.about.news"),
    "/about/vacancies": t("menu.about.vacancies"),
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
