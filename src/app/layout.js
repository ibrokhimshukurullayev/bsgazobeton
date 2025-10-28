"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Provider } from "react-redux";
import { store } from "../context/store";
import Loading from "../components/loading/Loading";
import { Inter } from "next/font/google"; // ✅ FONT IMPORT
import "./globals.css";

// ✅ Google Fonts optimizatsiyasi
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();
  const isWebApp = pathname?.startsWith("/webapp");

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const id = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, 350);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [pathname]);

  return (
    <html lang="uz" className={inter.className}>
      {" "}
      {/* ✅ font shu yerda ishlaydi */}
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            {!isWebApp && <Header />}
            <main style={{ position: "relative" }}>
              {isLoading && <Loading />}
              {children}
            </main>
            {!isWebApp && <Footer />}
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
