"use client";

import React from "react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import aboutInstruction1 from "../../../assets/images/aboutGazobeton/about-instruction1.webp";
import aboutInstruction2 from "../../../assets/images/aboutGazobeton/about-instruction2.webp";
import aboutInstruction3 from "../../../assets/images/aboutGazobeton/about-instruction3.webp";
import aboutInstruction4 from "../../../assets/images/aboutGazobeton/about-instruction4.webp";
import aboutInstruction5 from "../../../assets/images/aboutGazobeton/about-instruction5.webp";
import "./about.scss";

const AboutQollanilishi = () => {
  const [t] = useTranslation("global");

  const steps = [
    {
      id: 1,
      title: t("aboutGazobetonApplications.step1.title"),
      description: t("aboutGazobetonApplications.step1.description"),
      image: aboutInstruction1,
    },
    {
      id: 2,
      title: t("aboutGazobetonApplications.step2.title"),
      description: t("aboutGazobetonApplications.step2.description"),
      image: aboutInstruction2,
    },
    {
      id: 3,
      title: t("aboutGazobetonApplications.step3.title"),
      description: t("aboutGazobetonApplications.step3.description"),
      image: aboutInstruction3,
    },
    {
      id: 4,
      title: t("aboutGazobetonApplications.step4.title"),
      description: t("aboutGazobetonApplications.step4.description"),
      image: aboutInstruction4,
    },
    {
      id: 5,
      title: t("aboutGazobetonApplications.step5.title"),
      description: t("aboutGazobetonApplications.step5.description"),
      image: aboutInstruction5,
    },
  ];

  return (
    <div className="timeline-wrapper">
      <h2 className="timeline-heading">
        {t("aboutGazobetonApplications.heading")}
      </h2>
      <div className="timeline">
        {steps.map((step, index) => (
          <div className="timeline-step" key={step.id}>
            <div className="timeline-left">
              <div className="circle">{step.id}</div>
              {index !== steps.length - 1 && <div className="line" />}
            </div>
            <div className="timeline-content">
              <div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
              <Image
                src={step.image}
                alt={step.title}
                width={494}
                height={265}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutQollanilishi;
