"use client";

import { useEffect, useState } from "react";

export default function TelegramWebAppPage() {
  const [initData, setInitData] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Telegram WebApp scriptini yuklaymiz
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = () => {
      try {
        const tg = window.Telegram?.WebApp;
        if (!tg) {
          setError("Telegram WebApp mavjud emas!");
          return;
        }

        tg.expand(); // Ekranni to‘liq ochish
        const data = tg.initData;

        if (!data) {
          setError(
            "initData topilmadi (Telegram ichidan ochilmagan bo‘lishi mumkin)"
          );
        } else {
          console.log("initData:", data);
          setInitData(data);
        }
      } catch (err) {
        console.error(err);
        setError("Xatolik yuz berdi!");
      }
    };
    document.body.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Telegram initData testi</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {initData ? (
        <>
          <p>
            <b>initData:</b>
          </p>
          <pre
            style={{
              background: "#f3f3f3",
              padding: "10px",
              borderRadius: "6px",
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
            }}
          >
            {initData}
          </pre>
        </>
      ) : (
        !error && <p>Yuklanmoqda... Telegram WebApp kutilyapti...</p>
      )}
    </div>
  );
}
