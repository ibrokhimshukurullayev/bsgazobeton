"use client";
import Link from "next/link";
import "./news.scss";
import { useGetNewsQuery } from "../../../context/newsApi";

export default function NewsPage() {
  const { data, error, isLoading } = useGetNewsQuery({ take: 100, skip: 0 });

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  // Faqat posttype = news larni olish
  const newsList =
    data?.data?.list?.filter(
      (item) => item.posttype?.toLowerCase() === "news"
    ) || [];

  return (
    <div className="news-list">
      <div className="cards">
        {newsList.map((item) => (
          <Link
            key={item.postid}
            href={`/about/news/${item.postid}`}
            className="card"
          >
            {/* Agar rasmni qo‘shmoqchi bo‘lsang ochib qo‘yasan */}
            {/* <Image
              src={`https://api.bsgazobeton.uz${item.thubnailimageurl}`}
              alt={item.title}
              width={300}
              height={200}
            /> */}
            <h3>{item.title}</h3>
            <p>{item.shortdescription}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
