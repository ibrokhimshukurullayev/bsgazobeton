"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./clientCarousel.scss";
import ds from "../../assets/images/hero.png";

const ClientCarousel = () => {
  const videos = [
    "/videos/lolazor.mp4",
    "/videos/lolazor.mp4",
    "/videos/lolazor.mp4",
    "/videos/lolazor.mp4",
    "/videos/lolazor.mp4",
    "/videos/lolazor.mp4",
  ];

  const handleVideoClick = (event) => {
    const video = event.currentTarget;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Bizning mijozlarimiz</h2>
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
                src={src}
                onClick={handleVideoClick}
                className="carousel-video"
                controls={false}
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
