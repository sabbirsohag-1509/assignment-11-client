import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Modal from "react-modal";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ManageAppliedApplications = () => {
  const axiosSecure = useAxiosSecure();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const [detailsModal, setDetailsModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);

  // Fetch All Applications
  const { data: applications = [], isLoading, refetch } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data;
    },
  });

  // DETAILS MODAL OPEN
  const openDetails = (app) => {
    setSelectedApp(app);
    setDetailsModal(true);
  };

  // FEEDBACK MODAL OPEN
  const openFeedback = (app) => {
    setSelectedApp(app);
    setFeedbackText(app.feedback || "");
    setFeedbackModal(true);
  };

  //Feedback Submit Handler
  const handleFeedbackSubmit = async () => {
    const payload = { feedback: feedbackText };

    const res = await axiosSecure.patch(
      `/applications/moderator/${selectedApp._id}`,
      payload
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Success!", "Feedback submitted", "success");
      setFeedbackModal(false);
      refetch();
    }
  };

  // Status Change Handler
  const handleStatusChange = async (id, newStatus) => {
    if (!newStatus) return;

    const payload = { applicationStatus: newStatus };

    const res = await axiosSecure.patch(
      `/applications/moderator/${id}`,
      payload
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire("Updated!", `Status changed to ${newStatus}`, "success");
      refetch();
    }
  };

  //  Cancel application Handler
  const handleCancel = async (id) => {
    const res = await axiosSecure.patch(`/applications/moderator/${id}`, {
      applicationStatus: "rejected",
    });

    if (res.data.modifiedCount > 0) {
      Swal.fire("Cancelled!", "Application rejected", "success");
      refetch();
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        Manage Applied Applications ({applications.length})
      </h2>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Name</th>
              <th className="border px-3 py-2">Email</th>
              <th className="border px-3 py-2">University</th>
              <th className="border px-3 py-2">Feedback</th>
              <th className="border px-3 py-2">Status</th>
              <th className="border px-3 py-2">Payment</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.map((app) => (
              <tr key={app._id} className="text-center">
                <td className="border px-3 py-2">{app.userName}</td>
                <td className="border px-3 py-2">{app.userEmail}</td>
                <td className="border px-3 py-2">{app.universityName}</td>
                <td className="border px-3 py-2">{app.feedback || "—"}</td>

                <td className="border px-3 py-2">
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

                <td
                  className={`border px-3 py-2 font-semibold ${
                    app.paymentStatus === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {app.paymentStatus}
                </td>

                {/* ACTIONS */}
                <td className="border px-3 py-2 flex flex-col md:flex-row gap-2">
                  <button
                    onClick={() => openDetails(app)}
                    className="btn btn-xs btn-info"
                  >
                    Details
                  </button>

                  <button
                    onClick={() => openFeedback(app)}
                    className="btn btn-xs btn-primary"
                  >
                    Feedback
                  </button>

                  <select
                    className="border px-2 py-1 rounded"
                    onChange={(e) =>
                      handleStatusChange(app._id, e.target.value)
                    }
                  >
                    <option value="">Update Status</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button
                    onClick={() => handleCancel(app._id)}
                    className="btn btn-xs btn-error"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DETAILS MODAL */}
      <Modal
        isOpen={detailsModal}
        onRequestClose={() => setDetailsModal(false)}
        className="bg-white p-6 rounded-xl w-[95%] md:w-[60%] mx-auto mt-20 shadow-xl"
          overlayClassName="fixed inset-0 ml:0 md:ml-20 lg:ml-28 bg-black/20 backdrop-blur-none flex items-center justify-center"
      >
        {selectedApp && (
          <div>
            <h3 className="text-xl font-bold mb-3 text-center">
              Application Details
            </h3>

            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {selectedApp.userName}</p>
              <p><strong>Email:</strong> {selectedApp.userEmail}</p>
              <p><strong>University:</strong> {selectedApp.universityName}</p>
              <p><strong>Scholarship:</strong> {selectedApp.scholarshipName}</p>
              <p><strong>Status:</strong> {selectedApp.applicationStatus}</p>
              <p><strong>Payment:</strong> {selectedApp.paymentStatus}</p>
              <p><strong>Feedback:</strong> {selectedApp.feedback || "—"}</p>
            </div>

            <button
              className="btn btn-sm btn-primary w-full mt-4"
              onClick={() => setDetailsModal(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* FEEDBACK MODAL */}
      <Modal
        isOpen={feedbackModal}
        onRequestClose={() => setFeedbackModal(false)}
        className="bg-white   p-6 rounded-xl w-[95%] md:w-[60%] mx-auto mt-20 shadow-xl"
         overlayClassName="fixed inset-0 ml:0 md:ml-20 lg:ml-28 bg-black/20 backdrop-blur-none flex items-center justify-center"
      >
        <h3 className="text-xl font-semibold mb-3 text-center">
          Add Feedback
        </h3>

        <textarea
          className="w-full border p-3 h-32 rounded-lg"
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
        ></textarea>

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="btn btn-sm"
            onClick={() => setFeedbackModal(false)}
          >
            Cancel
          </button>

          <button
            className="btn btn-sm btn-primary"
            onClick={handleFeedbackSubmit}
          >
            Submit
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageAppliedApplications;
