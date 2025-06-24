"use client";

import React, { useState } from "react";
import { useGetVakansiyalarQuery } from "../../../context/vakansiyaApi";

const Vakansiyalar = () => {
  const { data, isLoading, error } = useGetVakansiyalarQuery({
    skip: 0,
    take: 20,
  });

  if (isLoading) return <p>Yuklanmoqda...</p>;
  if (error) return <p>Xatolik yuz berdi</p>;

  const vakansiyalar = data?.data?.list || [];

  console.log("API javobi:", vakansiyalar);

  return (
    <div>
      <h1>Vakansiyalar</h1>

      {vakansiyalar.length === 0 && <p>Hozircha vakansiyalar yo‘q</p>}

      <ul>
        {vakansiyalar.map((item) => (
          <li key={item.vacancyId}>
            <h3>{item.title || "Sarlavha yo‘q"}</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: item.description || "",
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Vakansiyalar;
