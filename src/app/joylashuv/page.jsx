"use client";
import React from "react";
import "./sotuv.scss";
import Image from "next/image";
import { useTranslation } from "react-i18next";

import instagram from "../../assets/images/social/intagram.svg";
import facebook from "../../assets/images/social/facebook.svg";
import twiter from "../../assets/images/social/twiter.svg";
import youtube from "../../assets/images/social/youtube.svg";
import telegram from "../../assets/images/social/telegram.svg";
import linkedin from "../../assets/images/social/linkedin.svg";

const Joylashuv = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="cantact container">
      <div className="cantact__left">
        <div className="cantact__phone">
          <h3>{t("footer.telefon")}</h3>
          <a href="tel:+998991502222" target="_blank" rel="noopener noreferrer">
            +998 (99) 150-22-22
          </a>
          <a href="tel:+998712001022" target="_blank" rel="noopener noreferrer">
            +998 (71) 200-10-22
          </a>
          <p>{t("cantact.title1")}</p>
        </div>
        <div className="cantact__email">
          <h3>{t("footer.email")}</h3>
          <a
            href="http://info@bsgroup.uz"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@bsgroup.uz
          </a>
        </div>
        <div className="cantact__ofis">
          <h3>{t("footer.manzil")}</h3>
          <p>{t("footer.manjil1")}</p>
        </div>
        <div className="cantact__social">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={instagram} alt="instagram" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={facebook} alt="facebook" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={telegram} alt="telegram" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={youtube} alt="youtube" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={twiter} alt="twiter" />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <Image src={linkedin} alt="linkedin" />
          </a>
        </div>
      </div>
      <div className="cantact__right">
        <form action="">
          <h3>{t("cantact.formtitle1")}</h3>
          <input
            type="text"
            placeholder={t("cantact.input1")}
            name="firstname"
          />
          <input type="tel" placeholder={t("cantact.input2")} name="phone" />
          <textarea
            name="message"
            placeholder={t("cantact.input3")}
            id=""
          ></textarea>
          <button>{t("cantact.button")}</button>
          <p>{t("cantact.formtitle2")}</p>
        </form>
      </div>
    </div>
  );
};

export default Joylashuv;
