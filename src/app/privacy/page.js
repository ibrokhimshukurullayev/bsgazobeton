"use client";
import "./privacy.scss";
import { useTranslation } from "react-i18next";

export default function PrivacyPage() {
  const [t] = useTranslation("global");

  return (
    <div className="privacy">
      <div className="privacy__container">
        <h1>{t("privacy.title")}</h1>
        <p className="updated">{t("privacy.updated")}: 2025-01-01</p>

        <section>
          <h2>{t("privacy.section1Title")}</h2>
          <p>{t("privacy.section1Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section2Title")}</h2>
          <p>{t("privacy.section2Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section3Title")}</h2>
          <p>{t("privacy.section3Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section4Title")}</h2>
          <p>{t("privacy.section4Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section5Title")}</h2>
          <p>{t("privacy.section5Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section6Title")}</h2>
          <p>{t("privacy.section6Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section7Title")}</h2>
          <p>{t("privacy.section7Text")}</p>
        </section>

        <section>
          <h2>{t("privacy.section8Title")}</h2>
          <p>{t("privacy.section8Text")}</p>
        </section>
      </div>
    </div>
  );
}
