import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleAddBtn = async (formData) => {
    // console.log('add form',formData);
    const formDataInfo = {
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
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to add a new scholarship.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .post("/scholarships", formDataInfo)
          .then((response) => {
            if (response.data.insertedId) {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Scholarship Added Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
            }
          })
          .catch((error) => {
            console.error("Error adding scholarship:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "There was an issue adding the scholarship. Please try again.",
            });
          });
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-base-100 rounded-lg shadow-md">
      <title> 
        Dashboard - Add Scholarship
      </title>
      <h2 className="text-2xl font-semibold mb-4">Add Scholarship</h2>

      <form onSubmit={handleSubmit(handleAddBtn)} className="space-y-4">
        {/* scholarshipName */}
        <div>
          <label className="label">
            <span className="label-text">Scholarship Name *</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Global Excellence Scholarship"
            className="input input-bordered w-full"
            {...register("scholarshipName", {
              required: "Scholarship name is required",
            })}
          />
          {errors.scholarshipName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.scholarshipName.message}
            </p>
          )}
        </div>

        {/* universityName */}
        <div>
          <label className="label">
            <span className="label-text">University Name *</span>
          </label>
          <input
            type="text"
            placeholder="e.g., University of Oxford"
            className="input input-bordered w-full"
            {...register("universityName", {
              required: "University name is required",
            })}
          />
          {errors.universityName && (
            <p className="text-sm text-red-600 mt-1">
              {errors.universityName.message}
            </p>
          )}
        </div>

        {/* universityImage (URL) */}
        <div>
          <label className="label">
            <span className="label-text">University Image URL *</span>
          </label>
          <input
            type="text"
            placeholder="Your selected University image URL"
            className="input input-bordered w-full"
            {...register("universityImage", {
              required: "University image URL is required",
              pattern: {
                message: "Enter a valid image URL )",
              },
            })}
          />
          {errors.universityImage && (
            <p className="text-sm text-red-600 mt-1">
              {errors.universityImage.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div>
            <label className="label">
              <span className="label-text">Country *</span>
            </label>
            <input
              type="text"
              placeholder="e.g., United Kingdom"
              className="input input-bordered w-full"
              {...register("universityCountry", {
                required: "Country is required",
              })}
            />
            {errors.universityCountry && (
              <p className="text-sm text-red-600 mt-1">
                {errors.universityCountry.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="label">
              <span className="label-text">City *</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Oxford"
              className="input input-bordered w-full"
              {...register("universityCity", { required: "City is required" })}
            />
            {errors.universityCity && (
              <p className="text-sm text-red-600 mt-1">
                {errors.universityCity.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* World Rank */}
          <div>
            <label className="label">
              <span className="label-text">World Rank *</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 5"
              className="input input-bordered w-full"
              {...register("universityWorldRank", {
                required: "World rank is required",
                min: { value: 1, message: "Rank must be >= 1" },
              })}
            />
            {errors.universityWorldRank && (
              <p className="text-sm text-red-600 mt-1">
                {errors.universityWorldRank.message}
              </p>
            )}
          </div>

          {/* Subject Category */}
          <div>
            <label className="label">
              <span className="label-text">Subject Category *</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Computer Science"
              className="input input-bordered w-full"
              {...register("subjectCategory", {
                required: "Subject category is required",
              })}
            />
            {errors.subjectCategory && (
              <p className="text-sm text-red-600 mt-1">
                {errors.subjectCategory.message}
              </p>
            )}
          </div>

          {/* Scholarship Category */}
          <div>
            <label className="label">
              <span className="label-text">Scholarship Category *</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("scholarshipCategory", {
                required: "Select a category",
              })}
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>
            {errors.scholarshipCategory && (
              <p className="text-sm text-red-600 mt-1">
                {errors.scholarshipCategory.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Degree */}
          <div>
            <label className="label">
              <span className="label-text">Degree *</span>
            </label>
            <select
              className="select select-bordered w-full"
              defaultValue=""
              {...register("degree", { required: "Select degree" })}
            >
              <option value="" disabled>
                Select degree
              </option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>
            {errors.degree && (
              <p className="text-sm text-red-600 mt-1">
                {errors.degree.message}
              </p>
            )}
          </div>

          {/* Tuition Fees*/}
          <div>
            <label className="label">
              <span className="label-text">Tuition Fees (optional)</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 15000"
              className="input input-bordered w-full"
              {...register("tuitionFees")}
            />
          </div>

          {/* Application Fees */}
          <div>
            <label className="label">
              <span className="label-text">Application Fees *</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 50"
              className="input input-bordered w-full"
              {...register("applicationFees", {
                required: "Application fees required",
                min: { value: 0, message: "Must be >= 0" },
              })}
            />
            {errors.applicationFees && (
              <p className="text-sm text-red-600 mt-1">
                {errors.applicationFees.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Service Charge */}
          <div>
            <label className="label">
              <span className="label-text">Service Charge *</span>
            </label>
            <input
              type="number"
              placeholder="e.g., 10"
              className="input input-bordered w-full"
              {...register("serviceCharge", {
                required: "Service charge is required",
                min: { value: 0, message: "Must be >= 0" },
              })}
            />
            {errors.serviceCharge && (
              <p className="text-sm text-red-600 mt-1">
                {errors.serviceCharge.message}
              </p>
            )}
          </div>

          {/* Application Deadline */}
          <div>
            <label className="label">
              <span className="label-text">Application Deadline *</span>
            </label>
            <input
              type="date"
              className="input input-bordered w-full"
              {...register("applicationDeadline", {
                required: "Deadline is required",
              })}
            />
            {errors.applicationDeadline && (
              <p className="text-sm text-red-600 mt-1">
                {errors.applicationDeadline.message}
              </p>
            )}
          </div>
        </div>
        {/* Description and Stipend  */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              {...register("description")}
              placeholder="Write a detailed description of the scholarship"
              className="textarea textarea-bordered w-full"
              rows={5}
            ></textarea>
          </div>
          {/* stipend  */}
          <div>
            <label className="label">
              <span className="label-text">Stipend</span>
            </label>
            <input
              {...register("stipend")}
              type="text"
              placeholder="e.g. $800 per month or Full fund"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text"> Email *</span>
          </label>
          <input
            type="email"
            defaultValue={user.email}
            className="input input-bordered w-full"
            {...register("postedUserEmail", {
              required: "Student email is required",
              pattern: { message: "Enter a valid email Please" },
            })}
          />
          {errors.postedUserEmail && (
            <p className="text-sm text-red-600 mt-1">
              {errors.postedUserEmail.message}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`btn btn-primary ${isSubmitting ? "opacity-70" : ""}`}
          >
            {isSubmitting ? "Saving..." : "Add Scholarship"}
          </button>

          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-ghost"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
