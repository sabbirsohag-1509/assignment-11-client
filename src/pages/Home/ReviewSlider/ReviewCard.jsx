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
        ratingPoint
    } = review;

    return (
        <div className="max-w-sm bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 rounded-xl p-6 border border-gray-200">
            
            {/* Quote Icon */}
            <FaQuoteLeft className="text-primary text-2xl mb-3" />

            {/* Rating Stars */}
            <div className="flex mb-2">
                {Array.from({ length: 5 }).map((_, idx) => (
                    <span
                        key={idx}
                        className={`text-lg ${
                            idx < ratingPoint ? "text-yellow-500" : "text-gray-300"
                        }`}
                    >
                        ★
                    </span>
                ))}
            </div>

            {/* Review Comment */}
            <p className="text-gray-700 leading-relaxed break-words line-clamp-4">
                {reviewComment}
            </p>

            {/* Divider */}
            <div className="border-t border-dashed border-gray-300 my-4"></div>

            {/* Reviewer Profile */}
            <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden border">
                    <img
                        src={userImage}
                        alt={userName}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div>
                    <h3 className="font-semibold text-base">{userName}</h3>
                    <p className="text-xs text-gray-500">
                        {universityName} • {scholarshipName}
                    </p>
                    <p className="text-xs text-gray-400">
                        {new Date(reviewDate).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
