"use client";

import { useEffect, useState } from "react";

export default function TelegramWebAppPage() {
  const [initData, setInitData] = useState("");
  const [requestBody, setRequestBody] = useState("");
  const [responseData, setResponseData] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://telegram.org/js/telegram-web-app.js";
    script.async = true;
    script.onload = async () => {
      try {
        const tg = window.Telegram?.WebApp;
        if (!tg) {
          setError("Telegram WebApp mavjud emas!");
          setLoading(false);
          return;
        }

        tg.expand();
        const data = tg.initData;

        if (!data) {
          setError(
            "initData topilmadi (Telegram ichidan ochilmagan bo'lishi mumkin)"
          );
          setLoading(false);
          return;
        }

        // initData ni ekranda ko‘rsatish uchun saqlaymiz
        setInitData(data);

        // Body tayyorlaymiz
        const body = JSON.stringify({ initData: data }, null, 2);
        setRequestBody(body);

        // Fetch yuboramiz
        const res = await fetch(
          "http://api.bsgazobeton.uz/api/identity/telegram/login",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body,
          }
        );

        const json = await res.json();
        setResponseData(JSON.stringify(json, null, 2));
      } catch (err) {
        console.error(err);
        setError(err.message || "Xatolik yuz berdi");
      } finally {
        setLoading(false);
      }
    };

    document.body.appendChild(script);

    return () => {
      if (script && script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <div style={{ padding: 20, fontFamily: "monospace" }}>
      <h2> Telegram WebApp Debug</h2>

      {loading && <p> Yuklanmoqda...</p>}

      {error && (
        <p style={{ color: "red", whiteSpace: "pre-wrap" }}> Xato: {error}</p>
      )}

      {initData && (
        <>
          <h3>
            Telegramdan olingan <code>initData</code>:
          </h3>
          <pre
            style={{
              background: "#f5f5f5",
              padding: "10px",
              borderRadius: "6px",
              wordBreak: "break-all",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
          >
            {initData}
          </pre>
        </>
      )}

      {requestBody && (
        <>
          <h3>Bekendga yuborilgan body:</h3>
          <pre
            style={{
              background: "#eef7ff",
              padding: "10px",
              borderRadius: "6px",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
          >
            {requestBody}
          </pre>
        </>
      )}

      {responseData && (
        <>
          <h3>Bekendan kelgan javob:</h3>
          <pre
            style={{
              background: "#e8ffe8",
              padding: "10px",
              borderRadius: "6px",
              whiteSpace: "pre-wrap",
              overflowX: "auto",
            }}
          >
            {responseData}
          </pre>
        </>
      )}
    </div>
  );
}
