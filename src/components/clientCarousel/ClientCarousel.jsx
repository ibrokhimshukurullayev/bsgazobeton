"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./clientCarousel.scss";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

const ClientCarousel = () => {
  const [t, i18n] = useTranslation("global");
  const videoRefs = useRef([]);

  const videos = [
    "/videos/get.mp4",
    "/videos/get1.mp4",
    "/videos/get2.mp4",
    "/videos/get3.mp4",
    "/videos/get4.mp4",
  ];

  const handleVideoClick = (index) => {
    const video = videoRefs.current[index];

    if (video) {
      if (video.paused) {
        // Boshqa videolarni pauza qilish
        videoRefs.current.forEach((v, i) => {
          if (i !== index && v) {
            v.pause();
            v.muted = true;
          }
        });

        video.play();
        video.muted = false; // ovozni yoqish
      } else {
        video.pause();
        video.muted = true; // pauza bo‘lsa yana mute bo‘lsin
      }
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{t("mijoz.title4")}</h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={1.2}
        navigation={true}
        grabCursor={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3.5,
          },
        }}
      >
        {videos.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="carousel-slide">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={src}
                onClick={() => handleVideoClick(index)}
                className="carousel-video"
                muted
                loop
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ClientCarousel;
