import React from "react";
import { useParams, Link } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory, MdOutlineAccessTimeFilled } from "react-icons/md";
import { HiReceiptPercent } from "react-icons/hi2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { GiWorld } from "react-icons/gi";
import { TiPin } from "react-icons/ti";

const ScholarshipDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  // Fetch scholarship details
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${id}`);
      return res.data;
    },
  });

  // Fetch Reviews
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?scholarshipId=${id}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="my-10 container mx-auto px-4">
      {/* Header Section */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <img
          src={scholarship.universityImage}
          className="w-full h-[300px] object-cover"
        />

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            🎓 {scholarship.scholarshipName}
          </h1>

          <div className="flex flex-wrap gap-4 text-gray-700">

            <span className="flex items-center gap-2">
              <MdCategory className="text-blue-600" />
              <span className="font-medium">
                {scholarship.scholarshipCategory}
              </span>
            </span>

            <span className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-red-500" />
              {scholarship.universityCity}, {scholarship.universityCountry}
            </span>

            <span className="flex items-center gap-2">
              <MdOutlineAccessTimeFilled className="text-purple-600" />
              Deadline: <b>{scholarship.applicationDeadline}</b>
            </span>

            <span className="flex items-center gap-2">
              <GiWorld size={16} className="text-green-600"/> World Rank: <b>{scholarship.universityWorldRank}</b>
            </span>
          </div>

          {/* Fees */}
          <div className="flex items-center gap-3 text-gray-800">
            <HiReceiptPercent className="text-green-600 text-2xl" />
            <span className="font-medium">
              Application Fees:{" "}
              {scholarship.applicationFees
                ? `$${scholarship.applicationFees}`
                : "N/A"}
            </span>
          </div>

          {/* Description */}
          <p className="mt-4 text-gray-600 leading-relaxed">
            {scholarship.description || "No description available."}
          </p>

          {/* stipend Section */}
          {scholarship.stipend && (
            <div className="mt-5 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-bold text-lg mb-2 flex items-center"><TiPin size={24} className="text-primary"/> Stipend :</h3>
              <p className="text-gray-700">{scholarship.stipend}</p>
            </div>
          )}

          {/* Apply Button */}
          <div className="mt-5">
            <Link to={`/apply-scholarship/${scholarship._id}`}>
              <button className="btn btn-primary w-full text-lg font-semibold rounded-xl">
                Apply for Scholarship
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/*Reviews Section*/}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reviews ({reviews.length})</h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">No reviews available for this scholarship.</p>
        )}

        <div className="space-y-5">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-xl shadow-md border"
            >
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={review.userImage}
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <h4 className="font-bold text-gray-800">{review.userName}</h4>
                  <p className="text-sm text-gray-500">{review.reviewDate}</p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 text-yellow-500 mb-2">
                {"⭐".repeat(review.ratingPoint)}
              </div>

              <p className="text-gray-700">{review.reviewComment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScholarshipDetails;
