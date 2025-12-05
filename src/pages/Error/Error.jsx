import React from "react";
import errorPic from "../../assets/error-404.png";
import { Link } from "react-router";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <img
        src={errorPic}
        alt="404 Not Found"
        className="w-full max-w-sm mb-6 animate-pulse"
      />
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        Oopsss.....!! Page Not Found
      </h1>
      <p className="text-gray-600 text-center mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="btn btn-primary px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition"
      >
        Go Back Home
      </Link>
    </div>  
  );
};

export default Error;
