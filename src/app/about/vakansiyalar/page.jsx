"use client";

import React, { useState, useEffect } from "react";
import { useGetVakansiyalarQuery } from "../../../context/vakansiyaApi";
import { useRouter } from "next/navigation";
import "./vakansiyalar.scss";
import Loading from "../../../components/loading/Loading";
import { useTranslation } from "react-i18next";

const Vakansiyalar = () => {
  const router = useRouter();
  const { data, isLoading, error } = useGetVakansiyalarQuery({
    skip: 0,
    take: 20,
  });

  const [activeIndex, setActiveIndex] = useState(null);
  const { t, i18n } = useTranslation("global");

  useEffect(() => {
    if (data?.data?.list?.length > 0) {
      setActiveIndex(0);
    }
  }, [data]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  const handleButtonClick = () => {
    router.push("/joylashuv");
  };

  if (isLoading)
    return (
      <p className="loading">
        <Loading />
      </p>
    );
  if (error) return <p className="error">Xatolik yuz berdi</p>;

  const vakansiyalar = data?.data?.list || [];

  return (
    <div className="vakansiyalar">
      {vakansiyalar.length === 0 ? (
        <p className="vakansiyalar__empty">{t("deliveryinfo.job")}</p>
      ) : (
        vakansiyalar.map((item, index) => (
          <div className="vakansiya" key={item.vacancyId}>
            <div
              className="vakansiya__header"
              onClick={() => toggleAccordion(index)}
            >
              <span>{item.title || "Sarlavha yo‘q"}</span>
              <span className={`icon ${activeIndex === index ? "open" : ""}`}>
                {activeIndex === index ? "−" : "+"}
              </span>
            </div>

            {activeIndex === index && (
              <div className="vakansiya__body">
                <div
                  className="vakansiya__description"
                  dangerouslySetInnerHTML={{
                    __html: item.description || "",
                  }}
                />
                <button onClick={handleButtonClick} className="vakansiya__btn">
                  {t("deliveryinfo.button1")}
                </button>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Vakansiyalar;
