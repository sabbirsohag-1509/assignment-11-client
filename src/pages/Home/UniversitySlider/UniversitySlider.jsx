import React, { useState } from "react";
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
import uni8 from "../../../assets/university/uni8.jpg";
import uni9 from "../../../assets/university/uni9.jpg";
import uni10 from "../../../assets/university/uni10.jpg";
import uni11 from "../../../assets/university/uni11.jpg";
import uni12 from "../../../assets/university/uni12.jpg";
import uni13 from "../../../assets/university/uni13.jpg";
import uni14 from "../../../assets/university/uni14.jpg";

const universityLogos = [
  uni1,
  uni2,
  uni3,
  uni4,
  uni5,
  uni6,
  uni7,
  uni8,
  uni9,
  uni10,
  uni11,
  uni12,
  uni13,
  uni14,
];

const UniversitySlider = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openModal = (logo) => {
    setSelectedImage(logo);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };
  return (
    <div className="mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* title  */}
      <div className="text-center my-8 md:my-12">
        <h2 className="text-xl md:text-2xl font-bold relative inline-block px-4 sm:px-6 py-2">
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
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={20}
        grabCursor={true}
        loop={true}
        speed={1000}
        autoplay={{
          delay: 100,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay]}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="py-4"
      >
        {universityLogos.map((logo, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center">
            <div className="w-full h-full flex items-center justify-center p-2 sm:p-4">
              <img
                src={logo}
                alt={`university-${index}`}
                className="w-full h-40 sm:h-40 md:h-48 lg:h-56 xl:h-64 object-contain mx-auto opacity-80 hover:opacity-100 transition-all duration-500 hover:scale-110 cursor-pointer"
                onClick={() => openModal(logo)}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
        >
          <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white hover:bg-gray-200 text-black rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 shadow-lg z-10"
              aria-label="Close modal"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Image */}
            <img
              src={selectedImage}
              alt="University Logo"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UniversitySlider;
