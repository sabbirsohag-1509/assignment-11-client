import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scholarshipId = searchParams.get("scholarshipId");
  const errorMessage = searchParams.get("error");

  const axiosSecure = useAxiosSecure();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
    enabled: !!scholarshipId,
  });

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-red-600">
        Payment Failed
      </h2>
      <p className="mb-4">
        Unfortunately, your payment for the scholarship has failed.
      </p>

      {scholarship ? (
        <p className="mb-2">
          <strong>University Name:</strong> {scholarship.universityName} <br /> 
          <strong>Scholarship Name:</strong> {scholarship.scholarshipName}
        </p>
      ) : (
        <p className="mb-2 text-gray-500">Scholarship info not found.</p>
      )}

      {errorMessage && (
        <p className="mb-6 text-red-500">
          <strong>Error:</strong> {errorMessage}
        </p>
      )}

      <button
        className="btn btn-primary w-full md:w-1/2 mx-auto"
        onClick={() => navigate("/dashboard/my-application")}
      >
        Return to Dashboard
      </button>
    </div>
  );
};

export default PaymentFailed;
