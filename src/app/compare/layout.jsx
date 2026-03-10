"use client";
import { usePathname } from "next/navigation";
import "./compare.scss";
import { useTranslation } from "react-i18next";
import CompareHeaderLink from "./_components/compare-header-link/CompareHeaderLink";

export default function CompareLayout({ children }) {
  const [t, i18n] = useTranslation("global");

  return (
    <div id="taqqoslash">
      <CompareHeaderLink />
      <div className="taqqoslash container">{children}</div>
    </div>
  );
}
