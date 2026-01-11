import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit, FaTrash } from "react-icons/fa";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { Link } from "react-router";
import Swal from "sweetalert2";

const ManageScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: scholarships = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  //delete handler
  const deleteBtnHandler = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/scholarships/${id}`);

          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Scholarship has been deleted.", "success");

            refetch();
          }
        } catch (error) {
          console.error("Error deleting scholarship:", error);
          Swal.fire("Error", "Failed to delete scholarship!", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="p-4 sm:p-6">
      <title>Dashboard - Manage Scholarships</title>

      {/* Header Section */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold card-text-primary mb-2">
          Manage Scholarships
        </h2>
        <p className="card-text-secondary text-sm sm:text-base">
          Total Scholarships:{" "}
          <span className="font-semibold text-primary">
            {scholarships.length}
          </span>
        </p>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg border border-base-300">
        <table className="min-w-full">
          <thead className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
            <tr>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                #
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Scholarship Name
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                University
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Category
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Degree
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Deadline
              </th>
              <th className="py-4 px-4 text-center card-text-primary font-bold text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {scholarships.map((sch, indx) => (
              <tr
                key={sch._id}
                className="border-b border-base-300 hover:bg-primary/5 transition-colors duration-200"
              >
                <td className="py-4 px-4 card-text-secondary font-medium">
                  {indx + 1}.
                </td>
                <td className="py-4 px-4 card-text-primary font-semibold">
                  {sch.scholarshipName}
                </td>
                <td className="py-4 px-4 card-text-secondary">
                  {sch.universityName}
                </td>
                <td className="py-4 px-4">
                  <span className="badge badge-primary badge-sm">
                    {sch.scholarshipCategory}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span className="badge badge-outline badge-sm">
                    {sch.degree}
                  </span>
                </td>
                <td className="py-4 px-4 card-text-secondary text-sm">
                  {new Date(sch.applicationDeadline).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }
                  )}
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2 justify-center flex-wrap">
                    <Link
                      to={`/dashboard/update-scholarship/${sch._id}`}
                      className="btn btn-sm btn-warning hover:btn-warning/80 text-white flex items-center gap-1 transition-all"
                    >
                      <FaEdit size={14} />
                      <span className="hidden sm:inline">Update</span>
                    </Link>
                    <button
                      onClick={() => deleteBtnHandler(sch._id)}
                      className="btn btn-sm btn-error hover:btn-error/80 text-white flex items-center gap-1 transition-all"
                    >
                      <FaTrash size={14} />
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {scholarships.length === 0 && (
        <div className="text-center py-12">
          <p className="card-text-secondary text-lg">No scholarships found.</p>
        </div>
      )}
    </div>
  );
};

export default ManageScholarships;
