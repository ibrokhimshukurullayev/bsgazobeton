import React, { Suspense } from "react";
import KatalogClient from "./KatalogClient";

export default function Page() {
  return (
    <Suspense fallback={<div />}> 
      <KatalogClient />
    </Suspense>
  );
}
