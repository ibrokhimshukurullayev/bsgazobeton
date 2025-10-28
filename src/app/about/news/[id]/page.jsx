"use client";
import { use } from "react";
import { useGetNewsSingleQuery } from "../../../../context/newsApi";
import "../../news/news.scss";
import Image from "next/image";
import Carusel from "../../../../components/carusel/Carusel";

// export const metadata = {
//   title: "Yangiliklar | BS Gazobeton",
//   description: "O'zbekistonning eng sifatli gazobeton mahsulotlari.",
// };

export default function NewsDetail({ params }) {
  // Next.js 15 da params Promise bo‘lib keladi, shu sabab use() bilan unwrap qilamiz
  const { id } = use(params);

  // RTK Query orqali bitta yangilikni olish
  const { data, isLoading, error } = useGetNewsSingleQuery(id);

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  const news = data?.data; // API response ichidagi obyektni olamiz

  if (!news) return <p>Yangilik topilmadi</p>;

  return (
    <div className="news-detail">
      <h1>{news.title}</h1>
      <Carusel />
      <p className="date">{news.date}</p>

      <div className="images">
        {/* <Image
          src={`https://api.bsgazobeton.uz${news.thubnailimageurl}`}
          alt={news.title}
          width={600}
          height={400}
        /> */}
      </div>

      <div className="content">
        <p>{news.description}</p>
      </div>
    </div>
  );
}
