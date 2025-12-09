import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Profile = () => {
  const { user, logOutInfo, } = useAuth();
  const { displayName, email, photoURL } = user || {};
  const navigate = useNavigate();

  //logout button handler
  const logOutHandleBtn = () => {
    Swal.fire({
      title: `Are you sure ${displayName}?`,
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        logOutInfo()
          .then(() => {
            Swal.fire({
              position: "top-center",
              icon: "success",
              title: "Logged Out Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/");
          })
          .catch((error) => {
            console.error("Logout Error:", error);
          });
      }
    });
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white dark:bg-gray-900 shadow-xl rounded-xl p-8 w-full max-w-md border border-gray-200 dark:border-gray-700">
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <img
            src={photoURL || "https://i.ibb.co/Yjz8bV6/user.png"}
            className="w-48 h-48 rounded-full border-4 border-blue-500 shadow-lg object-cover"
            alt="profile"
          />

          <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-white">
            {displayName || "Unknown User"}
          </h2>
          <p className="text-gray-500 dark:text-gray-400">{email}</p>
          <p className="text-gray-500 dark:text-gray-400 py-2">Role:{user.role }</p>
        </div>

        {/* Divider */}
        <div className="mt-3 border-t border-gray-300 dark:border-gray-700 pt-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Account Actions
          </h3>

          <div className="space-y-3">
            {/* Update Profile */}
            <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium shadow cursor-pointer">
              Update Profile
            </button>

            {/* Change Photo */}
            <button className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow cursor-pointer">
              Change Photo
            </button>

            {/* Manage Password */}
            <button className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg font-medium shadow cursor-pointer">
              Manage Password
            </button>

            {/* Logout */}
            <button
              onClick={logOutHandleBtn}
              className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium shadow cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
