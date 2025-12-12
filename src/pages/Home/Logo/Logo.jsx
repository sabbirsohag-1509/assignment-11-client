import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="
          flex items-center gap-2 
          btn btn-ghost 
          normal-case 
          p-0 
          hover:bg-transparent
        "
      >
        <img
          src={logoImg}
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
        />
        <span
          className="
            font-bold 
            text-primary 
            text-base 
            sm:text-xl 
            md:text-2xl 
            tracking-wide
          "
        >
          ScholarStream
        </span>
      </Link>
    </div>
  );
};

export default Logo;
