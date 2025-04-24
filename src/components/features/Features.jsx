import React from "react";
import Image from "next/image";
import "./features.scss";
import icon1 from "../../assets/images/featuresicon/icon1.png";
import icon2 from "../../assets/images/featuresicon/icon2.png";
import icon3 from "../../assets/images/featuresicon/icon3.png";
import icon4 from "../../assets/images/featuresicon/icon4.png";
import icon5 from "../../assets/images/featuresicon/icon5.png";

const features = [
  {
    icon: icon1,
    title: "Yuqori sifat",
    description: "Mahsulotlarimiz standartlarga javob beradi",
  },
  {
    icon: icon2,
    title: "Ekologik tozaligi",
    description:
      "Gazobeton ekologik xavfsiz va inson salomatligiga zarar yetkazmaydi",
  },
  {
    icon: icon3,
    title: "Energiya tejamkorligi",
    description:
      "Bizning mahsulotlarimiz issiqlikni uzoq muddat ushlab turish xususiyatiga ega",
  },
  {
    icon: icon4,
    title: "Innovatsion yondashuv",
    description: "Ishlab chiqarishda zamonaviy texnologiyalardan foydalanamiz",
  },
  {
    icon: icon5,
    title: "Mijozlarga e’tibor",
    description:
      "Biz har bir mijozning ehtiyojlarini inobatga olgan holda xizmat ko‘rsatamiz",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us">
      <h2>Nima uchun bizni tanlashadi?</h2>
      <div className="features">
        {features.map((item, index) => (
          <div className="feature" key={index}>
            <Image className="feature__img" src={item.icon} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
