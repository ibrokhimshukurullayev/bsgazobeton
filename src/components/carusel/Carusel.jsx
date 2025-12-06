"use client";
import Image from "next/image";
import { useState } from "react";
import hero from "../../assets/images/home/banner.webp";
import bs1 from "../../assets/images/carusel/bs1.webp";
import bs2 from "../../assets/images/carusel/bs2.webp";
import bs3 from "../../assets/images/carusel/bs3.webp";
import "./carusel.scss";

const images = [hero, bs1, bs2, bs3];

export default function Carusel() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="carusel container">
      <div className="main-image">
        <div className="carusel__img">
          <Image
            className="carusel__img1"
            src={images[current]}
            alt={`Image ${current + 1}`}
            fill
          />
        </div>
        <button className="nav-button left" onClick={handlePrev}>
          &lt;
        </button>
        <button className="nav-button right" onClick={handleNext}>
          &gt;
        </button>
      </div>
      <div className="thumbnail-row">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${current === index ? "active" : ""}`}
            onClick={() => setCurrent(index)}
          >
            <Image
              className="carusel__img2"
              src={img}
              alt={`Thumb ${index + 1}`}
              fill
            />
          </div>
        ))}
      </div>
    </div>
  );
}
