"use client";

import "./globals.css";
import { I18nextProvider } from "react-i18next";
import i18n from "../lib/i18n";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import { Provider } from "react-redux";
import { store } from "../context/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <Header />
            {children}
            <Footer />
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}
