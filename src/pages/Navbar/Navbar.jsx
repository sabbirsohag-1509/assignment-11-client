import React from "react";
import { Link, NavLink } from "react-router";
import useAuth from "../../hooks/useAuth";
import useTheme from "../../hooks/useTheme";
import Swal from "sweetalert2";
import Logo from "../Home/Logo/Logo";
import {
  Contact,
  FilePenLine,
  GraduationCap,
  Home,
  Newspaper,
  Moon,
  Sun,
} from "lucide-react";

const Navbar = () => {
  const { user, logOutInfo } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  // logout button handler
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
  const linkStyle = ({ isActive }) =>
    isActive
      ? "px-4 py-2 border-b-2 border-primary font-semibold"
      : "px-4 py-2 border-b-2 border-transparent hover:border-primary transition-all font-medium";

  const links = (
    <>
      <li>
        <NavLink to="/" className={linkStyle}>
          <Home size={16} /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships" className={linkStyle}>
          <GraduationCap size={17} /> All Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink to="/blogs" className={linkStyle}>
          <Newspaper size={16} /> Blogs
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact-us" className={linkStyle}>
          <Contact size={16} /> Contact Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm border-b border-gray-200">
      <div className="navbar-start ">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>

      {/* center link*/}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT END */}
      <div className="navbar-end">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle"
          title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {user ? (
          <div className="flex items-center gap-3">
            {/* user image with dropdown */}
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="avatar">
                <div className="w-10 rounded-full cursor-pointer">
                  <img src={user.photoURL} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-10 w-52 p-3 shadow"
              >
                <li className="font-bold px-2">{user.displayName}</li>
                <li className="px-2 text-sm">{user.email}</li>
                <div className="divider my-1"></div>

                <li>
                  <NavLink to="/dashboard" className={linkStyle}>
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={linkStyle}>
                    Profile
                  </NavLink>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
                <div className="divider my-1"></div>
                <li>
                  <button
                    onClick={logoutHandlerBtn}
                    className="btn btn-error bg-primary border-none btn-sm text-white"
                  >
                    Log Out
                  </button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
            <Link
              to="/login"
              className="btn btn-xs btn-primary w-full sm:w-auto px-3 py-1 text-[11px] hidden sm:block border-none bg-linear-to-r from-primary to-primary/80"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-xs btn-primary w-full sm:w-auto px-3 py-1 text-[11px] border-none bg-linear-to-r from-primary to-primary/80"
            >
              SignUp
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
