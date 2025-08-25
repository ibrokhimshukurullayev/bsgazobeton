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
import "./globals.css";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let mounted = true;
    setIsLoading(true);

    const id = setTimeout(() => mounted && setIsLoading(false), 350);

    return () => {
      mounted = false;
      clearTimeout(id);
    };
  }, [pathname]);

  return (
    <html lang="uz_Uz">
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Header />
            {isLoading ? <Loading /> : children}
            <Footer />
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
