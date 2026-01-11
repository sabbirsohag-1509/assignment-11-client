import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaUserGraduate } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import LoadingSpinner from "./../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";

const Scholarships = () => {
  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axios.get(
        "https://scholarstream-ecru.vercel.app/scholarships"
      );
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
      <title>
        Featured Scholarships - Explore Top Opportunities for Your Future
      </title>
      {/* title  */}
      <div className="text-center my-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 relative inline-block px-6 py-2 card-text">
          Featured <span className="text-primary">Scholarships</span>
          {/* Outer gradient border */}
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-linear-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          {/* Inner subtle border */}
          <span className="absolute inset-1 border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>

        {/* Optional: small subtitle */}
        <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base mt-1">
          Explore top scholarships selected just for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 my-10 px-2 md:px-0">
        {scholarships.map((item) => (
          <div
            key={item._id}
            className="bg-white dark:bg-base-200 rounded-lg shadow-sm overflow-hidden transition-all duration-200 h-96 flex flex-col hover:shadow-xl hover:-translate-y-2"
          >
            {/* Image */}
            <img
              src={item.universityImage}
              alt={item.universityName}
              className="h-40 w-full object-cover shrink-0"
            />

            {/* Body - Flex grow to push button to bottom */}
            <div className="p-4 space-y-2 flex-1 flex flex-col">
              {/* University & Category */}
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

              {/* Location */}
              <div className="flex items-center gap-2 text-xs card-text-secondary font-semibold">
                <FaMapMarkerAlt className="text-red-600 dark:text-red-400 shrink-0" />
                <span className="line-clamp-1">
                  {item.universityCity}, {item.universityCountry}
                </span>
              </div>

              {/* Application Fees */}
              <div className="flex items-center gap-2 text-xs card-text font-semibold">
                <HiReceiptPercent className="text-green-700 dark:text-green-400 text-base shrink-0" />
                <p className="font-bold">
                 Application Fees:{" "}
                  {item.applicationFees ? `$${item.applicationFees}` : "N/A"}
                </p>
              </div>

              {/* Spacer to push button to bottom */}
              <div className="flex-1"></div>

              {/* View Details */}
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
    </div>
  );
};

export default Scholarships;
