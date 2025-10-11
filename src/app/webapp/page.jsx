"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Home from "./home/page"; // Home komponenting shu yerdan import qilinadi

export default function TelegramWebAppLogin() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;

    script.onload = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        if (!tg) {
          console.warn(
            "Telegram WebApp topilmadi, odatiy holatda ishga tushadi"
          );
          setLoading(false);
          return;
        }

        tg.expand();
        const initData = tg.initData;

        if (!initData) {
          console.warn(
            "initData topilmadi — Telegram ichida ochilmagan bo'lishi mumkin"
          );
          setLoading(false);
          return;
        }

        // Telegram initData orqali login qilish
        const res = await fetch(
          "https://api.bsgazobeton.uz/api/identity/telegram/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ initData }),
          }
        );

        const json = await res.json();

        if (json?.data?.token || json?.token) {
          const token = json.data?.token || json.token;
          localStorage.setItem("token", token);
          console.log("Telegram token saqlandi ✅");
        } else {
          console.warn("Token topilmadi ❌", json);
        }
      } catch (err) {
        console.error("Xato:", err);
      } finally {
        setLoading(false);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, [router]);

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

  // ✅ Telegram orqali login tugagach, Home sahifani render qilamiz
  return <Home />;
}
