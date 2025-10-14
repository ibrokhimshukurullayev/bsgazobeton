"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WebappFooter from "../../components/WebappFooter/WebappFooter";
import "./page.scss";

export default function WebappLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = async () => {
      const tg = window.Telegram?.WebApp;
      if (!tg) {
        console.warn("Telegram WebApp topilmadi");
        setLoading(false);
        return;
      }

      tg.ready();
      tg.expand();

      const updateButton = () => {
        if (pathname === "/webapp" || pathname === "/webapp/home") {
          // 🟢 Home sahifada pastki tugmalar ko‘rinmasin
          tg.BackButton.hide();
          tg.MainButton.hide();
        } else {
          // 🔙 Boshqa sahifalarda faqat Back chiqsin
          tg.MainButton.hide();
          tg.BackButton.show();
          tg.BackButton.onClick(() => {
            // Faqat oldingi sahifaga qaytadi, bo‘lmasa home’ga
            if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/webapp/home");
            }
          });
        }
      };

      updateButton();

      const observer = new MutationObserver(updateButton);
      observer.observe(document.body, { childList: true, subtree: true });

      // 🔐 Telegram orqali login
      const initData = tg.initData;
      if (initData) {
        const res = await fetch(
          "https://api.bsgazobeton.uz/api/identity/telegram/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData }),
          }
        );
        const json = await res.json();
        const token = json?.data?.token || json?.token;
        if (token) localStorage.setItem("token", token);
      }

      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.BackButton.offClick();
        tg.MainButton.offClick();
      }
    };
  }, [pathname, router]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "18px",
        }}
      >
        Yuklanmoqda...
      </div>
    );
  }

  // Footer faqat kerakli sahifalarda chiqadi
  const showFooter = !pathname.includes("calculate");

  return (
    <div className="webapp-layout">
      <div className="webapp-content">{children}</div>
      {showFooter && <WebappFooter />}
    </div>
  );
}
