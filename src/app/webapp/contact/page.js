"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import right from "../../../assets/images/webappImages/right.svg";
import phone from "../../../assets/images/webappImages/phones.svg";
import instagram from "../../../assets/images/webappImages/social/intagram.svg";
import telegram from "../../../assets/images/webappImages/social/telegram.svg";
import facebook from "../../../assets/images/webappImages/social/facebook.svg";
import youtube from "../../../assets/images/webappImages/social/youtube.svg";
import "./cantact.scss";

const Contact = () => {
  const { t } = useTranslation("global");

  return (
    <div className="container">
      <div className="cantacts">
        <h2 className="cantacts__title">{t("contact.title")}</h2>

        <a href="tel:+998991502222" className="cantact">
          <div className="phone-box">
            <Image src={phone} alt="phone" /> {t("contact.phone1")}
          </div>
          <Image src={right} alt="arrow" />
        </a>

        <a href="tel:+998712001022" className="cantact">
          <div className="phone-box">
            <Image src={phone} alt="phone" /> {t("contact.phone2")}
          </div>
          <Image src={right} alt="arrow" />
        </a>

        <p className="cantacts__text">
          <span>{t("contact.email_label")}</span> <br />
          info@sbsgroup.uz
        </p>

        <p className="cantacts__text">
          <span>{t("contact.office_label")}</span> <br />
          {t("contact.office_address")}
        </p>

        <div className="socials">
          <a href="https://www.instagram.com/bs_gazobeton/">
            <Image src={instagram} alt="instagram" />
          </a>
          <a href="https://t.me/bsgazobeton_uz">
            <Image src={telegram} alt="telegram" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61575359537252">
            <Image src={facebook} alt="facebook" />
          </a>
          <a href="https://www.youtube.com/@bsgazobeton">
            <Image src={youtube} alt="youtube" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
