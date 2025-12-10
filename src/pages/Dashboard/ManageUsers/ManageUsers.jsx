import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRole, setFilterRole] = useState("All");

  // Fetch users
  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Handle role change (promotion or demotion)
  const handleRoleChange = async (userId, newRole) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Change user role to ${newRole}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axiosSecure.patch(`/users/${userId}/role`, { role: newRole });
      refetch();
      Swal.fire({
        icon: "success",
        title: "Role Updated",
        text: `User role changed to ${newRole}`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Role change failed:", err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Role change failed!",
      });
    }
  };

  // Handle delete user
  const handleDelete = async (userId) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axiosSecure.delete(`/users/${userId}`);
        refetch();
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "User has been deleted.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error("Delete failed:", err);
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Delete action failed!",
        });
      }
    }
  };

  const filteredUsers =
    filterRole === "All" ? users : users.filter((u) => u.role === filterRole);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Manage Users ({users.length})
        </h1>

        <select
          className="select select-bordered w-40 bg-white shadow-md"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      <div className="overflow-x-auto bg-white shadow-xl rounded-2xl border border-gray-200">
        <table className="table  w-full text-gray-700">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-3">#</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{index + 1}</td>
                  <td className="px-6 py-3 flex items-center gap-2">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName}
                      className="w-10 h-10 rounded-full object-cover border"
                    />
                    {user.displayName}
                  </td>
                  <td className="px-6 py-3">{user.email}</td>
                  <td className="px-6 py-3 font-semibold">{user.role}</td>
                  <td className="px-6 py-3 flex gap-2 justify-center">
                    {/* Promotion and Demotion buttons */}
                    {user.role !== "Moderator" && (
                      <button
                        className="btn btn-sm btn-primary text-gray-800"
                        onClick={() =>
                          handleRoleChange(user._id, "Moderator")
                        }
                      >
                        Make Moderator
                      </button>
                    )}
                    {user.role !== "Admin" && (
                      <button
                        className="btn btn-sm btn-secondary text-gray-800"
                        onClick={() => handleRoleChange(user._id, "Admin")}
                      >
                        Make Admin
                      </button>
                    )}
                    {user.role !== "Student" && (
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleRoleChange(user._id, "Student")}
                      >
                        Make Student
                      </button>
                    )}
                    {/* Delete */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-sm btn-error"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
