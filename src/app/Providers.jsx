"use client";

import { usePathname } from "next/navigation";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Provider } from "react-redux";
import { store } from "../context/store";

export default function Providers({ children }) {
  const pathname = usePathname();
  const isWebApp = pathname?.startsWith("/webapp");

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        {!isWebApp && <Header />}
        <main style={{ position: "relative" }}>
          {children}
        </main>
        {!isWebApp && <Footer />}
      </I18nextProvider>
    </Provider>
  );
}
