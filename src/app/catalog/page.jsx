import React, { Suspense } from "react";
import CatalogClient from "./CatalogClient";

export const metadata = {
  title: "Katalog | BS Gazobeton",
  description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
};

export default function Page() {
  return (
    <Suspense fallback={<div />}>
      <CatalogClient />
    </Suspense>
  );
}
