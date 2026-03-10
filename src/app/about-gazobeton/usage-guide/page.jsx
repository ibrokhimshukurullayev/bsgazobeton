"use client";

import React from "react";
import "./about.scss";
import pdf from "../../../assets/images/pdf.svg";
import Image from "next/image";
import img1 from "../../../assets/images/instruction/about-instruction1.webp";
import img2 from "../../../assets/images/instruction/about-instruction2.webp";
import img3 from "../../../assets/images/instruction/about-instruction3.webp";
import img4 from "../../../assets/images/instruction/about-instruction4.webp";
import img5 from "../../../assets/images/instruction/about-instruction5.webp";
import img6 from "../../../assets/images/services/services-instalation.webp";
import img7 from "../../../assets/images/instruction/about-instruction6.webp";
import img8 from "../../../assets/images/instruction/about-instruction7.webp";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

const AboutIshlatilishi = () => {
  const [t] = useTranslation("global");
  const router = useRouter();

  const steps = [
    {
      id: 1,
      img: img1,
      title: t("aboutGazobetonUsageGuide.step1.title"),
      desc: t("aboutGazobetonUsageGuide.step1.description"),
    },
    {
      id: 2,
      img: img2,
      title: t("aboutGazobetonUsageGuide.step2.title"),
      desc: t("aboutGazobetonUsageGuide.step2.description"),
    },
    {
      id: 3,
      img: img3,
      title: t("aboutGazobetonUsageGuide.step3.title"),
      desc: t("aboutGazobetonUsageGuide.step3.description"),
    },
    {
      id: 4,
      img: img4,
      title: t("aboutGazobetonUsageGuide.step4.title"),
      desc: t("aboutGazobetonUsageGuide.step4.description"),
    },
    {
      id: 5,
      img: img5,
      title: t("aboutGazobetonUsageGuide.step5.title"),
      desc: t("aboutGazobetonUsageGuide.step5.description"),
    },
    {
      id: 6,
      img: img6,
      title: t("aboutGazobetonUsageGuide.step6.title"),
      desc: t("aboutGazobetonUsageGuide.step6.description"),
    },
    {
      id: 7,
      img: img7,
      title: t("aboutGazobetonUsageGuide.step7.title"),
      desc: t("aboutGazobetonUsageGuide.step7.description"),
    },
    {
      id: 8,
      img: img8,
      title: t("aboutGazobetonUsageGuide.step8.title"),
      desc: t("aboutGazobetonUsageGuide.step8.description"),
    },
  ];

  const handleButtonClick = () => {
    router.push("/contact");
  };

  return (
    <div className="about-container">
      <div className="sidebar">
        <div className="download-section">
          <div className="pdf-info">
            <Image src={pdf} alt="PDF icon" />
            <div>
              <p>{t("aboutGazobetonUsageGuide.downloadTitle")}</p>
              <span>{t("aboutGazobetonUsageGuide.downloadMeta")}</span>
            </div>
          </div>

          <a href="/files/instruksiya.pdf" download className="download-btn">
            {t("aboutGazobetonUsageGuide.downloadButton")}
          </a>
        </div>

        <div className="consultation-box">
          <div className="consultation-box__card">
            <h2>{t("aboutGazobetonUsageGuide.consultationTitle")}</h2>
            <p>{t("aboutGazobetonUsageGuide.consultationText")}</p>
          </div>
          <button onClick={handleButtonClick} className="contact-btn">
            {t("aboutGazobetonUsageGuide.contactButton")}
          </button>
        </div>
      </div>

      <div className="main-content">
        <h2>{t("aboutGazobetonUsageGuide.heading")}</h2>
        <div className="steps-grid">
          {steps.map((step) => (
            <div className="step" key={step.id}>
              <Image src={step.img} alt={step.title} width={435} height={260} />
              <p>
                <strong>{step.title}</strong>
                <br />
                <span>{step.desc}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutIshlatilishi;
