import React from "react";
import "./sotuvlar.scss";
import Title from "../../components/title/Title";
import Button from "../../components/button/Button";

const Sotuvlar = () => {
  return (
    <div className="sotuv">
      <Title
        text={
          "Siz materialni tanlashingiz va uy qurish uchun kerakli miqdorni hisoblashingiz yoki mutaxassislarimiz yordamidan foydalanishingiz mumkin."
        }
      />
      <h3 className="sotuv__title">Buyurtma berish</h3>
      <p className="sotuv__text">
        Agar ofisimizga yetib borish siz uchun noqulay bo'lsa, kerakli tovarlar
        hajmi va kontaktlaringizni ko'rsatgan holda veb-saytdagi shakl orqali
        o'zingiz buyurtma berishingiz mumkin. Menejer albatta siz bilan
        bog'lanadi va elektron pochta orqali hisob-faktura beradi.
      </p>
      <p className="sotuv__text">
        Tovarlar uchun masofadan turib to'lashingiz mumkin, xizmatlar va bloklar
        sizga qurilish maydonchasida yetkaziladi. Shuningdek, kompaniyamiz
        menejeri bilan quyidagi manzil orqali bog'lanishingiz mumkin. elektron
        pochta – Batafsil ma'lumot yoki maslahat uchun sales@arton.uz.
      </p>
      <h3 className="sotuv__title">Yetkazib berish tartibi</h3>
      <p className="sotuv__text">
        Yetkazib berish butun shahar va viloyatlar bo‘yicha amalga oshiriladi.
        Minimal buyurtma miqdoriga qarab bepul yoki shartnoma asosida yetkazib
        berish xizmati ko‘rsatiladi. Yetkazish muddati — odatda 1–2 ish kuni.
      </p>
      <h3 className="sotuv__title">Maslahat va hisoblash</h3>
      <p className="sotuv__text">
        Mutaxassislarimizdan shaxsan maslahat olishingiz mumkin. Buning uchun
        siz bizning kompaniya ofisimizga kelishingiz kerak. Savdo bo'yicha
        mutaxassislarimiz buyurtmangizni hisoblash va joylashtirishda yordam
        beradi.
      </p>
      <h2>
        Agar sizda qo‘shimcha savollar bo‘lsa bizga qo’ng’iroq qiling yoki
        ofisimizga tashrif buyuring.
      </h2>
      <div className="sotuv__end">
        <Button title={"Biz bilan bog’lanish"} />
        <button className="sotuv__end__button">Ofis manzillari</button>
      </div>
    </div>
  );
};

export default Sotuvlar;
