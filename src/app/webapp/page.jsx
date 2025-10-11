"use client";

import { useEffect, useState } from "react";

export default function TelegramWebAppPage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Telegram skriptini yuklash
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      const tg = window.Telegram.WebApp;
      tg.expand();

      // Telegramdan foydalanuvchi ma'lumotlarini olish
      const initData = tg.initData;
      const initDataUnsafe = tg.initDataUnsafe;

      console.log("Telegram foydalanuvchi:", initDataUnsafe);

      if (!initData) {
        console.error("initData bo'sh, Telegram WebApp ichidan ochilmagan!");
        return;
      }

      fetch("http://api.bsgazobeton.uz/api/identity/telegram/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ initData }),
      })
        .then((r) => r.json())
        .then((res) => {
          console.log("Login javobi:", res);
          setUser(res?.data || res);
        })
        .catch((err) => console.error("Auth xatosi:", err));
    };

    document.body.appendChild(script);
  }, []);

  if (!user)
    return (
      <div style={{ padding: 20 }}>
        Telegramdan foydalanuvchi yuklanmoqda...
      </div>
    );

  return (
    <div style={{ padding: 20 }}>
      <h1>Salom, {user.first_name || user.name} 👋</h1>
      <p>ID: {user.id}</p>
      {user.username && <p>@{user.username}</p>}
    </div>
  );
}
