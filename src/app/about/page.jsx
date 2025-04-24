import React from "react";
import Image from "next/image";
import "./about.scss";
import hero from "../../assets/images/hero.png";
import Carusel from "../../components/carusel/Carusel";
import Features from "../../components/features/Features";
import Button from "../../components/button/Button";
import Title from "../../components/title/Title";

const About = () => {
  return (
    <div>
      <Title
        title={"BS gazobeton"}
        text={
          " – O‘zbekiston bozorida yuqori sifatli gazobeton mahsulotlarini ishlab chiqaruvchi yetakchi kompaniyalardan biridir. Ishlab chiqarish zavodi Sirdaryo viloyatida joylashgan. Bizning maqsadimiz qurilish industriyasiga innovatsion, ekologik toza va mustahkam qurilish materiallarini taqdim etishdir."
        }
      />
      <Image className="abouts__img" width={927} src={hero} />
      <h3 className="abouts__title__text">Bizning tariximiz</h3>
      <p className="abouts__list">
        "BS gazobeton" kompaniyasi o‘z faoliyatini 2023-yil boshida boshlagan.
        Hozirga qadar qurilish materiallari sohasida yuqori sifat va innovatsiya
        tamoyillariga amal qilib kelmoqda. Qurilishdagi uzoq yillik tajriba esa
        ushbu industriyada muvaffaqiyatli bo'lishga yordam berdi. Biz o‘z
        mijozlarimizga zamonaviy texnologiyalar asosida ishlab chiqarilgan
        yuqori sifatli gazobeton mahsulotlarini taklif qilamiz.
      </p>
      <div className="abouts__card">
        <h3 className="abouts__card__title">Missiyamiz va qadriyatlarimiz</h3>
        <p className="abouts__card__text">
          Bizning asosiy maqsadimiz – O‘zbekiston va O'rta Osiyo davlatlari
          uchun yuqori sifatli, ekologik xavfsiz va energiya tejamkor qurilish
          materiallari bilan ta’minlash. Ishlab chiqarish jarayonimizda
          zamonaviy texnologiyalar va qat’iy sifat nazorati tizimiga tayangan
          holda, mijozlarimizga ishonchli va uzoq muddat xizmat qiluvchi
          mahsulotlarni yetkazib beramiz.
        </p>
      </div>
      <h3 className="abouts__title__text">Ishlab chiqarish haqida</h3>
      <p className="abouts__list">
        "BS gazobeton" zamonaviy ishlab chiqarish zavodiga ega bo‘lib, eng
        ilg‘or texnologiyalar va yuqori sifat standartlariga javob beruvchi
        uskunalar bilan jihozlangan. Ishlab chiqarish liniyasi Yevropaning
        "Aircrete" kompaniyasi tomonidan yo'lga qo'yilgan. Ishlab chiqarish
        quvvati yiliga 450 000 kubometrni tashkil qiladi. Ushbu texnologiyalarga
        hamohang ravishda ishlab chiqarishda eng sifatli xom ashyolardan
        foydalanamiz va mahsulotlarimizni xalqaro standartlarga mos ravishda
        tayyorlaymiz.
      </p>
      <Carusel />
      <Features />
      <div className="abouts__cantact">
        <h3>
          "BS gazobeton" kompaniyasi sifat, ishonchlilik va mijozlarga sodiqlik
          tamoyillariga tayangan holda, O‘zbekiston bozorida o‘z mavqeini
          mustahkamlab bormoqda. Biz sizning ishonchli hamkoringiz bo‘lishga
          tayyormiz!
        </h3>
        <Button title={"Biz bilan bog’lanish"} />
      </div>
    </div>
  );
};

export default About;
