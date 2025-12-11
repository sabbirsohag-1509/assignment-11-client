import React from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user, logOutInfo } = useAuth();
  const { role,
 } = useRole();
  const { displayName, email, photoURL} = user || {};
  const navigate = useNavigate();

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
        logOutInfo().then(() => {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Logged Out Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/");
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 space-y-8">
      <title> 
        Profile - ScholarStream
      </title>

      {/*SCHOLARSTREAM BRANDING HEADER*/}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 rounded-2xl shadow-lg flex flex-col lg:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">ScholarStream Profile</h1>
          <p className="opacity-80 text-lg mt-1">
            Manage Academic identity, achievements & scholarship journey.
          </p>
        </div>

        <div className="text-right">
          <p className="font-semibold text-lg">Member Status</p>
          <span className="px-4 py-1 mt-1 inline-block bg-white/20 rounded-full backdrop-blur-md">
            Verified {role}
          </span>
        </div>
      </div>

      {/* MAIN PROFILE AREA*/}
      <div className="bg-white dark:bg-gray-900 shadow-xl border border-gray-200 dark:border-gray-700 rounded-2xl p-8 flex flex-col lg:flex-row gap-10 items-center">

        {/* LEFT — PROFILE INFO */}
        <div className="flex flex-col items-center lg:items-start lg:w-1/3">
          <img
            src={photoURL || "https://i.ibb.co/Yjz8bV6/user.png"}
            className="w-44 h-44 rounded-full border-4 border-blue-500 shadow-xl object-cover transition hover:scale-105 hover:shadow-blue-500/50"
            alt="profile"
          />

          <h2 className="mt-5 text-3xl font-bold text-gray-900 dark:text-white text-center lg:text-left">
            {displayName || "Unknown User"}
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {email}
          </p>

          <span className="mt-2 px-4 py-1 text-sm font-semibold bg-blue-100 dark:bg-blue-600/30 text-blue-700 dark:text-blue-300 rounded-full shadow">
            Role: {role}
          </span>

          {/* Profile Completion Bar */}
          <div className="mt-6 w-full">
            <p className="font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Profile Completion: 80%
            </p>
            <progress className="progress progress-primary w-full" value="80" max="100"></progress>
          </div>
        </div>

        {/* RIGHT — ACTIONS + DETAILS */}
        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Account Overview */}
          <div className="p-6 rounded-xl border bg-base-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-gray-100">
              Account Overview
            </h3>

            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Name:</strong> {displayName}</li>
              <li><strong>Email:</strong> {email}</li>
              <li><strong>Current Role:</strong> {role}</li>
              <li><strong>Joined On:</strong> {new Date().toDateString()}</li>
            </ul>
          </div>

          {/* Account Actions */}
          <div className="p-6 rounded-xl border bg-base-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">
              Account Actions
            </h3>

            <div className="space-y-3">
              <button className="btn w-full bg-blue-600 hover:bg-blue-700 text-white">
                Edit Profile
              </button>

              <button className="btn w-full bg-green-600 hover:bg-green-700 text-white">
                Change Profile Photo
              </button>

              <button className="btn w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                Change Password
              </button>

              <button
                onClick={logOutHandleBtn}
                className="btn w-full bg-red-600 hover:bg-red-700 text-white"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>

      

      {/* ========== RECENT ACTIVITY ========== */}
      <div className="bg-base-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg">
        <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-200">
          Recent Activity
        </h3>

        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
          <li>✔ Applied for "Tech Innovators Scholarship"</li>
          <li>✔ Submitted review for "Future Leaders Award"</li>
          <li>✔ Updated profile information</li>
        </ul>
      </div>

    </div>
  );
};

export default Profile;
