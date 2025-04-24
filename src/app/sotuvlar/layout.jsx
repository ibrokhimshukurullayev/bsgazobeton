"use client";
import { usePathname } from "next/navigation";
import "./sotuvlar.scss";
import SotuvGazabetonHeaderLink from "./components/sotuvHeaderLink/sotuvGazabetonHeaderLink";
import SotuvGazabetonLink from "./components/sotuvGazabetonLink/sotuvGazabetonLink";

const titles = {
  "/sotuvlar": "Buyurtma berish va yetkazib berish tartibi",
  "/sotuvlar/to'lovUsullari": "To’lov usullari",
  "/sotuvlar/joylashuv": "Biz bilan bog’lanish",
};

export default function SotuvLayout({ children }) {
  const pathname = usePathname();

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
