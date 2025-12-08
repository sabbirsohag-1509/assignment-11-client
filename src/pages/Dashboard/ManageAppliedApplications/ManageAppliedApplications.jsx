import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import Modal from "react-modal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const ManageAppliedApplications = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const axiosSecure = useAxiosSecure();

  const openDetailsModal = (app) => {
    setSelectedApplication(app);
    setModalOpen(true);
  };

  const openFeedbackModal = (app) => {
    setSelectedApplication(app);
    setFeedbackModalOpen(true);
  };

  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="p-4 lg:p-6">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center md:text-left">
        Manage Applied Applications({applications.length})
      </h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">Applicant Name</th>
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
                <td className="border px-3 py-2">{app.feedback || "N/A"}</td>
                <td className="border px-3 py-2">{app.applicationStatus}</td>
                {/* <td className="border px-3 py-2">{app.paymentStatus}</td> */}
                { 
                  app.paymentStatus === "paid" ? (
                    <td className="border px-3 py-2 text-green-600 font-semibold">paid</td>
                  ) : (
                    <td className="border px-3 py-2 text-red-600 font-semibold">unpaid</td>
                  )
                }

                {/* Responsive Actions */}
                <td className="border px-3 py-2 space-y-2 md:space-y-0 md:space-x-2 flex flex-col md:flex-row justify-center items-center">
                  <button
                    className="btn btn-sm btn-info w-full md:w-auto"
                    onClick={() => openDetailsModal(app)}
                  >
                    Details
                  </button>

                  <button
                    className="btn btn-sm btn-primary w-full md:w-auto"
                    onClick={() => openFeedbackModal(app)}
                  >
                    Feedback
                  </button>

                  <select className="border px-2 py-1 rounded w-full md:w-auto">
                    <option value="">Update Status</option>
                    <option value="processing">Processing</option>
                    <option value="completed">Completed</option>
                  </select>

                  <button className="btn btn-sm btn-error w-full md:w-auto">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Application Details"
        className="bg-white p-6 rounded-xl w-[95%] md:w-[70%] lg:w-[50%] mx-auto mt-20 shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start md:items-center"
      >
        {selectedApplication && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-4 text-center">
              Application Details
            </h3>

            <div className="space-y-2 text-sm md:text-base">
              <p><strong>Name:</strong> {selectedApplication.userName}</p>
              <p><strong>Email:</strong> {selectedApplication.userEmail}</p>
              <p><strong>University:</strong> {selectedApplication.universityName}</p>
              <p><strong>Scholarship:</strong> {selectedApplication.scholarshipName}</p>
              <p><strong>Status:</strong> {selectedApplication.applicationStatus}</p>
              <p><strong>Payment:</strong> {selectedApplication.paymentStatus}</p>
              <p><strong>Feedback:</strong> {selectedApplication.feedback || "N/A"}</p>
            </div>

            <button
              className="btn btn-sm btn-primary w-full mt-4"
              onClick={() => setModalOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Feedback Modal */}
      <Modal
        isOpen={feedbackModalOpen}
        onRequestClose={() => setFeedbackModalOpen(false)}
        contentLabel="Add Feedback"
        className="bg-white p-6 rounded-xl w-[95%] md:w-[70%] lg:w-[50%] mx-auto mt-20 shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start md:items-center"
      >
        {selectedApplication && (
          <div>
            <h3 className="text-xl font-bold mb-4 text-center">Add Feedback</h3>
            <p className="mb-2 text-center">
              <strong>Applicant:</strong> {selectedApplication.userName}
            </p>

            <textarea
              className="w-full border p-3 h-32 rounded-lg mb-4 focus:outline-none focus:ring"
              placeholder="Write feedback here..."
            ></textarea>

            <div className="flex justify-end gap-3">
              <button
                className="btn btn-sm btn-secondary btn-outline"
                onClick={() => setFeedbackModalOpen(false)}
              >
                Cancel
              </button>

              <button className="btn btn-sm btn-primary">Submit</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ManageAppliedApplications;
