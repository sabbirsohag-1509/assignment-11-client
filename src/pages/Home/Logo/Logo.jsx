import React from "react";
import { Link } from "react-router";
import logoImg from "../../../assets/logo.png";

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link
        to="/"
        className="
          flex items-center
          normal-case 
          p-0 
          hover:bg-transparent
          transition-all
        "
      >
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-lg bg-base-300/30 p-1">
          <img
            src={logoImg}
            alt="ScholarStream Logo"
            className="w-full h-full object-contain filter brightness-0 dark:brightness-100 dark:invert"
          />
        </div>
        <span
          className="
            font-bold 
            card-text-primary 
            text-base 
            sm:text-xl 
            md:text-2xl 
            tracking-wide
            transition-colors
          "
        >
          Scholar<span className="text-primary">Stream</span>
        </span>
      </Link>
    </div>
  );
};

export default Logo;
