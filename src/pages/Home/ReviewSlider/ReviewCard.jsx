import React from "react";
import { FaQuoteLeft } from "react-icons/fa";

const ReviewCard = ({ review }) => {
  const {
    userName,
    userImage,
    universityName,
    scholarshipName,
    reviewDate,
    reviewComment,
    ratingPoint,
  } = review;

  return (
    <div
      className="
        bg-base-100 
        shadow-lg hover:shadow-2xl 
        transition-all duration-300 
        rounded-xl 
        p-4 sm:p-5 md:p-6 lg:p-7
        border border-gray-200 
        w-full 
        max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[420px]
        mx-auto
        h-auto
        min-h-[280px] sm:min-h-[320px]
        flex flex-col
        mb-4 md:mb-6 lg:mb-8
      "
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="text-primary text-base sm:text-lg md:text-xl lg:text-2xl mb-2 sm:mb-3" />

      {/* Rating Stars */}
      <div className="flex mb-2 sm:mb-3 gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span
            key={idx}
            className={`text-sm sm:text-base md:text-lg lg:text-xl ${
              idx < ratingPoint ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Comment */}
      <p className="card-text-secondary leading-relaxed break-words text-xs sm:text-sm md:text-base line-clamp-3 sm:line-clamp-4 mb-auto">
        {reviewComment}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-3 sm:my-4 md:my-5"></div>

      {/* Reviewer Profile */}
      <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-200 flex-shrink-0">
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-xs sm:text-sm md:text-base truncate">
            {userName}
          </h3>

          <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 truncate">
            {universityName} • {scholarshipName}
          </p>

          <p className="text-[9px] sm:text-[10px] md:text-xs text-gray-400">
            {new Date(reviewDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
