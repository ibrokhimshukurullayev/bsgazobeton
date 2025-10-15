"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import left from "../../../assets/images/webappImages/left.svg";
import right from "../../../assets/images/webappImages/right.svg";
import phone from "../../../assets/images/webappImages/phones.svg";
import instagram from "../../../assets/images/webappImages/social/intagram.svg";
import telegram from "../../../assets/images/webappImages/social/telegram.svg";
import facebook from "../../../assets/images/webappImages/social/facebook.svg";
import youtube from "../../../assets/images/webappImages/social/youtube.svg";
import twitter from "../../../assets/images/webappImages/social/twiter.svg";
import linkedin from "../../../assets/images/webappImages/social/linkedin.svg";
import "./cantact.scss";

const Contact = () => {
  return (
    <div className="container">
      <div className="cantacts">
        <h2 className="cantacts__title">Biz bilan bog‘lanish</h2>

        <a href="tel:+998991502222" className="cantact">
          <div className="phone-box">
            <Image src={phone} alt="phone" /> +998 (99) 150–22–22
          </div>
          <Image src={right} alt="arrow" />
        </a>

        <a href="tel:+998712001022" className="cantact">
          <div className="phone-box">
            <Image src={phone} alt="phone" /> +998 (71) 200–10–22
          </div>
          <Image src={right} alt="arrow" />
        </a>

        <p className="cantacts__text">
          <span>Email:</span> <br />
          info@sbsgroup.uz
        </p>

        <p className="cantacts__text">
          <span>Bosh ofis:</span> <br />
          Sirdaryo viloyati, Sirdaryo tumani, Sobir Rahimov SIU, Chibantay
          qo‘rg‘oni
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
          {/* <a href="#">
            <Image src={twitter} alt="twitter" />
          </a>
          <a href="#">
            <Image src={linkedin} alt="linkedin" />
          </a> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
