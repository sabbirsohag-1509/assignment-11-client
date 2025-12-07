import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const scholarshipId = searchParams.get("scholarshipId");

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
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        Payment Successful!
      </h2>
      <p className="mb-6">Thank you for your payment.</p>

      {scholarship && (
        <div className="border rounded-lg p-6 shadow bg-white mb-6 space-y-2 text-left">
          <p>
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p>
            <strong>Scholarship Name:</strong> {scholarship.scholarshipName}
          </p>
          <p>
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p>
            <strong>Amount Paid:</strong> ${scholarship.applicationFees}
          </p>
        </div>
      )}

      <button
        className="btn btn-primary w-full md:w-1/2 mx-auto"
        onClick={() => navigate("/dashboard/my-application")}
      >
        Go to My Applications
      </button>
    </div>
  );
};

export default PaymentSuccess;
