import React from "react";

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200">
      {/* Spinner */}
      <div className="relative w-20 h-20 sm:w-16 sm:h-16">
        {/* Base circle */}
        <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
        {/* Animated spinning border */}
        <div className="absolute inset-0 rounded-full border-4 border-t-primary border-b-primary animate-spin"></div>
      </div>

      {/* Loading Text */}
      <h2 className="mt-4 text-primary text-lg sm:text-base font-medium animate-pulse">
        Loading...
      </h2>
    </div>
  );
};

export default LoadingSpinner;
