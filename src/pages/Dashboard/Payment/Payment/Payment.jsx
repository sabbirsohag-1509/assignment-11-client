import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import LoadingSpinner from "../../../../components/LoadingSpinner/LoadingSpinner";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Payment = () => {
  const { scholarshipId, applicationId } = useParams();

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch scholarship data
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships/${scholarshipId}`);
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const handlePaymentBtn = async() => {
    const paymentInfo = {
      scholarshipId: scholarship._id,
      applicationId: applicationId,
      universityName: scholarship.universityName,
      scholarshipName: scholarship.scholarshipName,
      applicationFees: scholarship.applicationFees,
      userEmail: user?.email,
      userName: user?.displayName,
      userImage: user?.photoURL,
      };
    //   console.log("Payment Info:", paymentInfo);
    const res = await axiosSecure.post("/create-checkout-session", paymentInfo);
      // console.log("Payment Response:", res.data.url);
      if (res.data.url) {
        window.location.href = res.data.url;
      } 
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Payment for Scholarship
      </h2>

      <div className="border rounded-lg p-6 shadow bg-white space-y-4">
        {/* Scholarship Info */}
        <div className="py-2">
          <h3 className="text-lg font-semibold mb-2">Scholarship Details-</h3>

          <p className="font-semibold mb-1">
            <strong>University:</strong> {scholarship.universityName}
          </p>
          <p className="mb-1">
            <strong>Scholarship Name:</strong> {scholarship.scholarshipName}
          </p>
          <p className="mb-1">
            <strong>Subject:</strong> {scholarship.subjectCategory}
          </p>
          <p className="mb-1">
            <strong>Application Fee:</strong> ${scholarship.applicationFees}
          </p>
        </div>

        {/* Student Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Student Information-</h3>
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        {/* Pay Button */}
        <button onClick={handlePaymentBtn} className="btn btn-primary w-full">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
