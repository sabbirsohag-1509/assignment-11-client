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
  const { user } = useAuth();

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

  //update btnHandler

  //DELETEbtnHandler
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

  //SUBMIT REVIEW
  const submitReview = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    const payload = {
      applicationId: reviewApp._id,
      scholarshipId: reviewApp.scholarshipId,
      rating,
      comment,
    };

    try {
      const res = await axiosSecure.post("/reviews", payload);
      if (res.data.insertedId) {
        Swal.fire("Thank you!", "Your review has been submitted.", "success");
        setReviewApp(null);
      }
    } catch (err) {
      console.error("Review Submission Error:", err);
      Swal.fire("Error", "Failed to submit review", "error");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">
        My Applications ({apps.length})
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
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
            {apps.map((app) => (
              <tr key={app._id} className="hover:bg-gray-50">
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

                <td className="flex gap-2 flex-wrap">
                  {/* Details */}
                  <button
                    className="btn btn-xs btn-info"
                    onClick={() => setSelectedApp(app)}
                  >
                    Details
                  </button>

                  {/* Edit — Only pending */}
                  {app.applicationStatus === "pending" && (
                    <button className="btn btn-xs btn-warning">Edit</button>
                  )}

                  {/* Pay — only pending + unpaid */}
                  {app.applicationStatus === "pending" &&
                    app.paymentStatus === "unpaid" && (
                      <>
                        <Link
                          to={`/dashboard/payment/${app.scholarshipId}/${app._id}`}
                          className="btn btn-xs bg-red-600 text-white"
                        >
                          Pay
                        </Link>
                      </>
                    )}

                  {/* Delete — only pending */}
                  {app.applicationStatus === "pending" && (
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(app._id)}
                    >
                      Delete
                    </button>
                  )}

                  {/* Add Review — only completed */}
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

      {/* DETAILS MODAL*/}
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

      {/*REVIEW MODAL*/}
      {reviewApp && (
        <dialog open className="modal">
          <div className="modal-box max-w-lg">
            <h3 className="text-xl font-semibold">Add Review</h3>

            <form onSubmit={submitReview} className="space-y-4 mt-4">
              <div>
                <label className="label">Rating (1-5)</label>
                <input
                  type="number"
                  name="rating"
                  min="1"
                  max="5"
                  security="1"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">Comment</label>
                <textarea
                  name="comment"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-full">
                Submit Review
              </button>
            </form>

            <div className="modal-action">
              <button className="btn" onClick={() => setReviewApp(null)}>
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
