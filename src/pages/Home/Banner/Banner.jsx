import React, { useState, useEffect } from "react";
import bannerImg from "../../../assets/bannerImg.jpg";
import bannerImg2 from "../../../assets/bannerImg-2.png";
import { Link } from "react-router";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const slides = [
    {
      image: bannerImg2,
      title: "Welcome to ScholarStream",
      description:
        "Discover top scholarships from universities worldwide. Apply easily and simplify your path to financial aid and education opportunities.",
      highlight: "ScholarStream",
    },
    {
      image: bannerImg,
      title: "Your Dream University Awaits",
      description:
        "Access thousands of scholarships and start your journey to academic excellence with our comprehensive platform.",
      highlight: "Dream University",
    },
  ];

  // Auto-play slider
  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [autoPlay, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setAutoPlay(false);
  };

  return (
    <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0 w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover brightness-50 md:object-center object-top md:h-full h-[60vh] md:h-[75vh]"
            />
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 w-full h-full flex items-center justify-center">
        <div className="w-full md:w-2/3 text-center text-white space-y-6 animate-fade-in">
          {/* Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            {slides[currentSlide].title.split(" ").map((word, i) =>
              word === slides[currentSlide].highlight ? (
                <span key={i} className="text-primary block md:inline">
                  {word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
            {slides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/all-scholarships"
              className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Search Scholarship
            </Link>
            <Link
              to="/contact-us"
              className="btn btn-outline btn-lg text-white border-white hover:bg-white/10 transition-all duration-300 hover:scale-105"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 text-white group"
        aria-label="Previous slide"
      >
        <ChevronLeft
          size={28}
          className="group-hover:scale-125 transition-transform"
        />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 transition-all duration-300 text-white group"
        aria-label="Next slide"
      >
        <ChevronRight
          size={28}
          className="group-hover:scale-125 transition-transform"
        />
      </button>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentSlide
                ? "bg-primary w-10 h-3"
                : "bg-white/50 hover:bg-white/75 w-3 h-3"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div> */}

      {/* Scroll Indicator - Visual Flow */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-bounce cursor-pointer">
        <span className="text-white text-sm font-medium">
          Scroll to explore
        </span>
        <ChevronDown size={24} className="text-primary" />
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 pointer-events-none" />
    </section>
  );
};

export default Banner;
