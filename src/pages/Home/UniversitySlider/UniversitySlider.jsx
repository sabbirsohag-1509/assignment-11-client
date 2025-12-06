import React from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import uni1 from "../../../assets/university/uni1.jpg";
import uni2 from "../../../assets/university/uni2.jpg";
import uni3 from "../../../assets/university/uni3.jpg";
import uni4 from "../../../assets/university/uni4.jpg";
import uni5 from "../../../assets/university/uni5.jpg";
import uni6 from "../../../assets/university/uni6.jpg";
import uni7 from "../../../assets/university/uni7.jpg";

const universityLogos = [uni1, uni2, uni3, uni4, uni5, uni6, uni7];

const UniversitySlider = () => {
  return (
    <div className="mt-24 px-4">
      {/* title  */}
      <div className="text-center my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block px-6 py-2">
          Trusted by Top{" "}
          <span className="text-primary">Universities Worldwide</span>
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>
      </div>

      {/* Slider */}
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        spaceBetween={30}
        grabCursor={true}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
      >
        {universityLogos.map((logo, index) => (
          <SwiperSlide key={index}>
            <img
              src={logo}
              alt={`university-${index}`}
              className="w-96 h-72 object-contain mx-auto opacity-80 hover:opacity-100 transition"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UniversitySlider;
