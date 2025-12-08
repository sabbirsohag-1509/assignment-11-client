import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
    const applicationId = searchParams.get("applicationId");


  const { data: application, isLoading } = useQuery({
     queryKey: ["application", applicationId],
     queryFn: async () => {
       const res = await axiosSecure.get(`/applications/${applicationId}`);
       return res.data;
     },
     enabled: !!applicationId,
  });
  console.log("Application Data:", application);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log("Payment confirmation response:", res.data);
          if (res.data.success) {
            Swal.fire(
              "Success",
              "Payment status updated successfully",
              "success"
            );
          } else {
            Swal.fire("Error", "Failed to update payment status", "error");
          }
        });
    }
  }, [sessionId, axiosSecure]);
    
   if (isLoading) return <LoadingSpinner></LoadingSpinner>; 

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        Payment Successful!
      </h2>
      <p className="mb-6">Thank you for your payment.</p>
      {application && (
        <div className="mb-4 text-center border p-4 py-4 rounded shadow-sm">
          <p><strong>University:</strong> {application.universityName}</p>
          <p><strong>Scholarship:</strong> {application.scholarshipName}</p>
          <p><strong>Amount Paid:</strong> ${application.applicationFees || "N/A"}</p>
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
