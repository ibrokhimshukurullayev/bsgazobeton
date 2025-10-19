"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "./language.scss";
import { useTranslation } from "react-i18next";

import uzbflag from "../../../assets/images/webappImages/uzbflag.svg";
import englishflag from "../../../assets/images/webappImages/englishflag.svg";
import russionflag from "../../../assets/images/webappImages/russionflag.svg";
import arrowright from "../../../assets/images/webappImages/arrowright.svg";

const languages = [
  { code: "uz_Uz", name: "Uzbek", flag: uzbflag },
  { code: "ru_Ru", name: "Russian", flag: russionflag },
  { code: "en_Us", name: "English", flag: englishflag },
];

const Language = () => {
  const { i18n, t } = useTranslation("global");
  const [selectedLang, setSelectedLang] = useState("");

  // localStorage'dan tilni o‘qish
  useEffect(() => {
    const storedLang = localStorage.getItem("language") || "uz_Uz";
    i18n.changeLanguage(storedLang);
    setSelectedLang(storedLang);
  }, [i18n]);

  const handleSelectLang = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
    window.dispatchEvent(new CustomEvent("languageChanged", { detail: lang }));
    setSelectedLang(lang);
  };

  return (
    <div className="language-content container">
      <h1 className="language__title">{t("profiless.change_language")}</h1>

      <div className="language-list">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={`language-item ${
              selectedLang === lang.code ? "selected" : ""
            }`}
            onClick={() => handleSelectLang(lang.code)}
          >
            <div className="language-flag">
              <Image src={lang.flag} alt={lang.name} width={32} height={20} />
            </div>

            <span className="language-name">{lang.name}</span>

            <div className="language-checkbox">
              <div className="checkbox-circle">
                {selectedLang === lang.code && (
                  <div className="checkbox-check">
                    <Image
                      src={arrowright}
                      alt="arrow"
                      width={16}
                      height={16}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Language;
