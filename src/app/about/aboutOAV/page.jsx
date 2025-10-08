"use client";
import React from "react";
import "./about.scss";
import Image from "next/image";
import oav from "../../../assets/images/aboutoav.png";
import Title from "../../../components/title/Title";
import { useGetNewsQuery } from "../../../context/newsApi";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const AboutOAV = () => {
  // API dan yangiliklarni olish
  const { data, isLoading, error } = useGetNewsQuery({ take: 100, skip: 0 });
  const { t, i18n } = useTranslation("global");

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  // faqat `posttype = blog`
  const blogPosts =
    data?.data?.list?.filter(
      (item) => item.posttype?.toLowerCase() === "blog"
    ) || [];

  return (
    <div id="aboutOAV">
      <Title
        text={
          "Bizning faoliyatimiz OAV, yangiliklar, qurilish sohasidagi gazeta-jurnallar va mahalliy telekanallar tomonidan yoritib boriladi. Biz haqimizda chop etilgan maqolalar:"
        }
      />
      <div className="aboutOAV__card">
        {blogPosts.length === 0 ? (
          <p className="vakansiyalar__empty">{t("compare.news")}</p>
        ) : (
          blogPosts.map((item) => (
            <Link
              key={item.postid}
              href={`/about/news/${item.postid}`} // detail sahifaga yo‘naltirish
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
                <p>{item.shortdescription}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AboutOAV;
