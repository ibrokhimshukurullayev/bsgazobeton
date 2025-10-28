import React, { Suspense } from "react";
import KatalogClient from "./KatalogClient";

export const metadata = {
  title: "Katalog | BS Gazobeton",
  description: "O‘zbekistonning eng sifatli gazobeton mahsulotlari.",
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <KatalogClient />
    </Suspense>
  );
}
