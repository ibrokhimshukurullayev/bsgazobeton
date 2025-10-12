"use client";
import React from "react";
import { usePathname } from "next/navigation";
import WebappFooter from "../../components/WebappFooter/WebappFooter";
import "./page.scss";

export default function WebappLayout({ children }) {
  const pathname = usePathname();

  const showFooter = !pathname.includes("calculate");

  return (
    <div className="webapp-layout">
      <div className="webapp-content">{children}</div>

      {showFooter && <WebappFooter />}
    </div>
  );
}
