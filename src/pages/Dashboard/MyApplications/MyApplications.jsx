import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);
  const [reviewApp, setReviewApp] = useState(null);
  const [editApp, setEditApp] = useState(null);
  const { user } = useAuth();
  const [rating, setRating] = useState(0);

  const {
    data: apps = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  // DELETE
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This application will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/applications/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Application has been removed.", "success");
          refetch();
        }
      }
    });
  };

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;
    const phone = form.phone.value;
    const address = form.address.value;

    const updatedData = { phone, address };

    try {
      const res = await axiosSecure.patch(
        `/applications/${editApp._id}`,
        updatedData
      );
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", "Application updated successfully!", "success");
        setEditApp(null);
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update application", "error");
    }
  };

  // REVIEW
  const submitReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    const reviewData = {
      applicationId: reviewApp._id,
      scholarshipId: reviewApp.scholarshipId,
      universityName: reviewApp.universityName,
      scholarshipName: reviewApp.scholarshipName,
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      ratingPoint: rating,
      reviewComment: comment,
      reviewDate: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", reviewData);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setReviewApp(null);
        refetch();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <title> 
        My Applications - Scholarship Portal
      </title>
      <h2 className="text-2xl font-semibold mb-4">
        My Applications ({apps.length})
      </h2>
      {/* TABLE */}
      <div className="overflow-x-auto">
  <table className="table table-zebra w-full">
    <thead>
      <tr>
        <th></th>
        <th>University</th>
        <th>Address</th>
        <th>Subject</th>
        <th>Fees</th>
        <th>Status</th>
        <th>Feedback</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {apps.map((app, index) => (
        <tr key={app._id}>
          <th>{index + 1}</th>

          <td>{app.universityName}</td>
          <td>{app.address}</td>
          <td>{app.subjectCategory}</td>
          <td>${app.applicationFees}</td>

          <td>
            <span
              className={`px-2 py-1 rounded text-white ${
                app.applicationStatus === "pending"
                  ? "bg-yellow-500"
                  : app.applicationStatus === "processing"
                  ? "bg-blue-500"
                  : app.applicationStatus === "completed"
                  ? "bg-green-600"
                  : "bg-red-600"
              }`}
            >
              {app.applicationStatus}
            </span>
          </td>

          <td>{app.feedback || "—"}</td>

          <td className="flex gap-2 flex-wrap py-4">
            <button
              className="btn btn-xs btn-info"
              onClick={() => setSelectedApp(app)}
            >
              Details
            </button>

            {app.applicationStatus === "pending" && (
              <button
                className="btn btn-xs btn-warning"
                onClick={() => setEditApp(app)}
              >
                Edit
              </button>
            )}

            {app.applicationStatus === "pending" &&
              app.paymentStatus === "unpaid" && (
                <Link
                  to={`/dashboard/payment/${app.scholarshipId}/${app._id}`}
                  className="btn btn-xs bg-red-600 text-white"
                >
                  Pay
                </Link>
              )}

            {app.applicationStatus === "pending" && (
              <button
                className="btn btn-xs btn-error"
                onClick={() => handleDelete(app._id)}
              >
                Delete
              </button>
            )}

            {app.applicationStatus === "completed" && (
              <button
                className="btn btn-xs btn-success"
                onClick={() => setReviewApp(app)}
              >
                Add Review
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* Modals (Details / Edit / Review) */}
      {selectedApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-semibold mb-2">Application Details</h3>
            <p>
              <strong>University:</strong> {selectedApp.universityName}
            </p>
            <p>
              <strong>Subject:</strong> {selectedApp.subjectCategory}
            </p>
            <p>
              <strong>Degree:</strong> {selectedApp.degree}
            </p>
            <p>
              <strong>Fees:</strong> ${selectedApp.applicationFees}
            </p>
            <p>
              <strong>Status:</strong> {selectedApp.applicationStatus}
            </p>
            <p>
              <strong>Phone:</strong> {selectedApp.phone}
            </p>
            <p>
              <strong>Description:</strong> {selectedApp.description}
            </p>
            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedApp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
      {editApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-semibold mb-3">Edit Application</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <label className="label">Phone</label>
                <input
                  name="phone"
                  defaultValue={editApp.phone}
                  className="input input-bordered w-full"
                  required
                />
              </div>
              <div>
                <label className="label">Address</label>
                <textarea
                  name="address"
                  defaultValue={editApp.address}
                  className="textarea input-bordered w-full"
                  rows={4}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Update
              </button>
            </form>
            <div className="modal-action">
              <button className="btn" onClick={() => setEditApp(null)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
      {/* REVIEW MODAL */}
      ...
      {reviewApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-semibold">Add Review</h3>

            <form
              onSubmit={(e) => {
                submitReview(e);
                setRating(0);
              }}
              className="space-y-4 mt-4"
            >
              {/* Custom Star Rating */}
              <div>
                <label className="label">Rating (1-5)</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-3xl cursor-pointer ${
                        star <= rating ? "text-yellow-500" : "text-gray-400"
                      } transition-colors duration-200`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                <input type="hidden" name="rating" value={rating} required />
              </div>

              {/* Review Text */}
              <div>
                <label className="label">Write Your Review</label>
                <textarea
                  name="comment"
                  className="textarea textarea-bordered w-full"
                  rows={3}
                  placeholder="Write review..."
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Submit Review
              </button>
            </form>

            <div className="modal-action">
              <button
                className="btn"
                onClick={() => {
                  setReviewApp(null);
                  setRating(0);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyApplications;
