import React from "react";
import bannerImg from "../../../assets/bannerImg.jpg";

const Banner = () => {
  return (
    <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={bannerImg}
        alt="Scholarship Banner"
        className="absolute w-full  h-full object-center object-cover  brightness-70"
      />

      {/* Overlay */}
      <div className="absolute w-full h-full bg-black/50"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-white">
        {/* Left Text */}
        <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight transform transition duration-700 hover:scale-105">
            Welcome to <span className="text-primary">ScholarStream</span>
          </h1>
          <p className="text-lg md:text-xl max-w-lg mx-auto md:mx-0">
            Discover top scholarships from universities worldwide. Apply easily
            and simplify your path to financial aid and education opportunities.
          </p>
          <button className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-transform duration-300">
            Search Scholarship
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
