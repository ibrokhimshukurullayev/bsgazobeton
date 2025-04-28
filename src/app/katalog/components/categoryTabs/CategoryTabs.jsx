import "./categoryTabs.scss";
import Image from "next/image";

import product1 from "../../../../assets/images/product1.png";
import product2 from "../../../../assets/images/product2.png";
import product3 from "../../../../assets/images/product3.png";
import product4 from "../../../../assets/images/product4.png";

const categories = [
  {
    key: "blocks",
    label: "Gazobeton bloklari",
    icon: product1,
  },
  {
    key: "panels",
    label: "Gazobeton panellari",
    icon: product2,
  },
  { key: "glue", label: "Gazoblok kley", icon: product3 },
  { key: "tools", label: "Maxsus vositalar", icon: product4 },
];

const CategoryTabs = ({ selected, onSelect }) => (
  <div className="category-tabs">
    {categories.map((cat) => (
      <button
        key={cat.key}
        className={`tab-btn ${selected === cat.key ? "active" : ""}`}
        onClick={() => onSelect(cat.key)}
      >
        <Image src={cat.icon} alt={cat.label} />
        {cat.label}
      </button>
    ))}
  </div>
);

export default CategoryTabs;
