import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import LoadingSpinner from "./../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";
import { useState } from "react";

const AllScholarships = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // ek page e 6 scholarship

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Pagination logic
  const totalPages = Math.ceil(scholarships.length / itemsPerPage);
  const currentItems = scholarships.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      {/* Header */}
      <div className="text-center my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block px-6 py-2">
          Featured All <span className="text-primary">Scholarships</span>
          <span className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"></span>
          <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-1">
          Here all top scholarships selected just for you
        </p>
      </div>

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
              <h2 className="text-xl font-semibold text-gray-800">{item.universityName}</h2>
              <div className="text-sm flex items-center gap-2 text-gray-600">
                <MdCategory className="text-blue-600" />
                <span className="font-medium">{item.scholarshipCategory}</span>
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
                  Application Fees: {item.applicationFees ? `$${item.applicationFees}` : "N/A"}
                </p>
              </div>
              <Link  to={`/scholarshipDetails/${item._id}`} className="btn btn-primary w-full mt-3 rounded-lg">View Details</Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Controls (DaisyUI) */}
      <div className="flex justify-center mt-8">
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
              className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline"}`}
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
