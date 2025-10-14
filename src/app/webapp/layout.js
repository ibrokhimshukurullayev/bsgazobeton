"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import WebappFooter from "../../components/WebappFooter/WebappFooter";
import "./page.scss";

export default function WebappLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const prevPath = useRef(null); // oldingi sahifani saqlash

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

      // 🔹 Har safar yo‘l o‘zgarganda tugmalarni yangilash
      const updateButton = () => {
        if (pathname === "/webapp" || pathname === "/webapp/home") {
          // 🟢 Home sahifada pastki tugmalar yo‘q
          tg.BackButton.hide();
          tg.MainButton.hide();
        } else {
          // 🔙 Boshqa sahifalarda faqat Back tugmasi
          tg.MainButton.hide();
          tg.BackButton.show();
          tg.BackButton.offClick(); // eski click’ni olib tashlash
          tg.BackButton.onClick(() => {
            // Agar oldingi sahifa mavjud bo‘lsa, unga qaytadi
            if (prevPath.current && prevPath.current !== pathname) {
              router.push(prevPath.current);
            } else if (window.history.length > 1) {
              router.back();
            } else {
              // fallback — home sahifaga qaytish
              router.push("/webapp/home");
            }
          });
        }
      };

      updateButton();

      // 🔹 Telegram login
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
      // tozalash
      if (script && script.parentNode) script.parentNode.removeChild(script);
      const tg = window.Telegram?.WebApp;
      if (tg) {
        tg.BackButton.offClick();
        tg.MainButton.offClick();
      }
    };
  }, [pathname, router]);

  // 🔹 Oldingi yo‘lni saqlab boramiz
  useEffect(() => {
    prevPath.current = pathname;
  }, [pathname]);

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

  // 🔹 Footer faqat kerakli sahifalarda chiqadi
  const showFooter = !pathname.includes("calculate");

  return (
    <div className="webapp-layout">
      <div className="webapp-content">{children}</div>
      {showFooter && <WebappFooter />}
    </div>
  );
}
