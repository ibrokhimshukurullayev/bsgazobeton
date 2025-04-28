"use client";
import React from "react";
import { usePathname } from "next/navigation";
import KatalogGazabetonHeaderLink from "./components/katalogHeaderLink/katalogGazabetonHeaderLink";
import { useState } from "react";
import CategoryTabs from "./components/categoryTabs/CategoryTabs";
import ProductCategory from "./components/productCategory/ProductCategory";
import gazabeton from "../../assets/images/Containergaza.png";
import product2 from "../../assets/images/product2.png";
import product3 from "../../assets/images/product3.png";
import product4 from "../../assets/images/product4.png";

const allData = {
  blocks: [
    {
      title: "Gazobeton bloklari - D300",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: gazabeton,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: gazabeton,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: gazabeton,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: gazabeton,
          number: "30",
        },
      ],
    },
    {
      title: "Gazobeton bloklari - D400",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "23 kg",
          price: 600000,
          image: gazabeton,
          number: "30",
        },
      ],
    },
  ],
  panels: [
    {
      title: "Gazobeton bloklari - D300",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product2,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product2,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product2,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product2,
          number: "30",
        },
      ],
    },
    {
      title: "Gazobeton bloklari - D400",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "23 kg",
          price: 600000,
          image: product2,
          number: "30",
        },
      ],
    },
  ],
  glue: [
    {
      title: "Gazobeton bloklari - D300",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product3,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product3,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product3,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product3,
          number: "30",
        },
      ],
    },
    {
      title: "Gazobeton bloklari - D400",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "23 kg",
          price: 600000,
          image: product3,
          number: "30",
        },
      ],
    },
  ],
  tools: [
    {
      title: "Gazobeton bloklari - D300",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product4,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product4,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product4,
          number: "30",
        },
        {
          name: "600×50×300",
          size: "13.89",
          weight: "21 kg",
          price: 600000,
          image: product4,
          number: "30",
        },
      ],
    },
    {
      title: "Gazobeton bloklari - D400",
      products: [
        {
          name: "600×50×300",
          size: "13.89",
          weight: "23 kg",
          price: 600000,
          image: product4,
          number: "30",
        },
      ],
    },
  ],
};

const titles = {
  "/katalog": "Katalog",
};

const Katalog = () => {
  const pathname = usePathname();
  const [selectedCategory, setSelectedCategory] = useState("blocks");

  const title = titles[pathname] || "Bosh sahifa";
  return (
    <div>
      <KatalogGazabetonHeaderLink title={title} link={pathname} />
      <div className="container">
        <CategoryTabs
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
        {allData[selectedCategory].map((cat, idx) => (
          <ProductCategory
            key={idx}
            title={cat.title}
            products={cat.products}
          />
        ))}
      </div>
    </div>
  );
};

export default Katalog;
