import React, { Suspense } from "react";
import Loading from "../../../components/loading/Loading";
import Products from "./ProductsClient";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container">
          <Loading />
        </div>
      }
    >
      <Products />
    </Suspense>
  );
}
