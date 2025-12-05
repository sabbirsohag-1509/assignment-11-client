import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import LoadingSpinner from "./../../../components/LoadingSpinner/LoadingSpinner";
import { motion } from "framer-motion";

const Scholarships = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/scholarships");
      return res.data;
    },
  });

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );

  return (
    <div>
      <div className="text-center my-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block px-6 py-2">
          Featured <span className="text-primary">Scholarships</span>
          {/* Outer gradient border */}
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          {/* Inner subtle border */}
          <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>

        {/* Optional: small subtitle */}
        <p className="text-gray-400 text-sm md:text-base mt-1">
          Explore top scholarships selected just for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 my-10">
        {scholarships.map((item) => (
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
            {/* Image */}
            <img
              src={item.universityImage}
              alt={item.universityName}
              className="h-48 w-full object-cover rounded-t-xl"
            />

            {/* Body */}
            <div className="p-5 space-y-3">
              {/* University & Category */}
              <h2 className="text-xl font-semibold text-gray-800">
                {item.universityName}
              </h2>

              <div className="text-sm flex items-center gap-2 text-gray-600">
                <MdCategory className="text-blue-600" />
                <span className="font-medium">{item.scholarshipCategory}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600">
                <FaMapMarkerAlt className="text-red-500" />
                <span>
                  {item.universityCity}, {item.universityCountry}
                </span>
              </div>

              {/* Application Fees */}
              <div className="flex items-center gap-2 text-gray-700">
                <HiReceiptPercent className="text-green-600 text-xl" />
                <p className="font-medium">
                  Application Fees:{" "}
                  {item.applicationFees ? `$${item.applicationFees}` : "N/A"}
                </p>
              </div>

              {/* View Details */}
              <Link
                //   to={`/scholarships/${item._id}`}
                className="btn btn-primary w-full mt-3 rounded-lg"
              >
                View Details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
