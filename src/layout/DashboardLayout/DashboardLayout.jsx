import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import { FiHome, FiPlusCircle, FiSettings, FiLogOut } from "react-icons/fi";
import Logo from "../../pages/Home/Logo/Logo";
import useAuth from "../../hooks/useAuth";
import { CgProfile } from "react-icons/cg";
import Swal from "sweetalert2";
import { MdOutlineManageHistory, MdRateReview } from "react-icons/md";
import { FaAppStore, FaChartLine, FaRegCommentDots } from "react-icons/fa";
import { SiNginxproxymanager } from "react-icons/si";
import { FaUsersGear } from "react-icons/fa6";
import useRole from "../../hooks/useRole";
import useTheme from "../../hooks/useTheme";
import { MdLightMode, MdDarkMode } from "react-icons/md";

const DashboardLayout = () => {
  const { user, logOutInfo } = useAuth();
  const { role } = useRole();
  const { isDark, toggleTheme } = useTheme();
  // console.log("Current User Role:", role);
  const linkStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 border-b-2 border-primary font-semibold"
      : "px-4 py-2 border-b-2 border-transparent hover:border-primary transition-all font-medium";

  //logout handler
  const logoutHandlerBtn = () => {
    Swal.fire({
      title: `Are you sure ${user.displayName}?`,
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
          })
          .catch((error) => {
            console.error("Logout Error:", error);
          });
      }
    });
  };
  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">
      <title>Dashboard | ScholarStream</title>
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* MAIN CONTENT */}
      <div className="drawer-content flex flex-col">
        <header className="h-16 bg-base-100 border-b border-base-300 shadow-sm flex items-center px-6 sticky top-0 z-50">
          <label
            htmlFor="sidebar-drawer"
            className="btn btn-ghost lg:hidden mr-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </label>
          {/* main header  */}
          <div className="flex justify-between w-full items-center">
            <div>
              <h1 className="text-lg font-semibold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className="btn btn-ghost btn-circle"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <MdLightMode size={22} className="text-yellow-400" />
                ) : (
                  <MdDarkMode size={22} className="text-gray-700" />
                )}
              </button>

              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                {/* TEXT */}
                <div className="text-right text-xs sm:text-sm md:text-base leading-tight">
                  <span className="font-medium">Hello, </span>
                  <span className="font-semibold">{user.displayName}</span>
                  <br />
                  <span className="font-bold text-primary">{role}</span>
                </div>

                {/* AVATAR */}
                <img
                  className="
      rounded-full bg-primary 
      w-8 h-8 
      sm:w-10 sm:h-10 
      md:w-12 md:h-12
      object-cover
    "
                  src={user.photoURL}
                  alt="User Avatar"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="p-3">
          <div className="p-6 rounded-xl shadow-md">
            <Outlet />
          </div>
        </main>
      </div>

      {/* SIDEBAR */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-100 border-r border-base-300 shadow-lg min-h-full flex flex-col">
          <div className="p-5 border-b border-base-300">
            <NavLink
              to="/"
              className="flex items-center gap-2 text-xl font-bold"
            >
              <Logo />
            </NavLink>
          </div>

          {/* MENU */}
          <nav className="flex-1 px-4 py-2">
            <ul className="menu gap-1">
              {/* HOME */}
              <li>
                <NavLink to="/" className={linkStyle} end>
                  <FiHome size={18} />
                  Home
                </NavLink>
              </li>
              {/* Dashboard */}
              <li>
                <NavLink to="/dashboard/profile" className={linkStyle} end>
                  <CgProfile size={18} />
                  My Profile
                </NavLink>
              </li>
              {role === "Student" && (
                <>
                  {/* My Application */}
                  <li>
                    <NavLink
                      to="/dashboard/my-application"
                      className={linkStyle}
                      end
                    >
                      <FaAppStore size={18} />
                      My Applications
                    </NavLink>
                  </li>
                  {/* My Reviews */}
                  <li>
                    <NavLink
                      to="/dashboard/my-reviews"
                      className={linkStyle}
                      end
                    >
                      <MdRateReview size={18} />
                      My Reviews
                    </NavLink>
                  </li>
                </>
              )}
              {role === "Moderator" && (
                <>
                  {/* Manage Applied Applications */}
                  <li>
                    <NavLink
                      to="/dashboard/manage-applied-applications"
                      className={linkStyle}
                      end
                    >
                      <SiNginxproxymanager size={18} />
                      Manage Applied Applications
                    </NavLink>
                  </li>

                  {/* All Reviews */}
                  <li>
                    <NavLink
                      to="/dashboard/all-reviews"
                      className={linkStyle}
                      end
                    >
                      <FaRegCommentDots size={18} />
                      All Reviews
                    </NavLink>
                  </li>
                </>
              )}

              {role === "Admin" && (
                <>
                  {/* Add New */}
                  <li>
                    <NavLink
                      to="/dashboard/add-scholarship"
                      className={linkStyle}
                      end
                    >
                      <FiPlusCircle size={18} />
                      Add Scholarship
                    </NavLink>
                  </li>
                  {/* Manage Scholarship */}
                  <li>
                    <NavLink
                      to="/dashboard/manage-scholarship"
                      className={linkStyle}
                      end
                    >
                      <MdOutlineManageHistory size={18} />
                      Manage Scholarships
                    </NavLink>
                  </li>
                  {/* Manage Users */}
                  <li>
                    <NavLink
                      to="/dashboard/manage-users"
                      className={linkStyle}
                      end
                    >
                      <FaUsersGear size={18} />
                      Manage Users
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/dashboard/analytics"
                      className={linkStyle}
                      end
                    >
                      <FaChartLine size={18} />
                      Analytics
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </nav>

          {/* BOTTOM */}
          <div className="p-4 border-t border-base-300">
            <ul className="menu">
              <li>
                <Link
                  to="/dashboard/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-primary hover:text-white"
                >
                  <FiSettings size={18} />
                  Settings
                </Link>
              </li>

              <li>
                <button
                  onClick={logoutHandlerBtn}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-error hover:text-white mt-1"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;
