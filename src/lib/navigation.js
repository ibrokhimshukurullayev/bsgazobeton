export function resolveLangKey(lng) {
  const value = String(lng || "").toLowerCase();
  if (value.startsWith("uz")) return "uz_uz";
  if (value.startsWith("ru")) return "ru_ru";
  if (value.startsWith("en")) return "en_us";
  return "uz_uz";
}

export function mapCategoryLinks(categories, language) {
  const list = categories?.data?.list ?? [];
  const langKey = resolveLangKey(language);

  const parents = list.filter((category) => !category.parentproductcategoryid);

  return [...parents]
    .sort((first, second) => {
      const firstPosition = first.position ?? first.order ?? 0;
      const secondPosition = second.position ?? second.order ?? 0;
      return firstPosition - secondPosition;
    })
    .map((category) => {
      const categoryId =
        category.productcategoryid ??
        category.id ??
        category.productCategoryId ??
        null;

      const translatedName = category?.translations?.name;
      const label =
        typeof translatedName === "string"
          ? translatedName
          : translatedName?.[langKey] ??
            Object.values(translatedName || {}).find(Boolean) ??
            category?.name ??
            "";

      return {
        label: String(label),
        href: categoryId ? `/catalog?productcategoryid=${categoryId}` : "/catalog",
      };
    });
}

export function buildNavigationGroups(t, catalogLinks) {
  return {
    katalog: catalogLinks,
    services: [
      { label: t("menu.services.consultation"), href: "/services" },
      {
        label: t("menu.services.installation"),
        href: "/services/gas-block-installation",
      },
      { label: t("menu.services.calculator"), href: "/services/calculator" },
    ],
    sales: [
      { label: t("menu.sales.orderDelivery"), href: "/sales" },
      { label: t("menu.sales.paymentMethods"), href: "/sales/payment-methods" },
      { label: t("menu.sales.addresses"), href: "/contact" },
    ],
    gazobeton: [
      { label: t("menu.gazobeton.overview"), href: "/about-gazobeton" },
      { label: t("menu.gazobeton.tests"), href: "/about-gazobeton/tests" },
      {
        label: t("menu.gazobeton.certificates"),
        href: "/about-gazobeton/certificates",
      },
      {
        label: t("menu.gazobeton.applications"),
        href: "/about-gazobeton/applications",
      },
      {
        label: t("menu.gazobeton.usageGuide"),
        href: "/about-gazobeton/usage-guide",
      },
      {
        label: t("menu.gazobeton.materialDifferences"),
        href: "/about-gazobeton/material-differences",
      },
      { label: t("menu.gazobeton.faq"), href: "/about-gazobeton/faq" },
    ],
    about: [
      { label: t("menu.about.company"), href: "/about" },
      { label: t("menu.about.quality"), href: "/about/quality-control" },
      { label: t("menu.about.clients"), href: "/about/clients-partners" },
      { label: t("menu.about.media"), href: "/about/media" },
      { label: t("menu.about.news"), href: "/about/news" },
      { label: t("menu.about.vacancies"), href: "/about/vacancies" },
    ],
  };
}

export function buildHeaderLinks(t) {
  return [
    { href: "/catalog", label: t("header.catalog"), key: "katalog" },
    { href: "/services", label: t("header.services"), key: "services" },
    { href: "/sales", label: t("header.sales"), key: "sales" },
    {
      href: "/about-gazobeton",
      label: t("header.gazobetonAbout"),
      key: "gazobeton",
    },
    { href: "/about", label: t("header.about"), key: "about" },
    { href: "/contact", label: t("header.contact") },
  ];
}
