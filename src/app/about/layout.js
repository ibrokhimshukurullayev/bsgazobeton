"use client";
import { usePathname } from "next/navigation";
import AboutLink from "../../components/aboutLink/AboutLink";
import Aboutlink from "../../components/aboutlinks/Aboutlink";
import "./about.scss";

const titles = {
  "/about": "Kompaniya haqida",
  "/about/aboutSifat": "Sifat nazorati va laboratoriya",
  "/about/aboutMijoz": "Mijozlar va hamkorlar",
  "/about/aboutOAV": "Biz haqimizda OAV",
};

export default function AboutLayout({ children }) {
  const pathname = usePathname();

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
