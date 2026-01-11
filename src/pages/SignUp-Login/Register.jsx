import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import useAuth from "./../../hooks/useAuth";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    registerInfo,
    loginInGoogle,
    updateUserProfileInfo,
    setUser,
    setLoading,
  } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // register button handler
  const registerBtnHandler = async (data) => {
    try {
      const profileImg = data.photoURL[0];

      const res = await registerInfo(data.email, data.password);
      console.log("User registered:", res.user);

      // Upload image
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      const imgRes = await axios.post(image_API_URL, formData);
      const uploadedImageURL = imgRes.data.data.display_url;

      console.log("Image uploaded successfully:", uploadedImageURL);

      //CREATED user in database
      const userInfo = {
        displayName: data.name,
        email: data.email,
        photoURL: uploadedImageURL,
      };

      await axios
        .post("https://scholarstream-ecru.vercel.app/users", userInfo)
        .then((res) => {
          if (res.data.insertedId) {
            console.log("User info saved to database:", res.data);
          }
        });

      // Update Firebase profile
      await updateUserProfileInfo({
        displayName: data.name,
        photoURL: uploadedImageURL,
      });

      setUser((prev) => {
        return { ...prev, displayName: data.name, photoURL: uploadedImageURL };
      });
      setLoading(false);
      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: `Welcome, ${data.name}!`,
        timer: 1500,
        showConfirmButton: false,
      });

      navigate(location.state || "/");

      console.log("Profile updated successfully!");
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: "error",
        title: "Registration Failed!",
        text: error.message || "Something went wrong during registration.",
      });
    }
  };

  //google sign in handler
  const googleSignInHandler = () => {
    loginInGoogle()
      .then(async (res) => {
        const loggedUser = res.user;

        // User info
        const userInfo = {
          displayName: loggedUser.displayName,
          email: loggedUser.email,
          photoURL: loggedUser.photoURL,
        };

        // Save to DB only if user does NOT exist
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
          text: `Welcome, ${loggedUser.displayName}!`,
          timer: 1500,
          showConfirmButton: false,
        });

        // Navigate after a small delay to ensure auth state is updated
        setTimeout(() => {
          navigate(location.state || "/");
        }, 100);
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);

        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed!",
          text: error.message,
        });
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 p-4">
      <div className="bg-base-100 shadow-2xl rounded-3xl w-full max-w-md p-8 sm:p-10 border border-base-300">
        <h1 className="text-3xl sm:text-4xl font-bold text-center card-text-primary mb-2 tracking-wide">
          Create Account
        </h1>
        <p className="text-center card-text-secondary mb-8 text-sm sm:text-base">
          Join us to access scholarship opportunities
        </p>

        <form onSubmit={handleSubmit(registerBtnHandler)} className="space-y-5">
          <fieldset className="space-y-5">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold card-text-primary">
                Your Name
              </label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input input-bordered w-full rounded-xl bg-base-100 card-text-primary"
                placeholder="Your Name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">Your Name is Required.</p>
              )}
            </div>

            {/* Photo URL */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold card-text-primary">
                Profile Photo
              </label>
              <input
                type="file"
                className="file-input file-input-bordered w-full rounded-xl bg-base-100 card-text-primary"
                {...register("photoURL", { required: true })}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="font-semibold card-text-primary">
                Email or Phone
              </label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input input-bordered w-full rounded-xl bg-base-100 card-text-primary"
                placeholder="Email"
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
                className="input input-bordered w-full rounded-xl pr-12 bg-base-100 card-text-primary"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
                })}
              />
              <span
                className="absolute top-10 right-3 cursor-pointer card-text-secondary text-lg hover:card-text-primary transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <BsFillEyeFill /> : <BsFillEyeSlashFill />}
              </span>

              {errors.password?.type === "required" && (
                <p className="text-red-500 text-sm">Password is required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500 text-sm">
                  Minimum 6 characters required.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500 text-sm">
                  Password must contain uppercase, lowercase and a number.
                </p>
              )}
            </div>

            {/* Register Button */}
            <button className="btn btn-primary w-full rounded-xl py-2 text-[16px] shadow-md hover:btn-primary/90 transition-all">
              Register
            </button>

            <div className="divider card-text-secondary">OR</div>

            {/* Google Sign In */}
            <button
              onClick={googleSignInHandler}
              type="button"
              className="btn btn-outline w-full rounded-xl flex gap-3 items-center justify-center py-2 shadow-sm hover:bg-base-200 transition-all"
            >
              <FcGoogle className="text-2xl" /> Continue with Google
            </button>
          </fieldset>
        </form>
        <p className="card-text-secondary text-sm p-1 mt-4 text-center">
          Already have an account?{" "}
          <Link
            state={location.state}
            to="/login"
            className="text-primary font-semibold hover:underline"
          >
            login
          </Link>{" "}
          here.
        </p>
      </div>
    </div>
  );
}
