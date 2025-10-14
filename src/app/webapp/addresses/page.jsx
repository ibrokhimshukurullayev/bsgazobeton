"use client";

import Image from "next/image";
import React from "react";
import "./addresses.scss";
import location from "../../../assets/images/webappImages/location.svg";
import right from "../../../assets/images/webappImages/right.svg";

const Addresses = () => {
  return (
    <div className="container location">
      <div className="location__title">Manzillar</div>

      <div className="location__card">
        <div className="location__card-content">
          <div className="location__icon">
            <Image src={location} alt="location" width={24} height={24} />
          </div>
          <div className="location__text">
            <h3 className="location__list">1. Bosh ofis</h3>
            <p className="location__list2">
              Toshkent, Yakkasaroy tumani, Cho'ponota ko'chasi, 17
            </p>
          </div>
        </div>
        <div className="location__right">
          <Image src={right} alt="right" width={16} height={16} />
        </div>
      </div>

      {/* 2-karta */}
      <div className="location__card">
        <div className="location__card-content">
          <div className="location__icon">
            <Image src={location} alt="location" width={24} height={24} />
          </div>
          <div className="location__text">
            <h3 className="location__list">2. Filial</h3>
            <p className="location__list2">
              Toshkent, Chilonzor tumani, Bunyodkor ko‘chasi, 56
            </p>
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
