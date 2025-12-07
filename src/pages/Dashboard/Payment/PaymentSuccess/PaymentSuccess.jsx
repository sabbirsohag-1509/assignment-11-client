import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();

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
    
   

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h2 className="text-2xl font-semibold mb-4 text-green-600">
        Payment Successful!
      </h2>
      <p className="mb-6">Thank you for your payment.</p>

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
