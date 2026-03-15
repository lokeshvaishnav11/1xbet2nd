import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerSlider = () => {
  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpeg",
  ];

  return (
    <div className="container-fluid px-3 py-4">
      <style>
        {`
          .swiper-pagination-bullet {
            background-color: white;
            opacity: 0.6;
          }
          .swiper-pagination-bullet-active {
            background-color: white;
            opacity: 1;
          }
        `}
      </style>

      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="rounded-3 overflow-hidden"
      >
        {banners?.map((src, index) => (
          <SwiperSlide key={index}>
            <div className="position-relative">
              <a  target="_blank" rel="noopener noreferrer">
                <img src={src} className="img-fluid w-100 d-block" alt={`Banner ${index + 1}`} />
              </a>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
