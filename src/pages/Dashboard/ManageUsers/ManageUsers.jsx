import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [filterRole, setFilterRole] = useState("All");

  // Fetch users
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
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
    <div className="p-4 sm:p-6">
      <title>Dashboard - Manage Users</title>

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold card-text-primary mb-2">
            Manage Users
          </h1>
          <p className="card-text-secondary text-sm sm:text-base">
            Total Users:{" "}
            <span className="font-semibold text-primary">{users.length}</span>
          </p>
        </div>

        <select
          className="select select-bordered w-full sm:w-48 bg-base-100 shadow-md card-text-primary"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        >
          <option value="All">All Roles</option>
          <option value="Student">Student</option>
          <option value="Moderator">Moderator</option>
          <option value="Admin">Admin</option>
        </select>
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
                User
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Email
              </th>
              <th className="py-4 px-4 text-left card-text-primary font-bold text-sm sm:text-base">
                Role
              </th>
              <th className="py-4 px-4 text-center card-text-primary font-bold text-sm sm:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-base-300 hover:bg-primary/5 transition-colors duration-200"
                >
                  <td className="py-4 px-4 card-text-secondary font-medium">
                    {index + 1}.
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName}
                        className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-primary/20"
                      />
                      <span className="card-text-primary font-semibold">
                        {user.displayName}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 card-text-secondary text-sm">
                    {user.email}
                  </td>
                  <td className="py-4 px-4">
                    <span
                      className={`badge badge-sm sm:badge-md ${
                        user.role === "Admin"
                          ? "badge-error"
                          : user.role === "Moderator"
                          ? "badge-warning"
                          : "badge-info"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex gap-2 justify-center flex-wrap">
                      {/* Promotion and Demotion buttons */}
                      {user.role !== "Moderator" && (
                        <button
                          className="btn btn-xs sm:btn-sm btn-primary hover:btn-primary/80 transition-all"
                          onClick={() =>
                            handleRoleChange(user._id, "Moderator")
                          }
                        >
                          <span className="hidden md:inline">Make</span>{" "}
                          Moderator
                        </button>
                      )}
                      {user.role !== "Admin" && (
                        <button
                          className="btn btn-xs sm:btn-sm btn-secondary hover:btn-secondary/80 transition-all"
                          onClick={() => handleRoleChange(user._id, "Admin")}
                        >
                          <span className="hidden md:inline">Make</span> Admin
                        </button>
                      )}
                      {user.role !== "Student" && (
                        <button
                          className="btn btn-xs sm:btn-sm btn-warning hover:btn-warning/80 transition-all"
                          onClick={() => handleRoleChange(user._id, "Student")}
                        >
                          <span className="hidden md:inline">Make</span> Student
                        </button>
                      )}
                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="btn btn-xs sm:btn-sm btn-error hover:btn-error/80 text-white transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 card-text-secondary text-lg"
                >
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
