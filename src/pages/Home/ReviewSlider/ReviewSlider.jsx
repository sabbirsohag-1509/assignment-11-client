import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ReviewCard from "./ReviewCard";

const ReviewSlider = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axios.get(
        "https://scholarstream-ecru.vercel.app/all-reviews-home"
      );
      return res.data;
    },
  });
  // console.log('Home ',reviews);

  if (isLoading) {
    return <div> Reviews are Loading.....</div>;
  }

  return (
    <div className="mt-16 sm:mt-20 md:mt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col justify-center items-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-xl md:text-2xl font-bold relative inline-block px-4 sm:px-6 py-2 text-center">
          Featured Top <span className="text-primary">Reviews</span>
          {/* Outer gradient border */}
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          {/* Inner subtle border */}
          <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>
      </div>
      <Swiper
        loop={true}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        coverflowEffect={{
          rotate: 8,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: true,
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 30,
            coverflowEffect: {
              rotate: 10,
              stretch: 0,
              depth: 150,
              modifier: 1,
              slideShadows: true,
            },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
            coverflowEffect: {
              rotate: 15,
              stretch: 0,
              depth: 180,
              modifier: 1,
              slideShadows: true,
            },
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
            coverflowEffect: {
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            },
          },
        }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper w-full py-8 sm:py-10 md:py-12"
      >
        {reviews.map((review) => (
          <SwiperSlide
            key={review.id}
            className="flex justify-center items-center"
          >
            <ReviewCard review={review}></ReviewCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
