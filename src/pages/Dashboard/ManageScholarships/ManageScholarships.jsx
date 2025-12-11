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
    <div className="p-6">
      <title> 
        Dashboard - Manage Scholarships
      </title>
      <h2 className="text-2xl font-bold mb-6">
        Manage Scholarships({scholarships.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">University</th>
              <th className="py-3 px-4 text-left">Category</th>
              <th className="py-3 px-4 text-left">Degree</th>
              <th className="py-3 px-4 text-left">Deadline</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {scholarships.map((sch, indx) => (
              <tr key={sch._id} className="border-b hover:bg-gray-50">

                <td className="py-3 px-4 ">{indx + 1}.</td>
                <td className="py-3 px-4 ">{sch.scholarshipName}</td>
                <td className="py-3 px-4 ">{sch.universityName}</td>
                <td className="py-3 px-4 ">{sch.scholarshipCategory}</td>
                <td className="py-3 px-4 ">{sch.degree}</td>
                <td className="py-3 px-4 ">
                  {new Date(sch.applicationDeadline).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <Link
                    to={`/dashboard/update-scholarship/${sch._id}`}
                    className="btn btn-sm btn-warning flex items-center gap-1"
                  >
                    <FaEdit /> Update
                  </Link>
                  <button
                    onClick={() => deleteBtnHandler(sch._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
