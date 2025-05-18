import { useState } from "react";
import Image from "next/image";
import global from "../../assets/images/global.svg";
import { useTranslation } from "react-i18next";
import "./select.scss";

import uzFlag from "../../assets/images/uzb.svg";
import enFlag from "../../assets/images/uk.svg";
import ruFlag from "../../assets/images/russia.svg";

const languages = [
  { code: "uz", label: "O‘Z", flag: uzFlag },
  { code: "en", label: "EN", flag: enFlag },
  { code: "ru", label: "RU", flag: ruFlag },
];

export default function LangDropdown() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const handleChangeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLang(lang);
    setOpen(false);
  };

  return (
    <div className="lang-select">
      <button onClick={() => setOpen(!open)} className="lang-button">
        <Image src={global} alt="globe" className="lang-icon" />
        <span className="lang-label">
          {languages.find((l) => l.code === selectedLang)?.label}
        </span>
      </button>

      {open && (
        <ul className="lang-dropdown">
          {languages.map((lang) => (
            <li
              key={lang.code}
              onClick={() => handleChangeLanguage(lang.code)}
              className="lang-item"
            >
              <Image src={lang.flag} alt={lang.label} width={20} height={14} />
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
