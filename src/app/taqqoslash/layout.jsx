"use client";
import { usePathname } from "next/navigation";
import "./taqqoslash.scss";
import { useTranslation } from "react-i18next";
import TaqoslashHeaderLink from "./components/taqqoslashHeaderLink/taqoslashHeaderLink";

export default function TaqqoslashLayout({ children }) {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="taqqoslash">
      <TaqoslashHeaderLink />
      <div className="taqqoslash container">{children}</div>
    </div>
  );
}
