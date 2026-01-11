import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";
import axios from "axios";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginInfo, loginInGoogle, setUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // login button handler
  const loginHandler = (data) => {
    console.log(data);
    loginInfo(data.email, data.password)
      .then((res) => {
        const loggedInUser = res.user;
        console.log("User logged in successfully:", loggedInUser);
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          text: `Welcome back, ${loggedInUser.displayName || "User"}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(location.state || "/");
      })
      .catch((error) => {
        console.error("Login Error:", error);
        Swal.fire({
          icon: "error",
          title: "Login Failed!",
          text: error.message || "Something went wrong during login.",
        });
      });
  };

  //google sign in handler
  const googleSignInHandler = async () => {
    try {
      const res = await loginInGoogle();
      const user = res.user;

      // Prepare user info for DB
      const userInfo = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      };

      // Save to DB (only insert if new user)
      await axios
        .post("https://scholarstream-ecru.vercel.app/users", userInfo)
        .then((dbRes) => {
          if (dbRes.data.insertedId) {
            console.log("New Google user added to DB:", dbRes.data);
          } else {
            console.log("Google user already exists in DB, skipped insert");
          }
        });

      // Note: No need to manually setUser - Firebase onAuthStateChanged will handle it

      Swal.fire({
        icon: "success",
        title: "Google Sign-In Successful!",
        text: `Welcome, ${user.displayName}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      // Navigate after a small delay to ensure auth state is updated
      setTimeout(() => {
        navigate(location.state || "/");
      }, 100);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      Swal.fire({
        icon: "error",
        title: "Google Sign-In Failed!",
        text: error.message || "Something went wrong during Google sign-in.",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-base-100 shadow-2xl rounded-3xl w-full max-w-md p-8 sm:p-10 border border-base-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-center card-text-primary mb-2 tracking-wide">
          Welcome Back
        </h1>

        <p className="text-center card-text-secondary mb-8 text-sm sm:text-base">
          Login to access your scholarship dashboard
        </p>

        <form onSubmit={handleSubmit(loginHandler)} className="space-y-5">
          <fieldset className="space-y-5">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold card-text-primary">
                Email or Phone
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full rounded-xl bg-base-100 card-text-primary"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required.</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1 relative">
              <label className="font-semibold card-text-primary">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: true })}
                className="input input-bordered w-full rounded-xl pr-12 bg-base-100 card-text-primary"
                placeholder="Enter your password"
              />

              <span
                className="absolute top-10 right-3 cursor-pointer card-text-secondary text-lg hover:card-text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>

              {errors.password && (
                <p className="text-red-500 text-sm">Password is required.</p>
              )}
            </div>

            {/* Log In Button */}
            <button className="btn btn-primary w-full rounded-xl py-2 text-[16px] shadow-md hover:btn-primary/90 transition-all">
              Log In
            </button>

            <div className="divider card-text-secondary">OR</div>

            {/* Google Login */}
            <button
              onClick={googleSignInHandler}
              type="button"
              className="btn btn-outline w-full rounded-xl flex items-center justify-center gap-3 py-2 shadow-sm hover:bg-base-200 transition-all"
            >
              <FcGoogle className="text-2xl" />
              Continue with Google
            </button>
          </fieldset>
        </form>
        <p className="card-text-secondary text-sm p-1 mt-4 text-center">
          Don't have an account?{" "}
          <Link
            state={location.state}
            to="/register"
            className="text-primary font-semibold hover:underline"
          >
            Sign Up
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
};

export default LogIn;
