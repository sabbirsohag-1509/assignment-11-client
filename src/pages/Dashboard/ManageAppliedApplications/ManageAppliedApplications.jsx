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

  //Data fetching
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data;
    },
  });
  console.log(applications);

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Applied Applications</h2>

      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Applicant Name</th>
            <th className="border px-4 py-2">Applicant Email</th>
            <th className="border px-4 py-2">University Name</th>
            <th className="border px-4 py-2">Feedback</th>
            <th className="border px-4 py-2">Application Status</th>
            <th className="border px-4 py-2">Payment Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app._id}>
              <td className="border px-4 py-2">{app.userName}</td>
              <td className="border px-4 py-2">{app.userEmail}</td>
              <td className="border px-4 py-2">{app.universityName}</td>
              <td className="border px-4 py-2">{app.feedback || "N/A"}</td>
              <td className="border px-4 py-2">{app.applicationStatus}</td>
              <td className="border px-4 py-2">{app.paymentStatus}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  className="btn btn-sm btn-info"
                  onClick={() => openDetailsModal(app)}
                >
                  Details
                </button>

                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => openFeedbackModal(app)}
                >
                  Feedback
                </button>

                <select className="border px-2 py-1 rounded">
                  <option value="">Update Status</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                </select>

                <button className="btn btn-sm btn-error">Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Details Modal */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Application Details"
        className="p-6 bg-white max-w-lg mx-auto mt-20 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start"
      >
        {selectedApplication && (
          <div>
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <p>
              <strong>Applicant Name:</strong>{" "}
              {selectedApplication.applicantName}
            </p>
            <p>
              <strong>Email:</strong> {selectedApplication.applicantEmail}
            </p>
            <p>
              <strong>University:</strong> {selectedApplication.universityName}
            </p>
            <p>
              <strong>Scholarship:</strong>{" "}
              {selectedApplication.scholarshipName}
            </p>
            <p>
              <strong>Status:</strong> {selectedApplication.applicationStatus}
            </p>
            <p>
              <strong>Payment:</strong> {selectedApplication.paymentStatus}
            </p>
            <p>
              <strong>Feedback:</strong> {selectedApplication.feedback || "N/A"}
            </p>
            <button
              className="btn btn-sm btn-secondary mt-4"
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
        className="p-6 bg-white max-w-lg mx-auto mt-20 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start"
      >
        {selectedApplication && (
          <div>
            <h3 className="text-xl font-bold mb-4">Add Feedback</h3>
            <p>
              <strong>Applicant:</strong> {selectedApplication.applicantName}
            </p>
            <textarea
              className="w-full border p-2 rounded mb-2"
              placeholder="Write feedback here..."
            ></textarea>
            <input
              type="number"
              min="1"
              max="5"
              placeholder="Rating (1-5)"
              className="border p-2 rounded mb-2"
            />
            <div className="flex justify-end space-x-2">
              <button
                className="btn btn-sm btn-secondary"
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
