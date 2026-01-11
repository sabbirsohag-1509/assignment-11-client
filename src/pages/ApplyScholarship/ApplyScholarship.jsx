import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../hooks/useAuth";

const ApplyScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [scholarship, setScholarship] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  //   console.log("User Info:", user?.uid, user?.displayName, user?.email);
  // console.log("Scholarship ID from Params:", id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch scholarship details
  useEffect(() => {
    axiosSecure
      .get(`/scholarships/${id}`)
      .then((res) => {
        setScholarship(res.data);
        reset({
          userName: user?.displayName,
          userEmail: user?.email,
          phone: "",
          address: "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch scholarship data", "error");
      });
  }, [id, axiosSecure, reset, user]);

 const onSubmit = async (formData) => {
  if (!scholarship) return;

  const applicationData = {
    scholarshipId: scholarship._id,
    scholarshipUserId: user?.uid,
    scholarshipName: scholarship.scholarshipName,
    universityName: scholarship.universityName,
    degree: scholarship.degree,
    subjectCategory: scholarship.subjectCategory,
    applicationFees: scholarship.applicationFees,
    description: scholarship.description,
    userName: formData.userName,
    userEmail: formData.userEmail,
    phone: formData.phone,
    address: formData.address,
  };

  try {
    const res = await axiosSecure.post("/applications", applicationData);

    if (res.data.insertedId) {
      const applicationId = res.data.insertedId;

      const stripeRes = await axiosSecure.post("/create-checkout-session", {
        applicationId,
        scholarshipId: scholarship._id,
        applicationFees: scholarship.applicationFees + scholarship.serviceCharge,
        universityName: scholarship.universityName,
        scholarshipName: scholarship.scholarshipName,
      });

      if (stripeRes.data.url) {
        window.location.href = stripeRes.data.url;
      }
    }
  } catch (error) {
    console.error(error);
    Swal.fire("Error", "Failed to submit application or start payment", "error");
  }
};


  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Apply for Scholarship</h2>

      <div className="mb-6 p-4 bg-base-100 rounded">
        <h3 className="font-semibold">{scholarship.scholarshipName}</h3>
        <p>
          <strong>University:</strong> {scholarship.universityName}
        </p>
        <p>
          <strong>Degree:</strong> {scholarship.degree}
        </p>
        <p>
          <strong>Application Fees:</strong> ${scholarship.applicationFees}
        </p>
        <p>
          <strong>Service Charge:</strong> ${scholarship.serviceCharge}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Full Name *</span>
          </label>
          <input
            type="text"
            readOnly
            className="input input-bordered w-full"
            {...register("userName", { required: "Full name is required" })}
          />
          {errors.userName && (
            <p className="text-red-600">{errors.userName.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email *</span>
          </label>
          <input
            type="email"
            readOnly
            className="input input-bordered w-full"
            {...register("userEmail", { required: "Email is required" })}
          />
          {errors.userEmail && (
            <p className="text-red-600">{errors.userEmail.message}</p>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("phone")}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Address</span>
          </label>
          <textarea
            className="textarea textarea-bordered w-full"
            rows={3}
            {...register("address")}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary ${isSubmitting ? "opacity-70" : ""}`}
        >
          {isSubmitting ? "Submitting..." : "Apply Now"}
        </button>
      </form>
    </div>
  );
};

export default ApplyScholarship;
