"use client";
import { usePathname } from "next/navigation";
import "./sales.scss";
import SalesGazobetonHeaderLink from "./_components/sales-header-link/SalesGazobetonHeaderLink";
import SalesGazobetonLink from "./_components/sales-gazobeton-link/SalesGazobetonLink";
import { useTranslation } from "react-i18next";

export default function SalesLayout({ children }) {
  const pathname = usePathname();
  const [t] = useTranslation("global");

  const titles = {
    "/sales": t("menu.sales.orderDelivery"),
    "/sales/payment-methods": t("menu.sales.paymentMethods"),
    "/contact": t("menu.sales.addresses"),
  };

  const title = titles[pathname] || "Sotuvlar";
  return (
    <div id="salesGazobeton">
      <SalesGazobetonHeaderLink title={title} link={pathname} />
      <div className="salesGazobeton container">
        <div className="salesGazobeton__left">{children}</div>
        <div className="salesGazobeton__right">
          <SalesGazobetonLink />
        </div>
      </div>
    </div>
  );
}
