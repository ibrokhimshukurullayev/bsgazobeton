"use client";

import { useMemo } from "react";
import { useGetCategoryQuery } from "../context/categoryApi";
import { mapCategoryLinks } from "../lib/navigation";

export default function useCatalogLinks(language) {
  const query = useGetCategoryQuery({ skip: 0, take: 1000 });

  const links = useMemo(
    () => mapCategoryLinks(query.data, language),
    [query.data, language]
  );

  return {
    ...query,
    links,
  };
}
