import React from "react";
import Image from "next/image";
import "./features.scss";
import icon1 from "../../assets/images/featuresicon/icon1.png";
import icon2 from "../../assets/images/featuresicon/icon2.png";
import icon3 from "../../assets/images/featuresicon/icon3.png";
import icon4 from "../../assets/images/featuresicon/icon4.png";
import icon5 from "../../assets/images/featuresicon/icon5.png";
import { useTranslation } from "react-i18next";

const WhyChooseUs = () => {
  const [t, i18n] = useTranslation("global");

  const features = [
    {
      icon: icon1,
      title: t("aboutkompany.cardtitle1"),
      description: t("aboutkompany.cardlist1"),
    },
    {
      icon: icon2,
      title: t("aboutkompany.cardtitle2"),
      description: t("aboutkompany.cardlist2"),
    },
    {
      icon: icon3,
      title: t("aboutkompany.cardtitle3"),
      description: t("aboutkompany.cardlist3"),
    },
    {
      icon: icon4,
      title: t("aboutkompany.cardtitle4"),
      description: t("aboutkompany.cardtitle4"),
    },
    {
      icon: icon5,
      title: t("aboutkompany.cardtitle5"),
      description: t("aboutkompany.cardtitle5"),
    },
  ];

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
