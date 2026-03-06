import { Inter } from "next/font/google"; // ✅ FONT IMPORT
import "./globals.css";
import Providers from "./Providers";

// ✅ Google Fonts optimizatsiyasi
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "BS Gazobeton",
  description: "BS Gazobeton rasmiy veb-sayti",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uz" className={inter.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
