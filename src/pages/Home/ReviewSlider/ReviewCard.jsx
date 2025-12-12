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
        shadow-md hover:shadow-xl 
        transition-all duration-300 
        rounded-xl 
        p-4 sm:p-5 md:p-6 
        border border-gray-200 
        w-full 
        max-w-[320px] sm:max-w-sm md:max-w-md lg:max-w-lg 
        mx-auto
      "
    >
      {/* Quote Icon */}
      <FaQuoteLeft className="text-primary text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3" />

      {/* Rating Stars */}
      <div className="flex mb-1 sm:mb-2">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span
            key={idx}
            className={`text-[14px] sm:text-lg md:text-xl ${
              idx < ratingPoint ? "text-yellow-500" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
      </div>

      {/* Review Comment */}
      <p className="text-gray-700 leading-relaxed break-words text-xs sm:text-sm md:text-[15px] line-clamp-4">
        {reviewComment}
      </p>

      {/* Divider */}
      <div className="border-t border-dashed border-gray-300 my-3 sm:my-4"></div>

      {/* Reviewer Profile */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full overflow-hidden border">
          <img
            src={userImage}
            alt={userName}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="font-semibold text-xs sm:text-sm md:text-base">{userName}</h3>

          <p className="text-[9px] sm:text-xs text-gray-500">
            {universityName} • {scholarshipName}
          </p>

          <p className="text-[9px] sm:text-xs text-gray-400">
            {new Date(reviewDate).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
