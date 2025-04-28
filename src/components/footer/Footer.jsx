import React from "react";
import logo from "../../assets/images/logo.png";
import Image from "next/image";
import "./footer.scss";
import { Instagram, Facebook, Youtube, Linkedin } from "lucide-react";
import instagram from "../../assets/images/social/intagram.png";
import facebook from "../../assets/images/social/facebook.png";
import yootube from "../../assets/images/social/youtube.png";
import twiter from "../../assets/images/social/twiter.png";
import linkedin from "../../assets/images/social/linkedin.png";
import telegram from "../../assets/images/social/telegram.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__top container">
        <div className="footer__column">
          <div className="footer__logo">
            <Image src={logo} alt="logo" />
          </div>
          <div>
            <h4>Manzil:</h4>
            <p>Toshkent, Yakkasaroy tumani, Cho‘ponota ko‘chasi, 17</p>
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
              <Image src={yootube} alt="yootube" />
            </a>
            <a href="#">
              <Image src={twiter} alt="twiter" />
            </a>
            <a href="#">
              <Image src={linkedin} alt="linkedin" />
            </a>
          </div>
        </div>

        <div className="footer__column">
          <h4>Katalog</h4>
          <ul>
            <li>Gazobloklar</li>
            <li>Gazobeton divanellari</li>
            <li>Gazoblok kley</li>
            <li>Gazoblokka tegishli instrumentlar va materiallar</li>
          </ul>

          <h4>Xizmatlar</h4>
          <ul>
            <li>Mahsulot bo‘yicha konsultatsiya</li>
            <li>Gazoblok montaji</li>
            <li>Gazobloklar miqdorini va narxini hisoblash</li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Biz haqimizda</h4>
          <ul>
            <li>Komdivaniya haqida</li>
            <li>Sifat nazorati va laboratoriya</li>
            <li>Mijozlar va hamkorlar</li>
            <li>Biz haqimizda OAV</li>
            <li>Yangiliklar</li>
            <li>Vakansiyalar</li>
          </ul>
          <h4>Sotuvlar</h4>
          <ul>
            <li>Buyurtma berish va yetkazib berish tartibi</li>
            <li>To‘lov usullari</li>
            <li>Manzillar</li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Gazobeton haqida</h4>
          <ul>
            <li>Gazobeton haqida batafsil</li>
            <li>Sinov testlari</li>
            <li>Sertifikat va litsenziyalar</li>
            <li>Gazobetonning qo‘llanilish joylari</li>
            <li>Gazoblok ishlatish bo‘yicha qo‘llanma</li>
            <li>Gazobetoning boshqa materiallardan farqi</li>
            <li>Tez-tez beriladigan savollar</li>
          </ul>
        </div>
        <div className="footer__bottom">
          <p>
            © 2023–2025 «BS gazobeton» — Qurilish materiallari va aksessuarlar
            ishlab chiqaruvchi
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
