"use client";

import Image from "next/image";
import React from "react";
import "./addresses.scss";
import location from "../../../assets/images/webappImages/location.svg";
import right from "../../../assets/images/webappImages/right.svg";
import { useTranslation } from "react-i18next";

const Addresses = () => {
  const { t } = useTranslation("global");

  return (
    <div className="container location">
      <div className="location__title">{t("addresses.title")}</div>

      <div className="location__card">
        <div className="location__card-content">
          <div className="location__icon">
            <Image src={location} alt="location" width={24} height={24} />
          </div>
          <div className="location__text">
            <h3 className="location__list">{t("addresses.office1_title")}</h3>
            <p className="location__list2">{t("addresses.office1_address")}</p>
          </div>
        </div>
        <div className="location__right">
          <Image src={right} alt="right" width={16} height={16} />
        </div>
      </div>

      <div className="location__card">
        <div className="location__card-content">
          <div className="location__icon">
            <Image src={location} alt="location" width={24} height={24} />
          </div>
          <div className="location__text">
            <h3 className="location__list">{t("addresses.office2_title")}</h3>
            <p className="location__list2">{t("addresses.office2_address")}</p>
          </div>
        </div>
        <div className="location__right">
          <Image src={right} alt="right" width={16} height={16} />
        </div>
      </div>
    </div>
  );
};

export default Addresses;
