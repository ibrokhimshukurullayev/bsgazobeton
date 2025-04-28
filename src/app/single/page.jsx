import React from "react";
import "./single.scss";

import ProductDetail from "./components/productDetail/ProductDetail";
import gazablok from "../../assets/images/Containergaza.png";
import KatalogGazabetonHeaderLink from "../katalog/components/katalogHeaderLink/katalogGazabetonHeaderLink";

const dummyProduct = {
  name: "D300, 600×50×300",
  images: [gazablok, gazablok, gazablok],
  price: "600 000",
  specs: {
    "Zichligi, marka": "D300",
    "O‘lchami, mm": "600×50×300",
    "Og‘irligi, kg": "22",
    "1 m² da gazobloklar soni": "13.89",
    "1 m³ uchun gazobloklar soni": "30",
    "1 ta paddonda hajmi, m³": "1",
    "1 ta paddonda gazobloklar soni": "30",
    Mustahkamlik: "30",
    "Issiqlik o‘tkazuvchanlik": "30",
    "Sovuqqa chidamliligi": "30",
  },
  description:
    "Gazobloklar (avtoklavlangan gazobeton bloklari) zamonaviy qurilish sanoatida eng ko‘p talab qilinadigan materiallardan biri hisoblanadi. Ular quyidagi afzalliklarga ega:",
  features: [
    "Yuqori issiqlik izolyatsiyasi – energiya sarfini kamaytiradi va bino ichidagi haroratni barqaror saqlaydi.",
    "Yengilligi – an'anaviy g‘isht va boshqa qurilish materiallariga qaraganda ancha yengil, bu esa yuk tashish va qurilish jarayonini yengillashtiradi.",
    "Ekologik tozaligi – tabiiy xom ashyolardan ishlab chiqarilgan bo‘lib, inson salomatligiga zarar yetkazmaydi.",
    "Yuqori mustahkamlik – yuk ko‘tarish qobiliyati yuqori.",
    "Olovga chidamliligi – yong‘inga bardoshli va xavfsizlik talablariga javob beradi.",
  ],
};

const Single = () => {
  return (
    <div>
      <KatalogGazabetonHeaderLink />
      <ProductDetail product={dummyProduct} />
    </div>
  );
};

export default Single;
