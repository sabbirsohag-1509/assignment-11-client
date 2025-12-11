import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaUserGraduate } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import LoadingSpinner from "./../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const AllScholarships = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships", searchText, category],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3000/all-scholarships?search=${searchText}&category=${category}`
      );
      return res.data;
    },
  });

  // if (isLoading) return <LoadingSpinner />;

  // Pagination logic
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  const currentItems = scholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row justify-between items-center mt-10 px-4">
        {/* Search Scholarships */}
        <label className="input">
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
        <div>
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block px-6 py-2">
              Featured All <span className="text-primary">Scholarships</span>
              <span
                className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
              ></span>
              <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-1">
              Here all scholarships selected just for you
            </p>
          </div>
        </div>
        {/* //Filter by Category */}
        <div className="w-full md:w-1/4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
            {currentItems.map((item) => (
              <motion.div
                key={item._id}
                className="bg-white rounded-xl shadow-lg border"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 15px 25px rgba(0,0,0,0.2)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <img
                  src={item.universityImage}
                  alt={item.universityName}
                  className="h-48 w-full object-cover rounded-t-xl"
                />
                <div className="p-5 space-y-3">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.universityName}
                  </h2>
                  <div className="text-sm flex justify-between items-center gap-2 text-gray-600">
                    <span className="font-medium flex items-center gap-1">
                      <MdCategory className="text-blue-600" />
                      {item.scholarshipCategory}
                    </span>
                    <span className="font-medium flex items-center gap-1">
                      <FaUserGraduate className="text-blue-600" />
                      {item.degree}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaMapMarkerAlt className="text-red-500" />
                    <span>
                      {item.universityCity}, {item.universityCountry}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <HiReceiptPercent className="text-green-600 text-xl" />
                    <p className="font-medium">
                      Application Fees:{" "}
                      {item.applicationFees
                        ? `$${item.applicationFees}`
                        : "N/A"}
                    </p>
                  </div>
                  <Link
                    to={`/scholarshipDetails/${item._id}`}
                    className="btn btn-primary w-full mt-3 rounded-lg"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
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
