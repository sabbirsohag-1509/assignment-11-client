import React from "react";
import { Link } from "react-router";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-6">

      {/* ICON + ANIMATION */}
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-full p-8 border border-blue-300 dark:border-gray-700 animate-bounce">
        <FaLock className="text-5xl text-blue-600 dark:text-blue-400" />
      </div>

      {/* TEXTS */}
      <h1 className="mt-6 text-5xl font-bold text-gray-900 dark:text-white">
        403
      </h1>

      <h2 className="mt-2 text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Access Forbidden
      </h2>

      <p className="mt-3 text-gray-600 dark:text-gray-400 text-center max-w-lg">
        You don't have permission to view this page.  
        This feature is restricted based on your ScholarStream account role.
      </p>

      {/* EXTRA INFO CARD */}
      <div className="mt-6 p-5 max-w-xl text-center bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-xl shadow">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          Why am I seeing this?
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Some pages such as **Admin Panel**, **Moderator Tools**, or **Scholarship Controls**  
          require additional permissions. Please contact the admin if you believe this is a mistake.
        </p>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-8 flex gap-4 flex-wrap justify-center">
        <Link
          to="/"
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6"
        >
          Go Home
        </Link>

        <Link
          to="/dashboard"
          className="btn bg-gray-700 hover:bg-gray-800 text-white px-6"
        >
          Go to Dashboard
        </Link>
      </div>

      {/* Footer small note */}
      <p className="mt-10 text-sm text-gray-500 dark:text-gray-500">
        ScholarStream • Secure Access System
      </p>
    </div>
  );
};

export default Forbidden;
