import React from "react";
import "./sotuv.scss";
import Image from "next/image";
import instagram from "../../../assets/images/social/intagram.png";
import facebook from "../../../assets/images/social/facebook.png";
import twiter from "../../../assets/images/social/twiter.png";
import youtube from "../../../assets/images/social/youtube.png";
import telegram from "../../../assets/images/social/telegram.png";
import linkedin from "../../../assets/images/social/linkedin.png";

const Joylashuv = () => {
  return (
    <div className="cantact">
      <div className="cantact__left">
        <div className="cantact__phone">
          <h3>Telefon:</h3>
          <a href="tel:+998991502222" target="_blank" rel="noopener noreferrer">
            +998 (99) 150-22-22
          </a>
          <a href="tel:+998712001022" target="_blank" rel="noopener noreferrer">
            +998 (71) 200-10-22
          </a>
          <p>HOZIROQ QO’NG’IROQ QILING!</p>
        </div>
        <div className="cantact__email">
          <h3>Email:</h3>
          <a
            href="http://info@bsgroup.uz"
            target="_blank"
            rel="noopener noreferrer"
          >
            info@bsgroup.uz
          </a>
        </div>
        <div className="cantact__ofis">
          <h3>Bosh ofis:</h3>
          <p>
            Sirdaryo viloyati, Sirdaryo tumani, Sobir Rahimov SIU, Chibantay
            qo'rg'oni
          </p>
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
          <h3>Xabar qoldirish</h3>
          <input type="text" placeholder="Ismingiz*" name="firstname" />
          <input type="tel" placeholder="Telefon raqamingiz*" name="phone" />
          <textarea
            name="message"
            placeholder="Xabar matni..."
            id=""
          ></textarea>
          <button>Yuborish</button>
          <p>
            Yuborish tugmachasini bosish orqali siz maxfiylik siyosatiga rozilik
            bildirasiz.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Joylashuv;
