"use client";

import React from "react";
import "./about.scss";
import Image from "next/image";
import oav from "../../../assets/images/aboutoav.png";
import Title from "../../../components/title/Title";
import { useGetNewsQuery } from "../../../context/newsApi";
import { useTranslation } from "react-i18next";

const AboutOAV = () => {
  const { t, i18n } = useTranslation("global");

  // ❗ Til o‘zgarganda yangilansin deb language-ni query kalitiga qo‘shdik
  const { data, isLoading, error } = useGetNewsQuery({
    take: 100,
    skip: 0,
    posttype: "massmedia",
    lang: i18n.language, // <-- MUHIM
  });

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  const massmediaPosts =
    data?.data?.list?.filter(
      (item) => item.posttype?.toLowerCase() === "massmedia"
    ) || [];

  return (
    <div id="aboutOAV">
      <Title text={t("abouts.oavTitle")} />

      <div className="aboutOAV__card">
        {massmediaPosts.length === 0 ? (
          <p className="vakansiyalar__empty">{t("compare.news")}</p>
        ) : (
          massmediaPosts.map((item) => (
            <a
              key={item.postid}
              href={item.externallink}
              target="_blank"
              rel="noopener noreferrer"
              className="aboutOAV__box"
            >
              {item.thubnailimageurl && (
                <Image
                  className="img"
                  src={`https://api.bsgazobeton.uz${item.thubnailimageurl}`}
                  alt={item.title}
                  width={300}
                  height={200}
                />
              )}

              <h3>{item.title}</h3>

              <div>
                <Image src={oav} alt="qayd" />
                <p>{item.externallinksource}</p>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutOAV;
