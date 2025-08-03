"use client";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Provider } from "react-redux";
import { store } from "../context/store";
import { useEffect, useState } from "react";
import Loading from "../components/loading/Loading";

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // sahifa yuklangandan keyin loadingni yo‘qotish
    const timer = setTimeout(() => setIsLoading(false), 2000); // 1s loading
    return () => clearTimeout(timer);
  }, []);
  return (
    <html lang="en">
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
