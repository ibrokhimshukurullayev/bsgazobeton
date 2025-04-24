import React from "react";
import Image from "next/image";

import services from "../../assets/images/services.png";
import Button from "../../components/button/Button";

const Services = () => {
  return (
    <div className="services">
      <Image src={services} alt="services" />
      <h2>Sizga qanday gazoblok kerak?</h2>
      <h2>Qanday o‘lcham, zichlik yoki miqdorni tanlashni bilmaysizmi?</h2>
      <p>
        Ushbu xizmat orqali siz “BS gazobeton” brendining avtoklavlangan
        gazobeton mahsulotlari, ularning texnik xususiyatlari va qo‘llash
        usullari haqida batafsil maslahat olishingiz mumkin. Biz sizga qurilish
        ehtiyojlaringizga mos keladigan optimal yechimlarni tanlashda yordam
        beramiz.
      </p>
      <h3>
        Agar sizda qo‘shimcha savollar bo‘lsa bizga qo’ng’iroq qiling yoki
        ofisimizga tashrif buyuring.
      </h3>
      <div className="services__end">
        <Button title={"Bepul konsultatsiya olish"} />
        <button className="services__button">Ofis manzillari</button>
      </div>
    </div>
  );
};

export default Services;
