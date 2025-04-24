import React from "react";
import "./sotuv.scss";

import Image from "next/image";
import payme from "../../../assets/images/payme.png";
import click from "../../../assets/images/click.png";
import uzumbank from "../../../assets/images/uzumbank.png";
import uzumnasiya from "../../../assets/images/uzumnasiya.png";
import karta from "../../../assets/images/kartadan.png";
import bank from "../../../assets/images/bank.png";
import bolib from "../../../assets/images/bolib.png";
import naqd from "../../../assets/images/naqd.png";
import Title from "../../../components/title/Title";

const payments = [
  {
    title: "Bank o'tkazmasi orqali to'lov",
    description:
      "Agar kerak bo'lsa, jismoniy shaxslar xaridni bank orqali o'tkazma yo'li bilan to'lashlari mumkin.",
    icon: bank,
  },
  {
    title: "Naqd pulda to'lov",
    description:
      "Biz jismoniy va yuridik shaxslardan naqd pul to‘lovlarini savdo ofislarida qabul qilamiz.",
    icon: naqd,
  },
  {
    title: "Kartadan pul o'tkazish",
    description:
      "Agar kerak bo‘lsa, xaridingiz uchun PayMe / Click to‘lov tizimlari orqali to‘lashingiz mumkin.",
    icon: karta,
    logos: [payme, click, uzumbank],
  },
  {
    title: "Bo‘lib-bo‘lib to‘lash",
    description:
      "Agar kerak bo‘lsa, bo‘lib-bo‘lib to‘lashdan foydalanishingiz mumkin",
    icon: bolib,
    logos: [uzumnasiya],
  },
];

const TolovUsullari = () => {
  return (
    <div>
      <Title
        text={
          "Shartnoma tuzilgandan so'ng sizga to'lov uchun hisob-faktura beriladi, uni ikki usulda ham olish mumkin"
        }
      />
      <div className="payment">
        {payments.map((method, index) => (
          <div key={index} className="payment-method">
            <Image src={method.icon} alt="icon" width={48} height={48} />
            <div className="payment-details">
              <h3>{method.title}</h3>
              <p>{method.description}</p>
              {method.logos && (
                <div className="payment-logos">
                  {method.logos.map((logo, i) => (
                    <Image
                      key={i}
                      src={logo}
                      alt="logo"
                      width={110}
                      height={41}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TolovUsullari;
