"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WebappFooter from "../../components/WebappFooter/WebappFooter";
import "./page.scss";
import Loading from "../../components/loading/Loading";

export default function WebappLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const prevPath = useRef(null);

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
      try {
        if (tg.requestFullscreen) tg.requestFullscreen();
      } catch {}

      const updateButton = () => {
        if (pathname === "/webapp" || pathname === "/webapp/home") {
          tg.BackButton.hide();
          tg.MainButton.hide();
        } else {
          tg.MainButton.hide();
          tg.BackButton.show();
          tg.BackButton.offClick();
          tg.BackButton.onClick(() => {
            if (prevPath.current && prevPath.current !== pathname) {
              router.push(prevPath.current);
            } else if (window.history.length > 1) {
              router.back();
            } else {
              router.push("/webapp/home");
            }
          });
        }
      };

      updateButton();

      const initData = tg.initData;
      if (initData) {
        try {
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
        } catch (err) {
          console.error("Login xatosi:", err);
        }
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

  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

  // 🔹 Footer faqat shu sahifalarda chiqadi:
  const mainPages = [
    "/webapp/home",
    "/webapp/cart",
    "/webapp/orders",
    "/webapp/profile",
  ];

  const showFooter = mainPages.includes(pathname);

  return (
    <div className="webapp-layout">
      <div className="webapp-content">
        <div className="top-mask" />
        <main className="webapp-main">
          {children}
          {loading && (
            <div className="loading-overlay">
              <Loading />
            </div>
          )}
        </main>
      </div>

      {/* Faqat asosiy sahifalarda footer chiqadi */}
      {showFooter && <WebappFooter />}
    </div>
  );
}
