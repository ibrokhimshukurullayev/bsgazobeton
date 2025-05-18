"use client";
import { usePathname } from "next/navigation";
import "./sotuvlar.scss";
import SotuvGazabetonHeaderLink from "./components/sotuvHeaderLink/sotuvGazabetonHeaderLink";
import SotuvGazabetonLink from "./components/sotuvGazabetonLink/sotuvGazabetonLink";
import { useTranslation } from "react-i18next";

export default function SotuvLayout({ children }) {
  const pathname = usePathname();
  const [t, i18n] = useTranslation("global");

  const titles = {
    "/sotuvlar": t("menu.sotuvlar.buyurtma"),
    "/sotuvlar/tolovUsullari": t("menu.sotuvlar.tolov"),
    "/joylashuv": t("menu.sotuvlar.manzillar"),
  };

  const title = titles[pathname] || "Sotuvlar";
  return (
    <div id="sotuvGazabeton">
      <SotuvGazabetonHeaderLink title={title} link={pathname} />
      <div className="sotuvGazabeton container">
        <div className="sotuvGazabeton__left">{children}</div>
        <div className="sotuvGazabeton__right">
          <SotuvGazabetonLink />
        </div>
      </div>
    </div>
  );
}
