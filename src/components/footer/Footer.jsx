import React from "react";
import logo from "../../assets/images/logo.svg";
import Image from "next/image";
import "./footer.scss";
import instagram from "../../assets/images/social/intagram.svg";
import facebook from "../../assets/images/social/facebook.svg";
import yootube from "../../assets/images/social/youtube.svg";
import twiter from "../../assets/images/social/twiter.svg";
import linkedin from "../../assets/images/social/linkedin.svg";
import telegram from "../../assets/images/social/telegram.svg";
import Link from "next/link";

import dropdownItems from "../../static/index";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__column">
          <div className="footer__logo">
            <Link href="/">
              <Image src={logo} alt="logo" />
            </Link>
          </div>

          <div>
            <h4>Manzil:</h4>
            <p>
              Sirdaryo viloyati, Sirdaryo tumani, Sobir Rahimov SIU, Chibantay
              qo'rg'oni
            </p>
          </div>

          <div>
            <h4>Telefon:</h4>
            <p>+998 (99) 150-22-22</p>
            <p>+998 (99) 150-22-22</p>
          </div>

          <div>
            <h4>Email:</h4>
            <p>info@bsgazobeton.uz</p>
            <p>tuymuratov.sardor@bsgroup.uz</p>
          </div>

          <div className="footer__socials">
            <a href="#">
              <Image src={instagram} alt="instagram" />
            </a>
            <a href="#">
              <Image src={facebook} alt="facebook" />
            </a>
            <a href="#">
              <Image src={telegram} alt="telegram" />
            </a>
            <a href="#">
              <Image src={yootube} alt="youtube" />
            </a>
            <a href="#">
              <Image src={twiter} alt="twitter" />
            </a>
            <a href="#">
              <Image src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <h4>Katalog</h4>
          <ul>
            {dropdownItems.katalog.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h4>Xizmatlar</h4>
          <ul>
            {dropdownItems.xizmatlar.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>Biz haqimizda</h4>
          <ul>
            {dropdownItems.about.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>

          <h4>Sotuvlar</h4>
          <ul>
            {dropdownItems.sotuvlar.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__column">
          <h4>Gazobeton haqida</h4>
          <ul>
            {dropdownItems.gazobeton.map((item, i) => (
              <li key={i}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <p>
          © 2023–2025 «BS gazobeton» — Qurilish materiallari va aksessuarlar
          ishlab chiqaruvchi
        </p>
      </div>
    </footer>
  );
};

export default Footer;
