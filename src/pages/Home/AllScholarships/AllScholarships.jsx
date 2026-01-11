import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaUserGraduate } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import LoadingSpinner from "./../../../components/LoadingSpinner/LoadingSpinner";
import { useState } from "react";
import axios from "axios";

const AllScholarships = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships", searchText, category],
    queryFn: async () => {
      const res = await axios.get(
        `https://scholarstream-ecru.vercel.app/all-scholarships?search=${searchText}&category=${category}`
      );
      return res.data;
    },
  });

  // Get unique countries from scholarships
  const uniqueCountries = Array.from(
    new Set(scholarships.map((item) => item.universityCountry))
  ).sort();

  // Filter scholarships by country
  const filteredByCountry = country
    ? scholarships.filter((item) => item.universityCountry === country)
    : scholarships;

  // if (isLoading) return <LoadingSpinner />;

  // Pagination logic
  const totalPages = Math.ceil(filteredByCountry.length / itemsPerPage);
  const currentItems = filteredByCountry.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <title>
        All Scholarships - Explore Comprehensive Educational Opportunities
      </title>

      {/* Header - On top for mobile, integrated on lg */}
      <div className="text-center mb-6 lg:mb-0">
        <h2 className="text-xl md:text-2xl font-bold relative inline-block px-6 py-2 card-text mt-4 lg:mt-6 mb-1">
          Featured All <span className="text-primary">Scholarships</span>
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-linear-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          <span className="absolute inset-1 border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
          Explore our extensive collection of scholarships and financial aid
          opportunities from top universities globally.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col lg:flex-row justify-between items-center mt-10 px-4 gap-4">
        {/* Search Scholarships */}
        <label className="input w-full lg:w-1/3 px-3 bg-base-200 rounded-lg shadow-sm focus-within:ring-2 focus-within:ring-primary focus-within:border-primary">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            placeholder="Search Scholarship"
          />
        </label>

        {/* Filter by Country */}
        <div className="w-full lg:w-1/4">
          <select
            className="select select-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
            onChange={(e) => setCountry(e.target.value)}
            value={country}
          >
            <option value="">All Countries</option>
            {uniqueCountries.map((countryName) => (
              <option key={countryName} value={countryName}>
                {countryName}
              </option>
            ))}
          </select>
        </div>

        {/* Filter by Category */}
        <div className="w-full lg:w-1/4">
          <select
            className="select select-bordered w-full rounded-lg shadow-sm focus:ring-2 focus:ring-primary focus:border-primary"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Full fund">Full Fund</option>
            <option value="Self-fund">Self Fund</option>
            <option value="Partial">Partial</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* Scholarships Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 px-2 md:px-0">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-base-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 h-96 flex flex-col hover:shadow-xl hover:-translate-y-2"
              >
                <img
                  src={item.universityImage}
                  alt={item.universityName}
                  className="h-40 w-full object-cover shrink-0"
                />
                <div className="p-4 space-y-2 flex-1 flex flex-col">
                  <h2 className="text-base font-bold card-text line-clamp-2">
                    {item.universityName}
                  </h2>
                  <div className="text-xs flex justify-between items-center gap-2 card-text-secondary font-semibold">
                    <span className="font-bold flex items-center gap-1 truncate">
                      <MdCategory className="text-blue-700 dark:text-blue-400 shrink-0" />
                      {item.scholarshipCategory}
                    </span>
                    <span className="font-bold flex items-center gap-1 shrink-0">
                      <FaUserGraduate className="text-blue-700 dark:text-blue-400" />
                      {item.degree}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs card-text-secondary font-semibold">
                    <FaMapMarkerAlt className="text-red-600 dark:text-red-400 shrink-0" />
                    <span className="line-clamp-1">
                      {item.universityCity}, {item.universityCountry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs card-text font-semibold">
                    <HiReceiptPercent className="text-green-700 dark:text-green-400 text-base shrink-0" />
                    <p className="font-bold">
                      Application Fees:{" "}
                      {item.applicationFees
                        ? `$${item.applicationFees}`
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex-1"></div>
                  <Link
                    to={`/scholarshipDetails/${item._id}`}
                    className="btn btn-primary btn-sm w-full rounded-md text-xs shrink-0"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Pagination Controls (DaisyUI) */}
      <div className="flex justify-center mt-8 mb-3">
        <ul className="btn-group">
          {/* Previous */}
          <button
            className="btn btn-outline"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            «
          </button>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`btn ${
                currentPage === i + 1 ? "btn-primary" : "btn-outline"
              }`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          {/* Next */}
          <button
            className="btn btn-outline"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            »
          </button>
        </ul>
      </div>
    </div>
  );
};

export default AllScholarships;
