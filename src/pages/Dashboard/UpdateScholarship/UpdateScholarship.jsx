import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const UpdateScholarship = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetching
  useEffect(() => {
    axiosSecure
      .get(`/scholarships/${id}`)
      .then((res) => {
        const data = res.data;
        reset({
          ...data,
          Email: data.Email || data.postedUserEmail || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        Swal.fire("Error", "Failed to fetch scholarship data", "error");
      });
  }, [id, axiosSecure, reset]);

  // handleUpdateBtn
  const handleUpdate = async (formData) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to update this scholarship.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!",
    }).then(async (result) => {
      const updateData = {
        scholarshipName: formData.scholarshipName,
        universityName: formData.universityName,
        universityImage: formData.universityImage,
        universityCountry: formData.universityCountry,
        universityCity: formData.universityCity,
        universityWorldRank: Number(formData.universityWorldRank),
        subjectCategory: formData.subjectCategory,
        scholarshipCategory: formData.scholarshipCategory,
        degree: formData.degree,
        tuitionFees: Number(formData.tuitionFees),
        applicationFees: Number(formData.applicationFees),
        serviceCharge: Number(formData.serviceCharge),
        applicationDeadline: formData.applicationDeadline,
        Email: formData.postedUserEmail,
        description: formData.description,
        stipend: formData.stipend,
      };
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/scholarships/${id}`,
            updateData
          );

          if (res.data.modifiedCount > 0) {
            Swal.fire(
              "Updated!",
              "Scholarship updated successfully.",
              "success"
            );
            navigate("/dashboard/manage-scholarship");
          }
        } catch (error) {
          console.error(error);
          Swal.fire("Error", "Failed to update scholarship.", "error");
        }
      }
    });
  };

  if (loading) return <LoadingSpinner></LoadingSpinner>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Update Scholarship</h2>

      <form onSubmit={handleSubmit(handleUpdate)} className="space-y-4">
        {/* Scholarship Name */}
        <div>
          <label className="label">
            <span className="label-text">Scholarship Name *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("scholarshipName", {
              required: "Scholarship name is required",
            })}
          />
          {errors.scholarshipName && (
            <p className="text-red-600">{errors.scholarshipName.message}</p>
          )}
        </div>

        {/* University Name */}
        <div>
          <label className="label">
            <span className="label-text">University Name *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("universityName", {
              required: "University name is required",
            })}
          />
          {errors.universityName && (
            <p className="text-red-600">{errors.universityName.message}</p>
          )}
        </div>

        {/* University Image */}
        <div>
          <label className="label">
            <span className="label-text">University Image URL *</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("universityImage", {
              required: "University image is required",
            })}
          />
          {errors.universityImage && (
            <p className="text-red-600">{errors.universityImage.message}</p>
          )}
        </div>

        {/* Country & City */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Country *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("universityCountry", {
                required: "Country is required",
              })}
            />
            {errors.universityCountry && (
              <p className="text-red-600">{errors.universityCountry.message}</p>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">City *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("universityCity", { required: "City is required" })}
            />
            {errors.universityCity && (
              <p className="text-red-600">{errors.universityCity.message}</p>
            )}
          </div>
        </div>

        {/* World Rank, Subject, Scholarship Category */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">World Rank *</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("universityWorldRank", {
                required: "World rank is required",
                min: 1,
              })}
            />
            {errors.universityWorldRank && (
              <p className="text-red-600">
                {errors.universityWorldRank.message}
              </p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Subject Category *</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("subjectCategory", {
                required: "Subject category is required",
              })}
            />
            {errors.subjectCategory && (
              <p className="text-red-600">{errors.subjectCategory.message}</p>
            )}
          </div>

          <div>
            <label className="label">
              <span className="label-text">Scholarship Category *</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("scholarshipCategory", { required: true })}
            >
              <option value="">Select Category</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
            {errors.scholarshipCategory && (
              <p className="text-red-600">Select a valid category</p>
            )}
          </div>
        </div>

        {/* Degree, Tuition, Application Fees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Degree *</span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("degree", { required: true })}
            >
              <option value="">Select Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
            {errors.degree && <p className="text-red-600">Select a degree</p>}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Tuition Fees (optional)</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("tuitionFees")}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Application Fees *</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("applicationFees", { required: true, min: 0 })}
            />
          </div>
        </div>

        {/* Service Charge & Deadline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Service Charge *</span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full"
              {...register("serviceCharge", { required: true, min: 0 })}
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Application Deadline *</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("applicationDeadline", { required: true })}
            />
          </div>
        </div>

        {/* Description & Stipend */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full"
              {...register("description")}
              rows={5}
            ></textarea>
          </div>
          <div>
            <label className="label">
              <span className="label-text">Stipend</span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              {...register("stipend")}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">Email *</span>
          </label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("Email", { required: true })}
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary ${isSubmitting ? "opacity-70" : ""}`}
          >
            {isSubmitting ? "Updating..." : "Update Scholarship"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateScholarship;
